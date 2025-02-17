#[derive(serde::Serialize, serde::Deserialize, Debug, PartialEq, Default)]
pub struct Quaternion {
    scalar: f64,
    vector_x: f64,
    vector_y: f64,
    vector_z: f64,
}

impl Quaternion {
    pub fn new(scalar: f64, vector_x: f64, vector_y: f64, vector_z: f64) -> Result<Quaternion, std::io::Error> {
        Ok(Quaternion {
            scalar,
            vector_x,
            vector_y,
            vector_z,
        })
    }

    fn all_filled(&self) -> bool {
        self.scalar.is_finite() && self.vector_x.is_finite() && self.vector_y.is_finite() && self.vector_z.is_finite()
    }

    pub fn sum_of(&self, second_summand: Quaternion) -> Result<Quaternion, std::io::Error> {
        let sum: Quaternion = add(self, &second_summand);
        if sum.all_filled() {
            Ok(sum)
        } else {
            Err(std::io::Error::new(std::io::ErrorKind::InvalidData, "Error: Input data not valid"))
        }
    }

    pub fn product_of(&self, second_factor: Quaternion) -> Result<Quaternion, std::io::Error> {
        let product: Quaternion = multiply(self, &second_factor);
        if product.all_filled() {
            Ok(product)
        } else {
            Err(std::io::Error::new(std::io::ErrorKind::InvalidData, "Error: Input data not valid"))
        }
    }

    pub fn to_rotation_matrix(&self) -> Result<[[f64; 3]; 3], std::io::Error> {
        let w = self.scalar;
        let x = self.vector_x;
        let y = self.vector_y;
        let z = self.vector_z;

        if !self.all_filled() {
            Err(std::io::Error::new(std::io::ErrorKind::InvalidData, "Error: Input data not valid"))
        } else {
            Ok([
                [
                    (2.0 * (w * w + x * x) - 1.0),
                    (2.0 * (x * y - w * z)),
                    (2.0 * (x * z + w * y)),
                ],
                [
                    (2.0 * (x * y + w * z)),
                    (2.0 * (w * w + y * y) - 1.0),
                    (2.0 * (y * z - w * x)),
                ],
                [
                    (2.0 * (x * z - w * y)),
                    (2.0 * (y * z + w * x)),
                    (2.0 * (x * x + z * z) - 1.0),
                ],
            ])
        }
    }

    pub fn slerp(&self, t: f64, end: Quaternion) -> Result<Quaternion, std::io::Error> {
        if !self.all_filled() || !end.all_filled() {
            return Err(std::io::Error::new(std::io::ErrorKind::InvalidData, "Input data not valid"));
        }

        let dot = self.scalar * end.scalar
            + self.vector_x * end.vector_x
            + self.vector_y * end.vector_y
            + self.vector_z * end.vector_z;

        let dot = dot.clamp(-1.0, 1.0);

        let theta_0 = dot.acos();
        let theta = theta_0 * t;

        let sin_theta = theta.sin();
        let sin_theta_0 = theta_0.sin();

        let s0 = (theta.cos() - dot * sin_theta / sin_theta_0).clamp(-1.0, 1.0);
        let s1 = (sin_theta / sin_theta_0).clamp(-1.0, 1.0);

        Ok(Quaternion {
            scalar: s0 * self.scalar + s1 * end.scalar,
            vector_x: s0 * self.vector_x + s1 * end.vector_x,
            vector_y: s0 * self.vector_y + s1 * end.vector_y,
            vector_z: s0 * self.vector_z + s1 * end.vector_z,
        })
    }
}

fn add(first_quaternion: &Quaternion, second_quaternion: &Quaternion) -> Quaternion {
    Quaternion {
        scalar: first_quaternion.scalar + second_quaternion.scalar,
        vector_x: first_quaternion.vector_x + second_quaternion.vector_x,
        vector_y: first_quaternion.vector_y + second_quaternion.vector_y,
        vector_z: first_quaternion.vector_z + second_quaternion.vector_z,
    }
}

fn multiply(first_quaternion: &Quaternion, second_quaternion: &Quaternion) -> Quaternion {
    Quaternion {
        scalar: first_quaternion.scalar * second_quaternion.scalar
            - first_quaternion.vector_x * second_quaternion.vector_x
            - first_quaternion.vector_y * second_quaternion.vector_y
            - first_quaternion.vector_z * second_quaternion.vector_z,
        vector_x: first_quaternion.scalar * second_quaternion.vector_x
            + first_quaternion.vector_x * second_quaternion.scalar
            + first_quaternion.vector_y * second_quaternion.vector_z
            - first_quaternion.vector_z * second_quaternion.vector_y,
        vector_z: first_quaternion.scalar * second_quaternion.vector_z
            + first_quaternion.vector_x * second_quaternion.vector_y
            - first_quaternion.vector_y * second_quaternion.vector_x
            + first_quaternion.vector_z * second_quaternion.scalar,
        vector_y: first_quaternion.scalar * second_quaternion.vector_y
            - first_quaternion.vector_x * second_quaternion.vector_z
            + first_quaternion.vector_y * second_quaternion.scalar
            + first_quaternion.vector_z * second_quaternion.vector_x,
    }
}
