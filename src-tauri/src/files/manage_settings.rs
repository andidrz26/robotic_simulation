use std::{fs::File, io::{self, Read, Write}};

use serde::{Deserialize, Serialize};
use serde_json::to_string;

#[derive(Serialize, Deserialize, Debug)]
pub struct Settings {
    #[cfg(test)]
    pub theme: String,
    pub savelocation: String,
    #[cfg(test)]
    pub saveonexit: bool,
    #[cfg(not(test))]
    theme: String,
    #[cfg(not(test))]
    saveonexit: bool,
}

impl Settings {
    pub fn save(&self) -> io::Result<()> {
        let save_dir = std::path::Path::new("/Users/andip/Desktop/Sim/saveFiles");
        if !save_dir.exists() {
            std::fs::create_dir_all(save_dir)?;
        }
        let mut file = File::create("/Users/andip/Desktop/Sim/saveFiles/settings.json")?;
        file.write_all(&to_string(&self)?.into_bytes())?;
        Ok(())
    }

    pub fn load() -> io::Result<Settings> {
        let mut file = File::open("/Users/andip/Desktop/Sim/saveFiles/settings.json")?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer)?;
        let settings: Settings = serde_json::from_slice(&buffer)?;
        Ok(settings)
    }
}