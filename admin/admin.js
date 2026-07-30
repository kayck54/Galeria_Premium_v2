import {
    db,
    collection,
    getDocs,
    onSnapshot
} from "../firebase.js";

const totalCurtidas = document.getElementById("totalCurtidas");
const maisCurtida = document.getElementById("maisCurtida");
const atividades = document.getElementById("atividades");

async function carregarPainel() {

    const colecao = collection(db, "curtidas");

    onSnapshot(colecao, (snapshot) => {

        const dados = [];

        snapshot.forEach((doc) => {

            dados.push(doc.data());

        });

        let soma = 0;

        dados.forEach(item => {

            soma += item.curtidas;

        });

        totalCurtidas.textContent = soma;

        if (dados.length > 0) {

            dados.sort((a, b) => b.curtidas - a.curtidas);

            maisCurtida.textContent =
                `${dados[0].titulo} (${dados[0].curtidas})`;

        } else {

            maisCurtida.textContent = "-";

        }

        atividades.innerHTML = "";

        dados.forEach(item => {

            atividades.innerHTML += `
                <p>❤️ ${item.titulo}: ${item.curtidas} curtidas</p>
            `;

        });

    });

}

carregarPainel();
