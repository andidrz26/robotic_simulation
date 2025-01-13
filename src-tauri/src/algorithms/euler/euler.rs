#[derive(Debug, Default, PartialEq, serde::Serialize, serde::Deserialize)]
pub struct EulerAngles {
    #[cfg(test)]
    pub yaw: f64,
    #[cfg(test)]
    pub pitch: f64,
    #[cfg(test)]
    pub roll: f64,
    #[cfg(not(test))]
    yaw: f64,
    #[cfg(not(test))]
    pitch: f64,
    #[cfg(not(test))]
    roll: f64,
}

impl EulerAngles {
    pub fn new(yaw: f64, pitch: f64, roll: f64) -> Self {
        Self { yaw, pitch, roll }
    }

    pub fn from_rotation_matrix(rotation_matrix: [[f64; 3]; 3]) -> Self {
        let yaw_sin = (rotation_matrix[0][0] * rotation_matrix[0][0] + rotation_matrix[1][0] * rotation_matrix[1][0]).sqrt();

        let (yaw, pitch, roll) = if yaw_sin > 1e-6 {
            (
                rotation_matrix[1][0].atan2(rotation_matrix[0][0]),
                (-rotation_matrix[2][0]).atan2(yaw_sin),
                rotation_matrix[2][1].atan2(rotation_matrix[2][2]),
            )
        } else {
            (
                0.0,
                (-rotation_matrix[2][0]).atan2(yaw_sin),
                (rotation_matrix[1][2]).atan2(rotation_matrix[1][1]),
            )
        };
        Self { yaw, pitch, roll }
    }

    pub fn to_rotation_matrix(&self) -> [[f64; 3]; 3] {
        let (yaw_sin, yaw_cos) = (self.yaw).sin_cos();
        let (pitch_sin, pitch_cos) = (self.pitch).sin_cos();
        let (roll_sin, roll_cos) = (self.roll).sin_cos();

        let r11: f64 = yaw_cos * pitch_cos;
        let r12: f64 = yaw_sin * pitch_sin * roll_cos - yaw_cos * roll_sin;
        let r13: f64 = yaw_cos * pitch_sin * roll_cos + yaw_sin * roll_sin;

        let r21: f64 = yaw_sin * pitch_cos;
        let r22: f64 = yaw_sin * pitch_sin * roll_sin + yaw_cos * roll_cos;
        let r23: f64 = yaw_cos * pitch_sin * roll_sin - yaw_sin * roll_cos;

        let r31: f64 = -pitch_sin;
        let r32: f64 = pitch_cos * roll_sin;
        let r33: f64 = pitch_cos * roll_cos;

        [[r11, r12, r13], [r21, r22, r23], [r31, r32, r33]]
    }

    pub fn all_filled(&self) -> bool {
        *self != EulerAngles::default()
    }
}
