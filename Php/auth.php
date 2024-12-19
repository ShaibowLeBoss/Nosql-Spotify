<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Exemple de validation simple
  if ($username === 'user' && $password === 'pass') {
    $_SESSION['user'] = $username;
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'message' => 'Identifiants invalides']);
  }
}
?>
