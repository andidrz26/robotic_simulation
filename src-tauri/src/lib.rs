pub mod algorithms {
    pub mod euler;
    pub mod matrix;
    pub mod quaternion;
    pub mod vector;
}

use algorithms::matrix::{product_of, sum_of};
use algorithms::vector;
use algorithms::vector::{cross_product_of, scalar_product_of};

#[derive(Debug, thiserror::Error)]
enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error)
}

// we must manually implement serde::Serialize
impl serde::Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_multiplied_matrix(
    first_factor: Vec<Vec<f64>>,
    second_factor: Vec<Vec<f64>>,
) -> Result<Vec<Vec<f64>>, Error> {
    match product_of(first_factor, second_factor) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
    
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_added_matrix(first_summand: Vec<Vec<f64>>, second_summand: Vec<Vec<f64>>) -> Result<Vec<Vec<f64>>, Error> {
    match sum_of(first_summand, second_summand) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_added_vector(first_summand: Vec<f64>, second_summand: Vec<f64>) -> Result<Vec<f64>, Error> {
    match vector::sum_of(first_summand, second_summand) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_cross_product(first_factor: [f64; 3], second_factor: [f64; 3]) -> Result<[f64; 3], Error> {
    match cross_product_of(first_factor, second_factor) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_scalar_product(first_factor: Vec<f64>, second_factor: Vec<f64>) -> Result<f64, Error> {
    match scalar_product_of(&first_factor, second_factor) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_multiplied_matrix,
            get_added_matrix,
            get_added_vector,
            get_cross_product,
            get_scalar_product
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use crate::algorithms::matrix::product_of;

    #[test]
    fn test_scalar_product() {
        let first_factor: Vec<Vec<f64>> = vec![
            vec![1.0, 2.0, 3.0],
            vec![4.0, 5.0, 6.0],
            vec![7.0, 8.0, 9.0],
        ];
        let second_factor: Vec<Vec<f64>> = vec![
            vec![7.0, 8.0, 9.0],
            vec![1.0, 2.0, 3.0],
            vec![4.0, 5.0, 6.0],
        ];
        let asserted_result: Vec<Vec<f64>> = vec![
            vec![21.0, 27.0, 33.0],
            vec![57.0, 72.0, 87.0],
            vec![93.0, 117.0, 141.0],
        ];
        let actual_result;
        match product_of(first_factor, second_factor) {
            Ok(result) => actual_result = result,
            Err(error) => {
                actual_result = vec![];
                println!("{}", error);
            }, 
        }
        assert_eq!(actual_result, asserted_result)
    }
}
