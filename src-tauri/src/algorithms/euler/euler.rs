use std::f64::{consts::PI, EPSILON};

pub struct EulerAngles {
    yaw: f64,
    pitch: f64,
    roll: f64,
}

impl EulerAngles {
    pub fn new(yaw: f64, pitch: f64, roll: f64) -> Self {
        Self { yaw, pitch, roll }
    }

    pub fn from_rotation_matrix(rotation_matrix: [[f64; 3]; 3]) -> Self {
        if rotation_matrix[2][2] > 1.0 - EPSILON {
            Self {
                yaw: f64::atan2(rotation_matrix[0][1], rotation_matrix[0][0]),
                pitch: 0.0,
                roll: 0.0,
            }
        } else if rotation_matrix[2][2] < -1.0 + EPSILON {
            Self {
                yaw: f64::atan2(rotation_matrix[1][0], rotation_matrix[0][0]),
                pitch: PI,
                roll: 0.0,
            }
        } else {
            Self {
                yaw: f64::atan2(rotation_matrix[1][0], rotation_matrix[0][0]),
                pitch: f64::atan2(
                    rotation_matrix[2][0].sqrt().powf(2.0),
                    rotation_matrix[2][2],
                ),
                roll: f64::atan2(rotation_matrix[2][1], rotation_matrix[2][2]),
            }
        }
    }

    pub fn to_rotation_matrix(&self) -> [[f64; 3]; 3] {
        let (yaw_sin, yaw_cos) = self.yaw.sin_cos();
        let (pitch_sin, pitch_cos) = self.pitch.sin_cos();
        let (roll_sin, roll_cos) = self.roll.sin_cos();

        let r11: f64 = yaw_cos * pitch_cos;
        let r12: f64 = yaw_cos * pitch_sin * roll_sin - yaw_sin * roll_cos;
        let r13: f64 = yaw_cos * pitch_sin * roll_cos + yaw_sin * roll_sin;

        let r21: f64 = yaw_sin * pitch_cos;
        let r22: f64 = yaw_sin * pitch_sin * roll_sin + yaw_cos * roll_cos;
        let r23: f64 = yaw_sin * pitch_sin * roll_cos - yaw_cos * roll_sin;

        let r31: f64 = -pitch_sin;
        let r32: f64 = pitch_cos * roll_sin;
        let r33: f64 = pitch_cos * roll_cos;

        [[r11, r12, r13], [r21, r22, r23], [r31, r32, r33]]
    }

    pub fn all_filled(&self) -> bool {
        !self.yaw.is_nan() && !self.pitch.is_nan() && !self.roll.is_nan()
    }
}
