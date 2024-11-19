pub fn sum_of(first_summand: Vec<f64>, second_summand: Vec<f64>) -> Option<Vec<f64>> {
    if first_summand.len() == second_summand.len() {
        let mut sum: Vec<f64> = Vec::new();

        let mut i: usize = 0;
        let length = first_summand.len();
        while i < length {
            sum.push(first_summand[i] + second_summand[i]);
            i += 1;
        }
        Some(sum)
    } else {
        None
    }
}
