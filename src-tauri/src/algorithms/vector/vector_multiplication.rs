pub fn scalar_product_of(first_factor: &Vec<f64>, second_factor: Vec<f64>) -> Result<f64, std::io::Error> {
    if first_factor.len() == second_factor.len() {
        let mut product: f64 = 0.0;
        let length: usize = first_factor.len();
        for i in 0..length {
            product += first_factor[i] * second_factor[i];
        }
        Ok(product)
    } else {
        Err(std::io::Error::new(std::io::ErrorKind::InvalidData, "Input data not valid"))
    }
}


#[allow(dead_code)]
pub fn cross_product_of(first_factor: [f64; 3], second_factor: [f64; 3]) -> Result<[f64; 3], std::io::Error> {
    let mut product: [f64; 3] = [0.0; 3];

    if first_factor.len() == 3 && second_factor.len() == 3 {
        product[0] = first_factor[1] * second_factor[2] - first_factor[2] * second_factor[1];
        product[1] = first_factor[2] * second_factor[0] - first_factor[0] * second_factor[2];
        product[2] = first_factor[0] * second_factor[1] - first_factor[1] * second_factor[0];
        Ok(product)
    } else {
        Err(std::io::Error::new(std::io::ErrorKind::InvalidData, "Input data not valid"))
    }
}
