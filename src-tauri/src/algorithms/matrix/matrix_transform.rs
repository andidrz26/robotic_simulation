use std::f64;

pub fn transpose(matrix: Vec<Vec<f64>>) -> Option<Vec<Vec<f64>>> {
    let rows: usize = matrix.len();
    let cols: usize = matrix[0].len();

    if rows != 0 && cols != 0 && rows == cols {
        let mut transposed_matrix: Vec<Vec<f64>> = vec![vec![0.0, rows as f64]; cols];
        for i in 0..rows {
            for j in 0..cols {
                transposed_matrix[j][i] = matrix[i][j];
            }
        }
        Some(transposed_matrix)
    } else {
        None
    }
}

fn determinant_3x3(matrix: [[f64; 3]; 3]) -> f64 {
    matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1])
        - matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0])
        + matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
}

fn minor(matrix: [[f64; 4]; 4], row: usize, col: usize) -> [[f64; 3]; 3] {
    let mut minor: [[f64; 3]; 3] = [[0.0; 3]; 3];
    let mut minor_row: usize = 0;

    for i in 0..4 {
        if i != row {
            let mut minor_col: usize = 0;

            for j in 0..4 {
                if j != col {
                    minor[minor_row][minor_col] = matrix[i][j];
                    minor_col += 1;
                }
            }
            minor_row += 1;
        }
    }
    minor
}

fn determinant_4x4(matrix: [[f64; 4]; 4]) -> f64 {
    let mut det: f64 = 0.0;

    for col in 0..4 {
        let sign: f64 = if col % 2 == 0 {1.0} else {-1.0};
        det += sign * matrix[0][col] * determinant_3x3(minor(matrix, 0, col));
    }
    det
}

fn cofactor_matrix(matrix: [[f64; 4]; 4]) -> [[f64; 4]; 4] {
    let mut cofactor: [[f64; 4]; 4] = [[0.0; 4]; 4];

    for i in 0..4 {
        for j in 0..4 {
            let sign: f64 = if (i + j) % 2 == 0 {1.0} else {-1.0};
            cofactor[i][j] = sign * determinant_3x3(minor(matrix, i, j));
        }
    }
    cofactor
}

pub fn invert_4x4(matrix: [[f64; 4]; 4]) -> Option<[[f64; 4]; 4]> {
    let det: f64 = determinant_4x4(matrix);
    if det.abs() < 1e-10 {
        None
    } else {
        let cofactor: [[f64; 4]; 4] = cofactor_matrix(matrix);
        let adjugate: Vec<Vec<f64>>;
        match transpose(cofactor.iter().map(|row: &[f64; 4]| row.to_vec()).collect()) {
            Some(result) => adjugate = result,
            None => return None,
        }
        let mut inverse: [[f64; 4]; 4] = [[0.0; 4]; 4];

        for i in 0..4 {
            for j in 0..4 {
                inverse[i][j] = adjugate[i][j] / det;
            }
        }
        Some(inverse)
    }
}
