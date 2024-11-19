pub struct EulerAngles {
    yaw: f64,
    pitch: f64,
    roll: f64,
}

impl EulerAngles {
    fn all_filled(&self) -> bool {
        !self.yaw.is_nan() && !self.pitch.is_nan() && !self.roll.is_nan()
    }
}

pub fn calculate_angles(rotation_matrix: Vec<Vec<f64>>) -> Option<EulerAngles> {
    if rotation_matrix.len() == 3 && rotation_matrix[0].len() == 3 {
        let angles: EulerAngles = EulerAngles {
            yaw: f64::atan2(rotation_matrix[1][0], rotation_matrix[0][0]),
            pitch: f64::asin(-rotation_matrix[2][0]),
            roll: f64::atan2(rotation_matrix[2][1], rotation_matrix[2][2]),
        };
        if angles.all_filled() {
            Some(angles)
        } else {
            None
        }
    } else {
        None
    }
}
