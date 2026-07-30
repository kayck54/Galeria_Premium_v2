import {
    db,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    onSnapshot
} from "./firebase.js";

// ==============================
// GALERIA PREMIUM V2
// ==============================

const imagens = [
    {  id: "anime",
        titulo: "Dragon Ball Super",
        descricao: "Sayajin fortão igual o @kayck.01_",
        categoria: "Anime",
        arquivo: "imagens/anime.jpg"
},
    {
        id: "paisagem",
        titulo: "Paisagem Diferenciada",
        descricao: "Paisagem boa pra pegar a mãe dos seus amigos",
        categoria: "Natureza",
        arquivo: "imagens/paisagem daora.jpg"
    },
    {
        id: "civicg10",
        titulo: "Civic G10 Modificado",
        descricao: "Carro de homem cuiudo",
        categoria: "Carros",
        arquivo: "imagens/civicg10.jpg"
    },
    {
        id: "neymar",
        titulo: "Neymar",
        descricao: "O mais lindo e melhor de todos os tempos.",
        categoria: "Futebol",
        arquivo: "imagens/ney.jpg"
    },
    {
        id: "biblia",
        titulo: "Bíblia",
        descricao: "A Palavra de Deus, eita gloriaa",
        categoria: "Religião",
        arquivo: "imagens/bilbia.jpg"
    },
    {
        id: "civic",
        titulo: "Honda Civic",
        descricao: "Esse é só pra comprar pão",
        categoria: "Carros",
        arquivo: "imagens/Civic.jpg"
    },
    {
        id: "praia",
        titulo: "Praia",
        descricao: "Meu quintal",
        categoria: "Praias",
        arquivo: "imagens/praia.jpg"
    },
    {
        id: "girassol",
        titulo: "Girassol",
        descricao: "Dudu",
        categoria: "Natureza",
        arquivo: "imagens/girassol.jpg"
    }
];

// ==============================
// ELEMENTOS
// ==============================

const galeria = document.getElementById("galeria");
const pesquisa = document.getElementById("pesquisa");
const totalFotos = document.getElementById("totalFotos");
const totalFavoritos = document.getElementById("totalFavoritos");
const categoriaAtual = document.getElementById("categoriaAtual");

const lightbox = document.getElementById("lightbox");
const imagemExpandida = document.getElementById("imagemExpandida");
const tituloImagem = document.getElementById("tituloImagem");
const descricaoImagem = document.getElementById("descricaoImagem");

let categoriaSelecionada = "Todas";

const curtidas = {};
// ==============================
// DASHBOARD
// ==============================

function atualizarDashboard() {
    totalFotos.textContent = imagens.length;
    categoriaAtual.textContent = categoriaSelecionada;
}

// ==============================
// CURTIDAS FIREBASE
// ==============================

async function carregarCurtidas() {

    for (const imagem of imagens) {

        const referencia = doc(db, "curtidas", imagem.id);

        const documento = await getDoc(referencia);

        if (!documento.exists()) {

            await setDoc(referencia, {
                titulo: imagem.titulo,
                curtidas: 0
            });

            curtidas[imagem.id] = 0;

        } else {

            curtidas[imagem.id] = documento.data().curtidas;

        }

        onSnapshot(referencia, (snapshot) => {

            curtidas[imagem.id] = snapshot.data().curtidas;

            criarGaleria();

        });

    }

}

// ==============================
// CURTIR
// ==============================

async function curtir(id) {

    const referencia = doc(db, "curtidas", id);

    await updateDoc(referencia, {

        curtidas: increment(1)

    });

}

// ==============================
// CRIAR GALERIA
// ==============================

function criarGaleria(lista = imagens) {

    galeria.innerHTML = "";

    lista.forEach((imagem) => {

        const total = curtidas[imagem.id] || 0;

        galeria.innerHTML += `
        <div class="card">

            <img
                src="${imagem.arquivo}"
                alt="${imagem.titulo}"
                onclick="abrirLightbox('${imagem.id}')"
            >

            <div class="conteudo">

                <h3>${imagem.titulo}</h3>

                <p>${imagem.descricao}</p>

                <p>❤️ ${total} curtidas</p>

                <div class="acoes">

                    <button onclick="curtir('${imagem.id}')">
                        ❤️ Curtir
                    </button>

                    <button onclick="abrirLightbox('${imagem.id}')">
                        👁 Ver
                    </button>

                </div>

            </div>

        </div>
        `;

    });

    atualizarDashboard();

}
// ==============================
// LIGHTBOX
// ==============================

function abrirLightbox(id) {

    const imagem = imagens.find(img => img.id === id);

    if (!imagem) return;

    imagemExpandida.src = imagem.arquivo;
    tituloImagem.textContent = imagem.titulo;
    descricaoImagem.textContent = imagem.descricao;

    lightbox.style.display = "flex";

}

function fecharLightbox() {

    lightbox.style.display = "none";

}

document
.getElementById("fechar")
.addEventListener("click", fecharLightbox);

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        fecharLightbox();

    }

});

// ==============================
// PESQUISA
// ==============================

pesquisa.addEventListener("input", () => {

    const texto = pesquisa.value.toLowerCase();

    const resultado = imagens.filter(imagem =>

        imagem.titulo.toLowerCase().includes(texto) ||

        imagem.descricao.toLowerCase().includes(texto) ||

        imagem.categoria.toLowerCase().includes(texto)

    );

    criarGaleria(resultado);

});

// ==============================
// CATEGORIAS
// ==============================

const botoesCategorias =
document.querySelectorAll(".categorias button");

botoesCategorias.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesCategorias.forEach(b =>
            b.classList.remove("ativo"));

        botao.classList.add("ativo");

        categoriaSelecionada = botao.textContent;

        if (categoriaSelecionada === "Todas") {

            criarGaleria();

            return;

        }

        criarGaleria(

            imagens.filter(imagem =>

                imagem.categoria === categoriaSelecionada

            )

        );

    });

});

// ==============================
// TEMA
// ==============================

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("light");

});

// ==============================
// INICIALIZAÇÃO
// ==============================
window.curtir = curtir;
window.abrirLightbox = abrirLightbox;

await carregarCurtidas();

criarGaleria();

atualizarDashboard();
