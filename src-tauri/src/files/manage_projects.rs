use std::fs::File;
use std::io::{self, Read, Write};

use serde::{Deserialize, Serialize};
use serde_json::to_string;

#[derive(Serialize, Deserialize, Debug)]
pub struct Date {
    #[cfg(test)]
    pub year: i64,
    #[cfg(test)]
    pub month: i64, // counts from 0 to 11
    #[cfg(test)]
    pub day: i64,
    #[cfg(test)]
    pub hours: i64,
    #[cfg(test)]
    pub minutes: i64,
    #[cfg(not(test))]
    year: i64,
    #[cfg(not(test))]
    month: i64,
    #[cfg(not(test))]
    day: i64,
    #[cfg(not(test))]
    hours: i64,
    #[cfg(not(test))]
    minutes: i64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Object {
    #[cfg(test)]
    pub types: String,
    #[cfg(test)]
    pub dimension: String,
    #[cfg(test)]
    pub height: u64,
    #[cfg(test)]
    pub width: u64,
    #[cfg(test)]
    pub depth: u64,
    #[cfg(not(test))]
    types: String,
    #[cfg(not(test))]
    dimension: String,
    #[cfg(not(test))]
    height: u64,
    #[cfg(not(test))]
    width: u64,
    #[cfg(not(test))]
    depth: u64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Project {
    #[cfg(test)]
    pub name: String,
    #[cfg(test)]
    pub savedate: Date,
    #[cfg(test)]
    pub location: String,
    #[cfg(test)]
    pub object: Object,
    #[cfg(not(test))]
    name: String,
    #[cfg(not(test))]
    savedate: Date,
    #[cfg(not(test))]
    location: String,
    #[cfg(not(test))]
    object: Object,
}

static EXTENSION: &str = ".json";

impl Project {
    pub fn save(&mut self, file_path: &str) -> io::Result<()> {
        self.location = format!("{}{}{}", file_path, self.name, EXTENSION);
        let mut file = File::create(&self.location)?;
        file.write_all(&to_string(&self)?.into_bytes())?;
        Ok(())
    }

    pub fn load(location: &str, file_name: &str) -> io::Result<Project> {
        let mut file = File::open(format!("{}{}{}", location, file_name, EXTENSION))?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer)?;
        let project: Project = serde_json::from_slice(&buffer)?;
        Ok(project)
    }
}

pub fn list_projects(location: &str) -> io::Result<Vec<Project>> {
    let mut projects: Vec<Project> = Vec::new();
    for entry in std::fs::read_dir(location)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_file() {
            let file_name = path.file_stem().unwrap().to_str().unwrap().to_string();
            projects.push(Project::load(location, &file_name)?);
        }
    }
    Ok(projects)
}
