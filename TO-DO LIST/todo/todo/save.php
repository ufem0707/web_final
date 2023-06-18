<?php
$file = 'db.json';

// 檢查 POST 請求中是否有資料
if (isset($_POST['data'])) {
  // 取得 POST 資料
  $data = $_POST['data'];

  // 將資料寫入到 db.json 檔案
  file_put_contents($file, $data);

  // 回傳成功訊息
  echo json_encode(array('status' => 'success'));
} else {
  // 回傳錯誤訊息
  echo json_encode(array('status' => 'error'));
}
?>