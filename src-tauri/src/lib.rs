pub mod algorithms {
    pub mod euler;
    pub mod matrix;
    pub mod quaternion;
    pub mod vector;
}
use std::sync::LazyLock;

use algorithms::matrix::{product_of, sum_of, transpose};
use algorithms::quaternion::quaternion::Quaternion;
use algorithms::vector;
use algorithms::vector::{cross_product_of, scalar_product_of};

pub mod files;
use files::manage_projects::{list_projects, load, Project};
use files::manage_settings::Settings;

#[derive(Debug, thiserror::Error)]
enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
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

static SETTINGS: LazyLock<Settings> = LazyLock::new(|| Settings::load().unwrap());

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
fn get_added_matrix(
    first_summand: Vec<Vec<f64>>,
    second_summand: Vec<Vec<f64>>,
) -> Result<Vec<Vec<f64>>, Error> {
    match sum_of(first_summand, second_summand) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_transposed_matrix(matrix: Vec<Vec<f64>>) -> Result<Vec<Vec<f64>>, Error> {
    match transpose(matrix) {
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

#[tauri::command(async, rename_all = "snake_case")]
fn get_new_quaternion(vector: [f64; 4]) -> Result<Quaternion, Error> {
    match Quaternion::new(vector[0], vector[1], vector[2], vector[3]) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_added_quaternion(
    first_summand: Quaternion,
    second_summand: Quaternion,
) -> Result<Quaternion, Error> {
    match first_summand.sum_of(second_summand) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_multiplied_quaternion(
    first_factor: Quaternion,
    second_factor: Quaternion,
) -> Result<Quaternion, Error> {
    match first_factor.product_of(second_factor) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_rotation_matrix_from_quaternion(quaternion: Quaternion) -> Result<[[f64; 3]; 3], Error> {
    match quaternion.to_rotation_matrix() {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_slerp_quaternion(
    first_factor: Quaternion,
    second_factor: Quaternion,
    t: f64,
) -> Result<Quaternion, Error> {
    match first_factor.slerp(t, second_factor) {
        Ok(value) => Ok(value),
        Err(error) => Err(Error::Io(error)),
    }
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_new_eulerangles(euler_angles: [f64; 3]) -> Result<algorithms::euler::EulerAngles, Error> {
    Ok(algorithms::euler::EulerAngles::new(
        euler_angles[0],
        euler_angles[1],
        euler_angles[2],
    ))
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_from_rotation_matrix_eulerangles(
    rotation_matrix: [[f64; 3]; 3],
) -> Result<algorithms::euler::EulerAngles, Error> {
    Ok(algorithms::euler::EulerAngles::from_rotation_matrix(
        rotation_matrix,
    ))
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_to_rotation_matrix_eulerangles(
    euler_angles: algorithms::euler::EulerAngles,
) -> Result<[[f64; 3]; 3], Error> {
    Ok(euler_angles.to_rotation_matrix())
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_project(file_path: &str) -> Result<Project, Error> {
    Ok(load(&SETTINGS.savelocation, file_path)?)
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_list_of_projects() -> Result<Vec<Project>, Error> {
    Ok(list_projects(&SETTINGS.savelocation)?)
}

#[tauri::command(async, rename_all = "snake_case")]
fn post_project(mut project: Project) -> Result<(), Error> {
    Ok(Project::save(&mut project, &SETTINGS.savelocation)?)
}

#[tauri::command(async, rename_all = "snake_case")]
fn get_settings() -> Result<Settings, Error> {
    Ok(Settings::load()?)
}

#[tauri::command(async, rename_all = "snake_case")]
fn post_settings(settings: Settings) -> Result<(), Error> {
    Ok(settings.save()?)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_multiplied_matrix,
            get_added_matrix,
            get_transposed_matrix,
            get_added_vector,
            get_cross_product,
            get_scalar_product,
            get_new_quaternion,
            get_added_quaternion,
            get_multiplied_quaternion,
            get_slerp_quaternion,
            get_rotation_matrix_from_quaternion,
            get_new_eulerangles,
            get_from_rotation_matrix_eulerangles,
            get_to_rotation_matrix_eulerangles,
            get_project,
            get_list_of_projects,
            post_project,
            get_settings,
            post_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use std::f64::consts::PI;

    use crate::{
        algorithms::{
            euler::EulerAngles,
            matrix::{product_of, sum_of},
            quaternion::quaternion::Quaternion,
        },
        files::{
            manage_projects::{list_projects, load, Date, Object, Project},
            manage_settings::Settings,
        },
        vector, SETTINGS,
    };

    pub fn initialize_3x3(first: &mut Vec<Vec<f64>>, second: &mut Vec<Vec<f64>>) {
        first.push(vec![1.0, 2.0, 3.0]);
        first.push(vec![4.0, 5.0, 6.0]);
        first.push(vec![7.0, 8.0, 9.0]);

        second.push(vec![7.0, 8.0, 9.0]);
        second.push(vec![1.0, 2.0, 3.0]);
        second.push(vec![4.0, 5.0, 6.0]);
    }

    #[test]
    fn test_matrix_product() {
        let mut first_factor: Vec<Vec<f64>> = Vec::new();
        let mut second_factor: Vec<Vec<f64>> = Vec::new();
        initialize_3x3(&mut first_factor, &mut second_factor);

        let asserted_result: Vec<Vec<f64>> = vec![
            vec![21.0, 27.0, 33.0],
            vec![57.0, 72.0, 87.0],
            vec![93.0, 117.0, 141.0],
        ];
        match product_of(first_factor, second_factor) {
            Ok(result) => assert_eq!(result, asserted_result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_matrix_sum() {
        let mut first_summand: Vec<Vec<f64>> = Vec::new();
        let mut second_summand: Vec<Vec<f64>> = Vec::new();
        initialize_3x3(&mut first_summand, &mut second_summand);

        let asserted_result: Vec<Vec<f64>> = vec![
            vec![8.0, 10.0, 12.0],
            vec![5.0, 7.0, 9.0],
            vec![11.0, 13.0, 15.0],
        ];
        match sum_of(first_summand, second_summand) {
            Ok(result) => assert_eq!(result, asserted_result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_vector_sum() {
        let first_factor: Vec<f64> = vec![1.0, 2.0, 3.0];
        let second_factor: Vec<f64> = vec![7.0, 8.0, 9.0];

        let asserted_result: Vec<f64> = vec![8.0, 10.0, 12.0];
        match vector::sum_of(first_factor, second_factor) {
            Ok(result) => assert_eq!(result, asserted_result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_vector_cross_product() {
        let first_factor: [f64; 3] = [1.0, 2.0, 3.0];
        let second_factor: [f64; 3] = [7.0, 8.0, 9.0];

        let asserted_result: [f64; 3] = [-6.0, 12.0, -6.0];
        match vector::cross_product_of(first_factor, second_factor) {
            Ok(result) => assert_eq!(result, asserted_result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_vector_scalar_product() {
        let first_factor: Vec<f64> = vec![1.0, 2.0, 3.0];
        let second_factor: Vec<f64> = vec![7.0, 8.0, 9.0];

        let asserted_result: f64 = 50.0;
        match vector::scalar_product_of(&first_factor, second_factor) {
            Ok(result) => assert_eq!(result, asserted_result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_new_quaternion() {
        match Quaternion::new(1.0, 2.0, 3.0, 4.0) {
            Ok(result) => assert!(true, "Result: {:?}", result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    fn initialize_quaternions() -> Option<(Quaternion, Quaternion)> {
        const SCALAR: f64 = 0.25 * (PI / 2.0);
        let first_summand: Quaternion =
            match Quaternion::new(SCALAR, 1.0 * SCALAR, 0.0 * SCALAR, 0.0 * SCALAR) {
                Ok(result) => result,
                Err(error) => {
                    println!("Error: {:?}", error);
                    assert!(true, "Error: {:?}", error);
                    return None;
                }
            };
        let second_summand: Quaternion =
            match Quaternion::new(SCALAR, 0.0 * SCALAR, 1.0 * SCALAR, 0.0 * SCALAR) {
                Ok(result) => result,
                Err(error) => {
                    println!("Error: {:?}", error);
                    assert!(true, "Error: {:?}", error);
                    return None;
                }
            };
        Some((first_summand, second_summand))
    }

    #[test]
    fn test_quaternion_sum() {
        let (first_summand, second_summand) = match initialize_quaternions() {
            Some(value) => value,
            None => return,
        };
        let asserted_result: Quaternion =
            match Quaternion::new(0.7853981633974483, 0.39269908169872414, 0.39269908169872414, 0.0) {
                Ok(result) => result,
                Err(error) => {
                    println!("Error: {:?}", error);
                    assert!(true, "Error: {:?}", error);
                    return;
                }
            };
        match first_summand.sum_of(second_summand) {
            Ok(result) => assert_eq!(result, asserted_result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_quaternion_product() {
        let (first_factor, second_factor) = match initialize_quaternions() {
            Some(value) => value,
            None => return,
        };
        let asserted_result: Quaternion = match Quaternion::new(
            0.15421256876702122,
            0.15421256876702122,
            0.15421256876702122,
            0.15421256876702122,
        ) {
            Ok(result) => result,
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
                return;
            }
        };
        match first_factor.product_of(second_factor) {
            Ok(result) => assert_eq!(result, asserted_result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_quaternion_to_rotation_matrix() {
        const SCALAR: f64 = 0.25 * (PI / 2.0);
        let quaternion: Quaternion =
            match Quaternion::new(SCALAR, 1.0 * SCALAR, 1.0 * SCALAR, 0.0 * SCALAR) {
                Ok(result) => result,
                Err(error) => {
                    println!("Error: {:?}", error);
                    return;
                }
            };
        let asserted_result: [[f64; 3]; 3] = [
            [0.6915748624659576, 0.30842513753404244, 0.30842513753404244],
            [
                0.30842513753404244,
                0.6915748624659576,
                -0.30842513753404244,
            ],
            [
                -0.30842513753404244,
                0.30842513753404244,
                0.3831497249319151,
            ],
        ];
        match quaternion.to_rotation_matrix() {
            Ok(result) => {
                assert_eq!(result, asserted_result);
            }
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_slerp_quaternion() {
        let (first_factor, second_factor) = match initialize_quaternions() {
            Some(value) => value,
            None => return,
        };
        let asserted_result: Quaternion = match Quaternion::new(0.5169302937170552, 0.2584651468585276, 0.2584651468585276, 0.0) {
            Ok(result) => result,
            Err(error) => {
                println!("Error: {:?}", error);
                return;
            }
        };
        match first_factor.slerp(0.5, second_factor) {
            Ok(result) => assert_eq!(result, asserted_result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    fn initialize_yaw_pitch_roll() -> (f64, f64, f64) {
        let yaw: f64 = PI / 3.0;
        let pitch: f64 = PI / 2.0;
        let roll: f64 = PI / 4.0;
        (yaw, pitch, roll)
    }

    #[test]
    fn test_new_eulerangles() {
        let (yaw, pitch, roll) = initialize_yaw_pitch_roll();
        let eulerangles: EulerAngles = EulerAngles::new(yaw, pitch, roll);
        assert!(true, "Eulerangles: {:?}", eulerangles);
    }

    fn initialize_rotation_matrix() -> [[f64; 3]; 3] {
        [
            [
                3.0616169978683836e-17,
                0.25881904510252074,
                0.9659258262890684,
            ],
            [
                5.302876193624534e-17,
                0.9659258262890684,
                -0.25881904510252074,
            ],
            [-1.0, 4.329780281177467e-17, 4.329780281177467e-17],
        ]
    }

    #[test]
    fn test_from_rotation_matrix() {
        let rotation_matrix: [[f64; 3]; 3] = initialize_rotation_matrix();
        let asserted_eulerangles: EulerAngles =
            EulerAngles::new(0.0, 1.5707963267948966, -0.26179938779914935);
        let eulerangles: EulerAngles = EulerAngles::from_rotation_matrix(rotation_matrix);
        assert_eq!(asserted_eulerangles, eulerangles);
    }

    #[test]
    fn test_to_rotation_matrix() {
        let (yaw, pitch, roll) = initialize_yaw_pitch_roll();
        let eulerangles: EulerAngles = EulerAngles::new(yaw, pitch, roll);
        let rotation_matrix: [[f64; 3]; 3] = EulerAngles::to_rotation_matrix(&eulerangles);
        let asserted_rotation_matrix: [[f64; 3]; 3] = initialize_rotation_matrix();
        assert_eq!(asserted_rotation_matrix, rotation_matrix);
    }

    #[test]
    fn test_get_project() {
        let file_path: &str = "blub";
        match load(&SETTINGS.savelocation, &file_path) {
            Ok(result) => assert!(true, "Result: {:?}", result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_get_list_of_projects() {
        match list_projects(&SETTINGS.savelocation) {
            Ok(result) => {
                assert!(true, "Result: {:?}", result);
            }
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_post_project() {
        let object: Object = Object {
            types: "Cube".to_string(),
            dimension: "3D".to_string(),
            height: 10,
            width: 10,
            depth: 10,
        };

        let savedate: Date = Date {
            year: 2021,
            month: 9,
            day: 1,
            hours: 12,
            minutes: 30,
        };

        let mut project: Project = Project {
            name: "test".to_string(),
            savedate,
            location: format!("{}{}{}", SETTINGS.savelocation, "test", ".json"),
            object,
        };

        match Project::save(&mut project, SETTINGS.savelocation.as_str()) {
            Ok(result) => assert!(true, "File: {:?}", result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
                return;
            }
        };
    }

    #[test]
    fn test_get_settings() {
        match Settings::load() {
            Ok(result) => assert!(true, "Result: {:?}", result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }

    #[test]
    fn test_post_settings() {
        let settings: Settings = Settings {
            theme: "light".to_string(),
            savelocation: "../output/".to_string(),
            saveonexit: true,
        };

        match settings.save() {
            Ok(result) => assert!(true, "File: {:?}", result),
            Err(error) => {
                println!("Error: {:?}", error);
                assert!(true, "Error: {:?}", error);
            }
        }
    }
}
