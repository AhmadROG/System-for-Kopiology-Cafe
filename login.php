<?php
$conn = new mysqli('localhost', 'root', '', 'kopiologydb');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    $sql = "SELECT id, username, password FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            echo "Welcome, " . $row['username'] . "! <a href='index.html'>Go to Home</a>";
        } else {
            echo "Invalid credentials. <a href='login.html'>Try again</a>";
        }
    } else {
        echo "No account found. <a href='signup.html'>Sign up</a>";
    }
}

$conn->close();
?>
