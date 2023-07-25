<?php
session_start();
include_once('conexao.php');
// print_r($_SESSION);
if ((!isset($_SESSION['nome']) == true) and (!isset($_SESSION['senha']) == true)) {
    unset($_SESSION['nome']);
    unset($_SESSION['senha']);
    header('Location: index.php');
}
$logado = $_SESSION['nome'];
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css\styles.css">
    <title>Cadastro</title>
</head>

<body onload="fetchColaboradoresData()">
    <div class="fundo">
        <button onclick="abrirModal()">Cadastrar</button>
        <center><h1>Colaboradores</h1></center>
        <input id="busca" type="text" placeholder="Pesquisar">
        <button onclick="buscar()">Buscar</button><br>
        <table id="tableClient" class="tb">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Senha</th>
                    <th style="width: 173px;">Ação</th>
                </tr>
                <tr>
                    <th>
                        <div id="cads"></div>
                    </th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
      
        <script src="js/script.js"></script>
</body>

</html>