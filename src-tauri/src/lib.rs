pub mod algorithms {
    pub mod euler;
    pub mod matrix;
    pub mod quaternion;
    pub mod vector;
}

use algorithms::matrix::{product_of, sum_of};
use algorithms::vector;
use algorithms::vector::{cross_product_of, scalar_product_of};

#[tauri::command(async, rename_all = "snake_case")]
fn get_multiplied_matrix(
    first_factor: Vec<Vec<f64>>,
    second_factor: Vec<Vec<f64>>,
) -> Vec<Vec<f64>> {
    match product_of(first_factor, second_factor) {
        Some(value) => return value,
        None => Vec::new(),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_added_matrix(first_summand: Vec<Vec<f64>>, second_summand: Vec<Vec<f64>>) -> Vec<Vec<f64>> {
    match sum_of(first_summand, second_summand) {
        Some(value) => return value,
        None => Vec::new(),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_added_vector(first_summand: Vec<f64>, second_summand: Vec<f64>) -> Vec<f64> {
    match vector::sum_of(first_summand, second_summand) {
        Some(value) => return value,
        None => Vec::new(),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_cross_product(first_factor: [f64; 3], second_factor: [f64; 3]) -> [f64; 3] {
    match cross_product_of(first_factor, second_factor) {
        Some(value) => return value,
        None => [0.0; 3],
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_scalar_product(first_factor: Vec<f64>, second_factor: Vec<f64>) -> f64 {
    match scalar_product_of(&first_factor, second_factor) {
        Some(value) => return value,
        None => 0.0,
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
