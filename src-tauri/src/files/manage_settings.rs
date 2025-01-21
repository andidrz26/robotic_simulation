use std::{fs::File, io::{self, Read, Write}};

use serde::{Deserialize, Serialize};
use serde_json::to_string;

#[derive(Serialize, Deserialize, Debug)]
pub struct Settings {
    #[cfg(test)]
    pub theme: String,
    #[cfg(test)]
    pub save_location: String,
    #[cfg(test)]
    pub save_on_exit: bool,
    #[cfg(not(test))]
    theme: String,
    #[cfg(not(test))]
    save_location: String,
    #[cfg(not(test))]
    save_on_exit: bool,
}

impl Settings {
    pub fn save(&self) -> io::Result<()> {
        let save_dir = std::path::Path::new("../saveFiles");
        if !save_dir.exists() {
            std::fs::create_dir_all(save_dir)?;
        }
        let mut file = File::create("../saveFiles/settings.json")?;
        file.write_all(&to_string(&self)?.into_bytes())?;
        Ok(())
    }

    pub fn load() -> io::Result<Settings> {
        let mut file = File::open("../saveFiles/settings.json")?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer)?;
        let settings: Settings = serde_json::from_slice(&buffer)?;
        Ok(settings)
    }
}