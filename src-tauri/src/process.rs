extern crate winapi;

use std::{env, ptr, io::Error, process::exit};
use winapi::um::{
  handleapi::CloseHandle,
  processthreadsapi::{GetCurrentProcess, OpenProcessToken},
  securitybaseapi::GetTokenInformation,
  winnt::{HANDLE, TOKEN_ELEVATION, TOKEN_QUERY, TokenElevation}
};

#[tauri::command]
pub fn get_process_dir() -> String {
  let exe_path = env::current_exe().unwrap();
  String::from(exe_path.parent().unwrap().to_str().unwrap())
}

#[tauri::command]
pub fn exit_app() {
  exit(0);
}

#[tauri::command]
pub fn is_app_elevated() -> bool {
  if let Ok(token) = QueryAccessToken::from_current_process() {
    token.is_elevated().unwrap_or(false)
  }
  else { false }
}

/// A safe wrapper around querying Windows access tokens.
pub struct QueryAccessToken(HANDLE);
impl QueryAccessToken {
  pub fn from_current_process() -> Result<Self, Error> {
    unsafe {
      let mut handle: HANDLE = ptr::null_mut();
      if OpenProcessToken(GetCurrentProcess(), TOKEN_QUERY, &mut handle) != 0 {
        Ok ( Self(handle) )
      }
      else {
        Err(Error::last_os_error())
      }
    }
  }

  pub fn is_elevated(&self) -> Result<bool, Error> {
    unsafe {
      let mut elevation = TOKEN_ELEVATION::default();
      let size = std::mem::size_of::<TOKEN_ELEVATION>() as u32;
      let mut ret_size = size;
      // The weird looking repetition of `as *mut _` is casting the reference to a c_void pointer.
      if GetTokenInformation(self.0, TokenElevation, &mut elevation as *mut _ as *mut _, size, &mut ret_size ) != 0 {
        Ok(elevation.TokenIsElevated != 0)
      }
      else {
        Err(Error::last_os_error())
      }
    }
  }
}
impl Drop for QueryAccessToken {
  fn drop(&mut self) {
    if !self.0.is_null() {
      unsafe { CloseHandle(self.0) };
    }
  }
}
