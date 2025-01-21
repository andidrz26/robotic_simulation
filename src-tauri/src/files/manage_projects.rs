use std::fs::File;
use std::io::{self, Read, Write};

use serde::{Deserialize, Serialize};
use serde_json::to_string;

#[derive(Serialize, Deserialize, Debug)]
pub struct Object {
    #[cfg(test)]
    pub types: String,
    #[cfg(test)]
    pub dimension: String,
    #[cfg(test)]
    pub height: String,
    #[cfg(test)]
    pub width: String,
    #[cfg(test)]
    pub depth: String,
    #[cfg(not(test))]
    types: String,
    #[cfg(not(test))]
    dimension: String,
    #[cfg(not(test))]
    height: String,
    #[cfg(not(test))]
    width: String,
    #[cfg(not(test))]
    depth: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Project {
    #[cfg(test)]
    pub name: String,
    #[cfg(test)]
    pub location: String,
    #[cfg(test)]
    pub save_date: String,
    #[cfg(test)]
    pub object: Object,
    #[cfg(not(test))]
    name: String,
    #[cfg(not(test))]
    location: String,
    #[cfg(not(test))]
    save_date: String,
    #[cfg(not(test))]
    object: Object,
}

impl Project {
    pub fn save(&self) -> io::Result<()> {
        let mut file = File::create(&self.location)?;
        file.write_all(&to_string(&self)?.into_bytes())?;
        Ok(())
    }

    pub fn load(location: &str) -> io::Result<Project> {
        let mut file = File::open(location)?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer)?;
        let project: Project = serde_json::from_slice(&buffer)?;
        Ok(project)
    }
}
