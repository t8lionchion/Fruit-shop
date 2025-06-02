<?php
// 安全檢查 Token（防止濫用）
if (empty($_POST['token']) || $_POST['token'] !== 'FsWga4&@f6aw') {
    echo '<span class="notice">Error: Invalid token!</span>';
    exit;
}

// 擷取並處理表單資料（防止 XSS）
$name    = htmlspecialchars(trim($_POST['name']));
$from    = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$phone   = htmlspecialchars(trim($_POST['phone']));
$subject = htmlspecialchars(trim($_POST['subject']));
$message = nl2br(htmlspecialchars(trim($_POST['message'])));

// 驗證 email 格式
if (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
    echo '<span class="notice">Invalid email address!</span>';
    exit;
}

// 編碼主旨與寄件者名稱（支援中文）
$subject_encoded = "=?UTF-8?B?" . base64_encode($subject) . "?=";
$from_name       = "=?UTF-8?B?" . base64_encode("水果商城聯絡表單") . "?=";
$to              = 'tygfuidseujzx@gmail.com'; // 你的收件信箱

// 建立郵件標頭
$headers  = "From: $from_name <$from>\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

// 信件內容
$body = "
    <strong>Hi 水果商城站長：</strong><br><br>
    有一位使用者透過聯絡表單寄送了訊息：<br><br>
    <strong>姓名：</strong> " . ucfirst($name) . "<br>
    <strong>Email：</strong> $from<br>
    <strong>電話：</strong> $phone<br>
    <strong>主旨：</strong> $subject<br>
    <strong>內容：</strong><br>$message<br><br>
    ---------------------------------------------<br>
    本信由網站自動寄出，請勿直接回覆
";

// 發送信件
if (mail($to, $subject_encoded, $body, $headers, "-f $from")) {
    echo '<div class="success"><i class="fas fa-check-circle"></i><h3>Thank You!</h3>Your message has been sent successfully.</div>';
} else {
    echo '<div class="error">Your message sending failed. Please try again later.</div>';
}
?>
