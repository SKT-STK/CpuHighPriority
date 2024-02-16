// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_operations;
mod process;
mod window;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      file_operations::write_file,
      file_operations::read_file,
      process::get_process_dir,
      window::show_main_win,
      process::is_app_elevated,
      process::exit_app
    ])
    .run(tauri::generate_context!())
    .expect("Could not start Tauri application.");
}
