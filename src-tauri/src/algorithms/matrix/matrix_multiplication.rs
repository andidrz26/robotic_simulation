use crate::algorithms::vector::vector_multiplication;

pub fn product_of(
    first_factor: Vec<Vec<f64>>,
    second_factor: Vec<Vec<f64>>,
) -> Result<Vec<Vec<f64>>, std::io::Error> {
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
                    Ok(result) => product[i].push(result),
                    Err(error) => return Err(error),
                }
            }
        }
        Ok(product)
    } else {
        Err(std::io::Error::new(std::io::ErrorKind::InvalidData, "Error: Input data not valid"))
    }
}
