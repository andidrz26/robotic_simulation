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
        *self != Quaternion::default() 
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
