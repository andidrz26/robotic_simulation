pub fn sum_of(first_summand: Vec<f64>, second_summand: Vec<f64>) -> Option<Vec<f64>> {
    if first_summand.len() == second_summand.len() {
        let mut sum: Vec<f64> = Vec::new();
        let length = first_summand.len();
        for i in 0..length {
            sum.push(first_summand[i] + second_summand[i]);
        }
        Some(sum)
    } else {
        None
    }
}
