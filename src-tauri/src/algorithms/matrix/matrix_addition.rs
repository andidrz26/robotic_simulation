pub fn sum_of(first_summand: Vec<Vec<f64>>, second_summand: Vec<Vec<f64>>) -> Option<Vec<Vec<f64>>> {
    if first_summand.len() == second_summand.len()
        && first_summand.len() > 0
        && first_summand[0].len() == second_summand[0].len()
    {
        let mut sum: Vec<Vec<f64>> = Vec::new();

        let mut i: usize = 0;
        let col_length: usize = first_summand.len();
        let row_length: usize = first_summand[0].len();
        while i < col_length {
            let mut j: usize = 0;  
            sum.push(Vec::new());
            while j <  row_length {
                sum[i].push(first_summand[i][j] + second_summand[i][j]);
                j += 1;
            }
            i += 1;
        }
        Some(sum)
    } else {
        None
    }
}