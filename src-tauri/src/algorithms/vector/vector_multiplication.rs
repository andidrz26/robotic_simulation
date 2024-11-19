pub fn scalar_product_of(first_factor: &Vec<f64>, second_factor: Vec<f64>) -> Option<f64> {
    if first_factor.len() == second_factor.len() {
        let mut product: f64 = 0.0;

        let mut i: usize = 0;
        let length: usize = first_factor.len();
        while i < length {
            product += first_factor[i] * second_factor[i];
            i += 1;
        }
        Some(product)
    } else {
        None
    }
}


#[allow(dead_code)]
pub fn cross_product_of(first_factor: [f64; 3], second_factor: [f64; 3]) -> Option<[f64; 3]> {
    let mut product: [f64; 3] = [0.0; 3];

    if first_factor.len() == 3 && second_factor.len() == 3 {
        product[0] = first_factor[1] * second_factor[2] - first_factor[2] * second_factor[1];
        product[1] = first_factor[2] * second_factor[0] - first_factor[0] * second_factor[2];
        product[2] = first_factor[0] * second_factor[1] - first_factor[1] * second_factor[0];
        Some(product)
    } else {
        None
    }
}
