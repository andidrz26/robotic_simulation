pub fn sum_of(first_summand: Vec<Vec<f64>>, second_summand: Vec<Vec<f64>>) -> Option<Vec<Vec<f64>>> {
    if first_summand.len() == second_summand.len()
        && first_summand.len() > 0
        && first_summand[0].len() == second_summand[0].len()
    {
        let mut sum: Vec<Vec<f64>> = Vec::new();
        let col_length: usize = first_summand.len();
        let row_length: usize = first_summand[0].len();
        for i in 0..col_length {
            sum.push(Vec::new());
            for j in 0..row_length {
                sum[i].push(first_summand[i][j] + second_summand[i][j]);
            }
        }
        Some(sum)
    } else {
        None
    }
}