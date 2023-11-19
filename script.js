// Sandra & Mário
(function() {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('db_bolsas')) ?? [];
}

function setLocalStorage(db_bolsas) {
  localStorage.setItem('db_bolsas', JSON.stringify(db_bolsas));
}

function limparTabela() {
  const elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const db_bolsas = getLocalStorage();
  let index = 0;
  for (bolsa of db_bolsas) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${bolsa.modelo}</td>
        <td>${bolsa.cor}</td>
        <td>${bolsa.marca}</td>
        <td>${bolsa.materia}</td>
        <td>${bolsa.versatilidade}</td>
        <td>${bolsa.tamanho}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const bolsa = {
    modelo: document.getElementById('modelo').value,
    cor: document.getElementById('cor').value,
    marca: document.getElementById('marca').value,
    materia: document.getElementById('materia').value,
    versatilidade: document.getElementById('versatilidade').value,
    tamanho: document.getElementById('tamanho').value
  }
  const db_bolsas = getLocalStorage();
  db_bolsas.push(bolsa);
  setLocalStorage(db_bolsas);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const db_bolsas = getLocalStorage();
  db_bolsas.splice(index, 1);
  setLocalStorage(db_bolsas);
  atualizarTabela();
}

function validarMarca() { // Adaptação da função validar (10 pontos)
  const db_bolsas = getLocalStorage();
  const feedbackMarca = document.getElementById("feedbackMarca");
  for (bolsa of db_bolsas) {
    console.log(marca.value)
    console.log(bolsa.marca)
    if (marca.value === bolsa.marca) {
      marca.setCustomValidity("Esta marca já existe!");
      feedbackMarca.innerText = "Esta marca já existe!";
      return false;
    } else {
      marca.setCustomValidity("");
      feedbackMarca.innerText = "Informe a marca corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const marca = document.getElementById("marca");
marca.addEventListener('input', validarMarca);