use tauri::{Manager, Window};

#[tauri::command]
pub async fn show_main_win(window: Window) {
  window.get_window("main")
    .unwrap()
    .show()
    .unwrap();
}
