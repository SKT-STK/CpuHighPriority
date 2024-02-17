use std::{env, process::exit as process_exit};
use crate::os_wrappers::QueryAccessToken;

#[tauri::command]
pub fn get_process_dir() -> String {
  let exe_path = env::current_exe().unwrap();
  String::from(exe_path.parent().unwrap().to_str().unwrap())
}

#[tauri::command]
pub fn exit_app() {
  process_exit(0);
}

#[tauri::command]
pub fn is_app_elevated() -> bool {
  if let Ok(token) = QueryAccessToken::from_current_process() {
    token.is_elevated().unwrap_or(false)
  }
  else { false }
}
