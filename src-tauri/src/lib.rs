pub mod algorithms {
    pub mod euler;
    pub mod matrix;
    pub mod quaternion;
    pub mod vector;
}

use algorithms::matrix::product_of;

#[tauri::command(async, rename_all = "snake_case")]
fn get_multiplied_matrix(first_factor: Vec<Vec<f64>>, second_factor: Vec<Vec<f64>>) -> Vec<Vec<f64>> {

    match product_of(first_factor, second_factor) {
        Some(value) => return value,
        None => Vec::new(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_multiplied_matrix])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
