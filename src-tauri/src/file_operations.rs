use std::{path, fs};

#[tauri::command]
pub fn write_file(content: &str, path: &str) {
  let path = path::Path::new(path);
  fs::write(path, content).unwrap();
}

#[tauri::command]
pub fn read_file(path: &str) -> String {
  let path = path::Path::new(path);
  fs::read_to_string(path)
    .unwrap_or(String::from(""))
}
