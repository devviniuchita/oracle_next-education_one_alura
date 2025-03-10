let amigos = [];
let sorteioRealizado = false;
let pares = [];

function adicionarAmigo() {
  let inputNome = document.getElementById("amigo");
  let nome = inputNome.value.trim();

  if (nome === "") {
    alert("Por favor, insira um nome.");
    return;
  }
  if (amigos.includes(nome)) {
    alert("Este nome já foi adicionado.");
    return;
  }

  amigos.push(nome);
  inputNome.value = "";
  atualizarLista();
}

function atualizarLista() {
  let lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";

  for (let amigo of amigos) {
    let item = document.createElement("li");
    item.textContent = amigo;

    let botaoRemover = document.createElement("button");
    botaoRemover.textContent = "❌";
    botaoRemover.onclick = function () {
      removerAmigo(amigo);
    };
    botaoRemover.style.marginLeft = "10px";
    botaoRemover.style.cursor = "pointer";

    item.appendChild(botaoRemover);
    lista.appendChild(item);
  }

  let listaParticipantes = document.getElementById("lista-participantes");
  listaParticipantes.innerHTML = "";
  for (let amigo of amigos) {
    let item = document.createElement("div");
    item.textContent = amigo;
    listaParticipantes.appendChild(item);
  }
  let tituloParticipantes = document.querySelector(".results__title");
  tituloParticipantes.innerHTML = `Total: ${amigos.length} Participante${
    amigos.length !== 1 ? "s" : ""
  }`;
}

function removerAmigo(nome) {
  let indice = amigos.indexOf(nome);
  if (indice !== -1) {
    amigos.splice(indice, 1);
    alert(`Nome removido: ${nome}`);

    atualizarLista();

    if (amigos.length === 0) {
      pares = [];
      sorteioRealizado = false;
      document.getElementById("resultado-sorteio").innerHTML = "";
      alert("Todos os nomes foram removidos. O sorteio foi reiniciado.");
    }
  }
}

function sortearAmigo() {
  if (amigos.length < 2) {
    alert("Adicione pelo menos dois amigos antes de sortear.");
    return;
  }
  if (sorteioRealizado) {
    alert("O sorteio já foi realizado. Reinicie o sorteio para fazer um novo.");
    return;
  }
  if (amigos.length % 2 !== 0) {
  }

  let amigosSorteados = [...amigos];

  amigosSorteados.sort(() => Math.random() - 0.5);

  pares = [];
  for (let i = 0; i < amigosSorteados.length; i++) {
    let amigo = amigosSorteados[i];
    let amigoSecreto = amigosSorteados[(i + 1) % amigosSorteados.length];
    pares.push({ amigo: amigo, amigoSecreto: amigoSecreto });
  }

  exibirResultado();
  sorteioRealizado = true;
}

function exibirResultado() {
  let resultado = document.getElementById("resultado-sorteio");
  resultado.innerHTML = "";
  for (let par of pares) {
    let item = document.createElement("div");
    item.textContent = `${par.amigo} ➔ ${par.amigoSecreto}`;
    resultado.appendChild(item);
  }
}

function apagarNomes() {
  if (amigos.length === 0) {
    alert("Não há nomes para remover.");
    return;
  }
  let confirmacao = confirm("Tem certeza que deseja remover todos os nomes?");
  if (confirmacao) {
    amigos = [];
    pares = [];
    sorteioRealizado = false;
    atualizarLista();
    document.getElementById("resultado-sorteio").innerHTML = "";
    alert("Todos os nomes foram removidos. O sorteio foi reiniciado.");
  }
}

function reiniciarSorteio() {
  if (amigos.length === 0 && pares.length === 0) {
    alert("Não há sorteios para reiniciar!");
    return;
  }

  pares = [];
  sorteioRealizado = false;
  document.getElementById("resultado-sorteio").innerHTML = "";
  document.getElementById("listaAmigos").innerHTML = "";

  alert("Sorteio reiniciado.");
}
