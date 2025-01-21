use std::fs::File;
use std::io::{self, Write};
use std::path::Path;

pub fn upload_file(file_path: &str, content: &[u8]) -> io::Result<()> {
    let path = Path::new(file_path);
    let mut file = File::create(&path)?;
    file.write_all(content)?;
    Ok(())
}