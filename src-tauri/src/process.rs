use std::{env, str, process::Command};

#[tauri::command]
pub fn get_process_dir() -> String {
  let exe_path = env::current_exe().unwrap();
  String::from(exe_path.parent().unwrap().to_str().unwrap())
}

#[tauri::command]
pub fn get_operating_system() -> String {
  let output = Command::new("cmd")
    .args(&["/C", "wmic os get Caption"])
    .output()
    .unwrap();

  let os_caption = str::from_utf8(&output.stdout)
    .unwrap()
    .trim()
    .to_string();

  if os_caption.contains("Windows 10") {
    String::from("Win10")
  }
  else if os_caption.contains("Windows 11") {
    String::from("Win11")
  }
  else {
    String::from("")
  }
}
