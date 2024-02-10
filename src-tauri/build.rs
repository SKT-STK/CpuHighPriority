use std::env;
use std::fs;

fn main() {
  // Get the directory of the target executable
  let exe_dir = env::current_exe().unwrap();
  let exe_dir = exe_dir.parent().unwrap();
  let exe_dir = exe_dir.join("../..");

  // Get the root directory from the target one
  let root_dir = &exe_dir.join("../../..");

  // Copy the files
  fs::copy(root_dir.join("other/app.conf"), exe_dir.join("app.conf")).expect("Failed to copy app.conf");
  // let _ = fs::copy(root_dir.join("regeditadd.bat"), exe_dir.join("regeditadd.bat"));
  // let _ = fs::copy(root_dir.join("regeditremove.bat"), exe_dir.join("regeditremove.bat"));

  tauri_build::build()
}
