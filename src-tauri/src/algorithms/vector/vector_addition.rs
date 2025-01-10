pub fn sum_of(first_summand: Vec<f64>, second_summand: Vec<f64>) -> Result<Vec<f64>, std::io::Error> {
    let first_length: usize = first_summand.len();
    if first_length == second_summand.len() {
        let mut sum: Vec<f64> = vec![];
        let length: usize = first_length;
        for i in 0..length {
            sum.push(first_summand[i] + second_summand[i]);
        }
        Ok(sum)
    } else {
        Err(std::io::Error::new(std::io::ErrorKind::InvalidData, "Error: Input data not valid"))
    }
}
