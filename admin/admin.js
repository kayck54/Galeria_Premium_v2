const totalCurtidas = document.getElementById("totalCurtidas");
const maisCurtida = document.getElementById("maisCurtida");
const atividades = document.getElementById("atividades");

// Simulação (será substituída pelo Firebase)
const dados = {
    curtidas: [
        { nome: "Neymar", total: 8 },
        { nome: "Honda Civic", total: 5 },
        { nome: "Bíblia", total: 3 },
        { nome: "Praia", total: 2 },
        { nome: "Girassol", total: 1 }
    ],
    atividades: [
        "🕒 Alguém curtiu Neymar",
        "🕒 Alguém curtiu Honda Civic",
        "🕒 Alguém curtiu Bíblia",
        "🕒 Alguém curtiu Praia",
        "🕒 Alguém curtiu Girassol"
    ]
};

function carregarPainel() {

    const soma = dados.curtidas.reduce((t, item) => t + item.total, 0);

    totalCurtidas.textContent = soma;

    const top = dados.curtidas.sort((a, b) => b.total - a.total)[0];

    maisCurtida.textContent = top.nome;

    atividades.innerHTML = "";

    dados.atividades.forEach(item => {

        atividades.innerHTML += `<p>${item}</p>`;

    });

}

carregarPainel();
