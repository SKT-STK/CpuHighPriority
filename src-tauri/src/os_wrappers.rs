extern crate winapi;

use std::{io::Error, ptr};
use winapi::um::{
  handleapi::CloseHandle,
  processthreadsapi::{GetCurrentProcess, OpenProcessToken},
  securitybaseapi::GetTokenInformation,
  winnt::{HANDLE, TOKEN_ELEVATION, TOKEN_QUERY, TokenElevation}
};

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
      // In Rust: "as *mut _ as *mut _" is basically C++'s "reinterpret_cast<void*>"
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
