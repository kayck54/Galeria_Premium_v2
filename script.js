// ==============================
// GALERIA PREMIUM V2
// ==============================

// Banco de imagens
const imagens = [
    {
        titulo: "Neymar",
        descricao: "Craque brasileiro",
        categoria: "Futebol",
        arquivo: "imagens/ney.jpg"
    },
    {
        titulo: "Bíblia",
        descricao: "A Palavra de Deus",
        categoria: "Religião",
        arquivo: "imagens/bilbia.jpg"
    },
    {
        titulo: "Honda Civic",
        descricao: "Sedan esportivo",
        categoria: "Carros",
        arquivo: "imagens/civic.jpg"
    },
    {
        titulo: "Praia",
        descricao: "Paisagem paradisíaca",
        categoria: "Praias",
        arquivo: "imagens/praia.jpg"
    },
    {
        titulo: "Girassol",
        descricao: "Natureza",
        categoria: "Natureza",
        arquivo: "imagens/girassol.jpg"
    }
];

// Elementos
const galeria = document.getElementById("galeria");
const pesquisa = document.getElementById("pesquisa");
const totalFotos = document.getElementById("totalFotos");
const totalFavoritos = document.getElementById("totalFavoritos");
const categoriaAtual = document.getElementById("categoriaAtual");

const lightbox = document.getElementById("lightbox");
const imagemExpandida = document.getElementById("imagemExpandida");
const tituloImagem = document.getElementById("tituloImagem");
const descricaoImagem = document.getElementById("descricaoImagem");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let categoriaSelecionada = "Todas";// ==============================
// CRIAR GALERIA
// ==============================

function criarGaleria(lista = imagens){
  // ==============================
// FAVORITOS
// ==============================

function favoritar(indice){

    const nome = imagens[indice].titulo;

    if(favoritos.includes(nome)){

        favoritos = favoritos.filter(item => item !== nome);

    }else{

        favoritos.push(nome);

    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    criarGaleria();

}

// ==============================
// DASHBOARD
// ==============================

function atualizarDashboard(){

    totalFotos.textContent = imagens.length;

    totalFavoritos.textContent = favoritos.length;

    categoriaAtual.textContent = categoriaSelecionada;

}

    galeria.innerHTML = "";

    lista.forEach((imagem, index)=>{

        const curtido = favoritos.includes(imagem.titulo);

        galeria.innerHTML += `

        <div class="card">

            <img
                src="${imagem.arquivo}"
                alt="${imagem.titulo}"
                onclick="abrirLightbox(${index})"
            >

            <div class="conteudo">

                <h3>${imagem.titulo}</h3>

                <p>${imagem.descricao}</p>

                <div class="acoes">

                    <button onclick="favoritar(${index})">

                        ${curtido ? "💖 Curtido" : "❤️ Curtir"}

                    </button>

                    <button onclick="abrirLightbox(${index})">

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

function abrirLightbox(indice){

    const imagem = imagens[indice];

    imagemExpandida.src = imagem.arquivo;
    tituloImagem.textContent = imagem.titulo;
    descricaoImagem.textContent = imagem.descricao;

    lightbox.style.display = "flex";

}

function fecharLightbox(){

    lightbox.style.display = "none";

}

document
.getElementById("fechar")
.addEventListener("click", fecharLightbox);

lightbox.addEventListener("click", function(e){

    if(e.target === lightbox){

        fecharLightbox();

    }

});
// ==============================
// PESQUISA
// ==============================

pesquisa.addEventListener("input", function(){

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

const botoesCategorias = document.querySelectorAll(".categorias button");

botoesCategorias.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesCategorias.forEach(b => b.classList.remove("ativo"));

        botao.classList.add("ativo");

        categoriaSelecionada = botao.textContent;

        if(categoriaSelecionada === "Todas"){

            criarGaleria();

            return;

        }

        const filtradas = imagens.filter(imagem =>

            imagem.categoria === categoriaSelecionada

        );

        criarGaleria(filtradas);

    });

});
// ==============================
// TEMA CLARO / ESCURO
// ==============================

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("light");

});

// ==============================
// INICIALIZAÇÃO
// ==============================

criarGaleria();

atualizarDashboard();
