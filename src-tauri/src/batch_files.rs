use std::{env, fs};

#[tauri::command]
pub fn create_bat_files() {
  let path = env::current_exe().unwrap();
  let path = path.parent().unwrap();
  let path_1 = &path.join("regeditadd.bat");
  let path_2 = path.join("regeditremove.bat");

  if !path_1.is_file() {
    fs::write(path_1, "@echo off\nSETLOCAL\nSET PATH=%~dp0;%PATH%\n\nREG ADD \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\%~1\\PerfOptions\" /v \"CpuPriorityClass\" /t \"REG_DWORD\" /d \"3\" /f\n\nENDLOCAL\nexit\n").unwrap();
  }

  if !path_2.is_file() {
    fs::write(path_2, "@echo off\nSETLOCAL\nSET PATH=%~dp0;%PATH%\n\nREG DELETE \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\%~1\" /f\n\nENDLOCAL\nexit\n").unwrap();
  }
}
