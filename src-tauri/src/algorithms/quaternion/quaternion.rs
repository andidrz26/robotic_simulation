pub struct Quaternion {
    scalar: f64,
    vector_x: f64,
    vector_y: f64,
    vector_z: f64,
}

impl Quaternion {
    fn add(&self, other: &Quaternion) -> Quaternion {
        Quaternion {
            scalar: self.scalar + other.scalar,
            vector_x: self.vector_x + other.vector_x,
            vector_y: self.vector_y + other.vector_y,
            vector_z: self.vector_z + other.vector_z,
        }
    }

    fn multiply(&self, other: &Quaternion) -> Quaternion {
        Quaternion {
            scalar: self.scalar * other.scalar - self.vector_x * other.vector_x - self.vector_y * other.vector_y - self.vector_z * other.vector_z,
            vector_x: self.scalar * other.vector_x + self.vector_x * other.scalar + self.vector_y * other.vector_z - self.vector_z * other.vector_y,
            vector_z: self.scalar * other.vector_z + self.vector_x * other.vector_y - self.vector_y * other.vector_x + self.vector_z * other.scalar,
            vector_y: self.scalar * other.vector_y - self.vector_x * other.vector_z + self.vector_y * other.scalar + self.vector_z * other.vector_x,
        }
    }

    fn all_filled(&self) -> bool {
        !self.scalar.is_nan() && !self.vector_x.is_nan() && !self.vector_y.is_nan() && !self.vector_z.is_nan()
    }
}

pub fn sum_of(first_summand: Quaternion, second_summand: Quaternion) -> Option<Quaternion> {
    let sum: Quaternion = first_summand.add(&second_summand);
    if sum.all_filled() {
        Some(sum)
    } else {
        None
    }
}

pub fn product_of(first_factor: Quaternion, second_factor: Quaternion) -> Option<Quaternion> {
    let product: Quaternion = first_factor.multiply(&second_factor);
    if product.all_filled() {
        Some(product)
    } else {
        None
    }
}