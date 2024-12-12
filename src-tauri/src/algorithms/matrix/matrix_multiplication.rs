#[path = "../vector/vector_multiplication.rs"]
mod vector_multiplication;

pub fn product_of(
    first_factor: Vec<Vec<f64>>,
    second_factor: Vec<Vec<f64>>,
) -> Option<Vec<Vec<f64>>> {
    if first_factor.len() > 0
        && second_factor.len() > 0
        && first_factor[0].len() == second_factor.len()
    {
        let mut product: Vec<Vec<f64>> = Vec::new();

        let col_length_of_first_factor: usize = first_factor.len();
        let row_length_of_second_factor: usize = second_factor[0].len();
        for i in 0..col_length_of_first_factor {
            product.push(Vec::new());
            for j in 0.. row_length_of_second_factor {
                let vector_of_second_factor: Vec<f64> = second_factor
                    .iter()
                    .filter_map(|row| row.get(j))
                    .cloned()
                    .collect();
                match vector_multiplication::scalar_product_of(
                    &first_factor[i],
                    vector_of_second_factor,
                ) {
                    Some(result) => product[i].push(result),
                    None => println!("Fehler"),
                }
            }
        }
        Some(product)
    } else {
        None
    }
}
