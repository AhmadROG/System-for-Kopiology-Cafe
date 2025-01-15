<?php
$conn = new mysqli('localhost', 'root', '', 'kopiologydb');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $conn->real_escape_string($_POST['username']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (username, email, password, created_at) VALUES ('$username', '$email', '$password', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo "Sign-up successful! <a href='login.html'>Log In</a>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
