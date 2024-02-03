// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

#[tauri::command]
fn write_file(content: &str, path: &str) {
  let path = std::path::Path::new(path);
  std::fs::write(path, content).unwrap();
}

#[tauri::command]
fn read_file(path: &str) -> String {
  let path = std::path::Path::new(path);
  match std::fs::read_to_string(path) {
    Ok(x) => x,
    Err(_) => return String::from("{\"executablesPaths\":[]}")
  }
}

#[tauri::command]
fn get_main_exec_dir() -> String {
  let exe_path = env::current_exe().unwrap();
  String::from(exe_path.parent().unwrap().to_str().unwrap())
}

#[tauri::command]
fn create_bat_files() {
  let path = env::current_exe().unwrap();
  let path = path.parent().unwrap();
  let path_1 = &path.join("regeditadd.bat");
  let path_2 = path.join("regeditremove.bat");

  if !path_1.is_file() {
    std::fs::write(path_1, "@echo off\nSETLOCAL\nSET PATH=%~dp0;%PATH%\n\nREG ADD \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\%~1\\PerfOptions\" /v \"CpuPriorityClass\" /t \"REG_DWORD\" /d \"3\" /f\n\nENDLOCAL\nexit\n").unwrap();
  }

  if !path_2.is_file() {
    std::fs::write(path_2, "@echo off\nSETLOCAL\nSET PATH=%~dp0;%PATH%\n\nREG DELETE \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\%~1\" /f\n\nENDLOCAL\nexit\n").unwrap();
  }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![create_bat_files, write_file, read_file, get_main_exec_dir])
    .run(tauri::generate_context!())
    .unwrap();
}
