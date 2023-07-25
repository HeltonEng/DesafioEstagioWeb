<?php
    session_start();
    // print_r($_REQUEST);
    if(isset($_POST['submit']) && !empty($_POST['nome']) && !empty($_POST['senha']))
    {
        // Acessa
        include_once('conexao.php');
        $nome = $_POST['nome'];
        $senha = $_POST['senha'];

         //print_r('Email: ' . $email);
         //print_r('<br>');
         //print_r('Senha: ' . $senha);

        $sql = "SELECT * FROM colaboradores WHERE nome = '$nome' and senha = '$senha'";

        $result = $conexao->query($sql);

        // print_r($sql);
        // print_r($result);

        if(mysqli_num_rows($result) < 1)
        {
            unset($_SESSION['nome']);
            unset($_SESSION['senha']);
            header('Location: index.php');
        }
        else
        {
            $_SESSION['nome'] = $email;
            $_SESSION['senha'] = $senha;
            header('Location: principal.php');
        }
    }
    else
    {
        // Não acessa
        header('Location: index.php');
    }
?>