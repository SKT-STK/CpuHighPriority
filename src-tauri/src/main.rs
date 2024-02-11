// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_operations;
mod batch_files;
mod process;
mod window;

use file_operations::{write_file, read_file};
use batch_files::create_bat_files;
use process::{get_process_dir, get_operating_system};
use window::show_main_win;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      create_bat_files,
      write_file,
      read_file,
      get_process_dir,
      show_main_win,
      get_operating_system
    ])
    .run(tauri::generate_context!())
    .expect("Could not start Tauri application.");
}
