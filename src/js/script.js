//Funcoes de carregamento de pagina
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const pageContent = document.getElementById('page-content');

// Função para carregar o conteúdo da página no elemento "page-content"
function loadPage(pageUrl) {
    fetch(pageUrl)
        .then(response => response.text())
        .then(data => {
            if (pageUrl === 'sair.php') {
                alert("Até logo.");
                window.location.replace("index.php");
            }
            pageContent.innerHTML = data;
            const inicial = document.getElementById("inicial")
            if (inicial) {
                inicial.style.display = 'none';
            }

            // Carrega os dados da API apenas quando a página colaboradores.php é carregada
            if (pageUrl === 'colaboradores.php') {
                fetchColaboradoresData();
            }
        })
        .catch(error => {
            console.error('Erro ao carregar a página:', error);
        });
}

// Event listener para os links do menu
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const pageUrl = this.getAttribute('data-page');
        loadPage(pageUrl);
    });
});

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    setTimeout(() => {
        const element = document.querySelector('.content');
        element.classList.toggle('open');
    },20)
});

//Lendo dados
// Função para carregar os dados da API e preencher a tabela
function fetchColaboradoresData() {
    fetch('api.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //const tableBody = document.getElementById('tableClient');
            // Limpa a tabela antes de preencher com os dados atualizados
            //tableBody.innerHTML = '';

            // Loop pelos dados recebidos e cria uma nova linha na tabela para cada colaborador
            data.forEach(colaborador => {
                //const newRow = tableBody.insertRow();
                const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                    <td>${colaborador.id}</td>
                    <td>${colaborador.nome}</td>
                    <td>${colaborador.senha}</td>
                    <td>
                        <button type="button" class="button green" onclick=editar(${colaborador.id})>Editar</button>
                        <button type="button" class="button red" onclick="deleta(${colaborador.id})">Excluir</button>
                    </td>
                `;
                document.querySelector('#tableClient>tbody').appendChild(newRow);
              });
        })
}

//busca
function buscar(){
    b = document.getElementById('busca').value;
    console.log(b);
    fetch('api.php?busca=' + b)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const tableBody = document.getElementById('tableClient');
        // Limpa a tabela antes de preencher com os dados atualizados
        tableBody.innerHTML = '';

        // Loop pelos dados recebidos e cria uma nova linha na tabela para cada colaborador
        data.forEach(colaborador => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td>${colaborador.id}</td>
                <td>${colaborador.nome}</td>
                <td>
                    <button type="button" class="button green" onclick=editar(${colaborador.id})>Editar</button>
                    <button type="button" class="button red" onclick="deleta(${colaborador.id})">Excluir</button>
                </td>
            `;
        });
    })
    .catch(function(error) {
        console.log(error);
      });
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
//btn.onclick = function() {
//  modal.style.display = "block";
//}
function abrirModal(){
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function closeForm() {
    let btn = document.getElementById('salvar');
    btn.innerHTML = 'Salvar';
    let title = document.getElementById('tm');
    title.innerHTML = 'Novo Colaborador'
    modal.style.display = "none";
}

//Criar
function salvarForm() {
    if(document.getElementById('nome').value != "" && document.getElementById('senha').value != ""){
    cad = '{"id":"","nome":"' + document.getElementById('nome').value + '","senha":"' + document.getElementById('senha').value + '"}';
    console.log(cad);

    fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: cad
    })
        .then(response => response.json());

    //document.location.reload(true);
    modal.style.display = "none";
    loadPage("colaboradores.php");
    }else{
        alert('Preencha todos os campos!!!');
    }
}

//Apagar
function deleta(index) {
    if (confirm("Confirma exclusão do registro?")){
        //console.log(index);
        fetch('api.php?id=' + index, {
            method: 'DELETE'
        })
        .then(response => response.json());
        document.location.reload();
    }
}

//Editar
function editar(id) {
    //console.log(index);
    let btn = document.getElementById('salvar');
    btn.innerHTML = 'Editar';
    let title = document.getElementById('tm');
    title.innerHTML = 'Editar';
    document.getElementById('salvar').onclick = function () {
        //console.log(index);
        cad = '{"id":' + id + ',"nome":"' + document.getElementById('nome').value + '","senha":"' + document.getElementById('senha').value + '"}';

        console.log(cad);
        fetch('api.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: cad
        })
            .then(response => response.json());
        //document.location.reload();
        let btn = document.getElementById('salvar');
        btn.innerHTML = 'Salvar';
        let title = document.getElementById('tm');
        title.innerHTML = 'Novo Colaborador'
        modal.style.display = "none";
        loadPage("colaboradores.php");
    };

    fetch('api.php?id=' + id)
        .then(T => T.json())
        .then(data => {
            console.log(data[0]);
            console.log(data[0].nome + " : " + data[0].senha);
            document.getElementById('nome').value = data[0].nome;
            document.getElementById('senha').value = data[0].senha;
        });
  
    modal.style.display = "block";
}