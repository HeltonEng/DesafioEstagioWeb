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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Principal</title>
    <link rel="stylesheet" href="css/styles.css?id=<?php echo time(); ?>" type="text/css">
</head>
<body>
<div class="menu">
<div class="sidebar">
        <h1>Menu</h1>
        <ul>
            <li><a href="#" data-page="colaboradores.php">Colaboradores</a></li>
            <li><a href="sair.php" data-page="sair.php">Sair</a></li>
        </ul>
    </div>

    <div class="content">
        <header>
            <button id="menu-toggle">Menu</button>
        </header>
        <main>
            <div id="inicial">
                <h1>Gestao de Colaboradores.</h1>
                <p>Bem-vindo à página e gerencia de colaboradores utilize o menu lateral para acessar as funções.</p>
            </div>
            <div id="page-content">
                <!-- O conteúdo da página colaboradores.php será carregado aqui -->
            </div>
        </main>
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
    <div class="modal-header">
        <!-- <span class="close">&times;</span> -->
        <center><h2 id="tm">Novo Colaborador</h2></center>
        </div>
        <div class="modal-body">
            <form id="form" class="modal-form">
            <center><input type="text" id="nome" data-index="new" class="textinput" placeholder="Nome do colaborador" required>
                <input type="password" id="senha" class="textinput" placeholder="Senha" required></center>
            </form>
        </div>
        <div class="modal-footer">
            <center>
            <button id="salvar" class="button green" onclick="salvarForm()">Salvar</button>
            <button id="cancelar" class="button blue" onclick="closeForm()">Cancelar</button>
            </center>
        </div>
        </div>
    </div>

    </div>

    <script src="js/script.js"></script>

</body>
</html>