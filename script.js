let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

function salvarChamados() {
    localStorage.setItem("chamados", JSON.stringify(chamados));
}

function criarChamado() {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    if (!titulo || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const chamado = {
        id: Date.now(),
        titulo,
        descricao,
        status: "Aberto"
    };

    chamados.push(chamado);
    salvarChamados();
    renderizarChamados();

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
}

function renderizarChamados() {
    const lista = document.getElementById("listaChamados");
    lista.innerHTML = "";

    chamados.forEach(ch => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${ch.titulo}</h3>
            <p>${ch.descricao}</p>
            <strong>Status: ${ch.status}</strong>
            <button onclick="fecharChamado(${ch.id})">
                Fechar chamado
            </button>
            <hr>
        `;

        lista.appendChild(div);
    });
}

function fecharChamado(id) {
    chamados = chamados.map(ch =>
        ch.id === id ? { ...ch, status: "Fechado" } : ch
    );

    salvarChamados();
    renderizarChamados();
}

renderizarChamados();
