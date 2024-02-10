use std::env;
use std::fs;

fn main() {
  // Get the directory of the target executable
  let exe_dir = env::current_exe().unwrap();
  let exe_dir = exe_dir.parent().unwrap();
  let exe_dir = exe_dir.join("../..");

  // Get the root directory from the target one
  let debug_dir = &exe_dir.join("../debug");

  // Copy the files
  fs::copy(debug_dir.join("app.conf"), exe_dir.join("app.conf")).expect("Failed to copy app.conf");

  tauri_build::build()
}
