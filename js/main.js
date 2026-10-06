// 1. REGISTRANDO PLUGINS
gsap.registerPlugin(ScrollTrigger);

// 1. Seleção dos nós do DOM
const banner = document.querySelector(".container-animation");
const banner1 = document.querySelector(".banner-1");
const banner2 = document.querySelector(".banner-2");

function criarCarrossel() {
  const track = document.querySelector(".carousel-track");
  const banners = document.querySelectorAll(".banner-1, .banner-2");
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");
  const container = document.querySelector(".container-animation");

  if (!track || !nextButton || !prevButton || !container) return;

  let indiceAtual = 0;
  let tempoTransicao = 5000;
  let timerAutoplay = null;

  function atualizarBanners() {
    track.style.transform = `translateX(-${indiceAtual * 100}%)`;
  }

  function proximoBanner() {
    // Se o mouse estiver sobre o container (mesmo antes da página carregar), impede o avanço
    if (container.matches(":hover")) return;

    if (indiceAtual < banners.length - 1) {
      indiceAtual++;
    } else {
      indiceAtual = 0;
    }
    atualizarBanners();
  }

  function bannerAnterior() {
    if (indiceAtual > 0) {
      indiceAtual--;
    } else {
      indiceAtual = banners.length - 1;
    }
    atualizarBanners();
  }

  function iniciarAutoplay() {
    pararAutoplay();
    // Só inicia se o mouse NÃO estiver sobre o carrossel no momento
    if (!container.matches(":hover")) {
      timerAutoplay = setInterval(proximoBanner, tempoTransicao);
    }
  }

  function pararAutoplay() {
    if (timerAutoplay) {
      clearInterval(timerAutoplay);
      timerAutoplay = null;
    }
  }

  // --- EVENTOS DE PAUSA ---

  // Entrada e saída do mouse
  container.addEventListener("mouseenter", pararAutoplay);
  container.addEventListener("mouseleave", iniciarAutoplay);

  // Pausa ao focar com o teclado ou clicar em elementos internos (ex: hotspots)
  container.addEventListener("focusin", pararAutoplay);
  container.addEventListener("focusout", iniciarAutoplay);

  // Botões manuais
  nextButton.addEventListener("click", () => {
    if (indiceAtual < banners.length - 1) {
      indiceAtual++;
    } else {
      indiceAtual = 0;
    }
    atualizarBanners();
    iniciarAutoplay();
  });

  prevButton.addEventListener("click", () => {
    bannerAnterior();
    iniciarAutoplay();
  });

  // Inicialização
  iniciarAutoplay();
}

document.addEventListener("DOMContentLoaded", criarCarrossel);

// 2. Criação da Instância Timeline com ScrollTrigger encapsulado
/*const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: banner,
    start: "top top",
    end: "+=100%",
    pin: true,
    scrub: true
  }
});

// 3. Encadeamento da transição entre os banners
timeline
  .to(banner1, { 
    opacity: 0, 
    visibility: "hidden", 
    duration: 0.2 
  })
  .to(banner2, { 
    opacity: 1, 
    visibility: "visible", 
    duration: 0.3 
  }, "<");

timeline.to(banner1, { opacity: 0, visibility: "hidden", duration: 0.5 })
.to(banner2, { opacity: 1, visibility: "visible", duration: 0.5 }, "<");
*/ 

const hotspots = document.querySelectorAll(".hotspot");

hotspots.forEach((hotspot) => {

  hotspot.addEventListener("click", (event) => {

    event.stopPropagation();

    const isActive = hotspot.classList.contains("is-active");

    // Fecha todos
    hotspots.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-expanded", "false");
    });

    // Abre o selecionado
    if (!isActive) {
      hotspot.classList.add("is-active");
      hotspot.setAttribute("aria-expanded", "true");
    }

  });

});


  hotspots.forEach((hotspot) => {
    hotspot.classList.remove("is-active");
    hotspot.setAttribute("aria-expanded", "false");
  });

  function inicializarZoomImagens() {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("modal-caption");
  const closeBtn = document.querySelector(".modal-close");

  if (!modal || !modalImg) return;

  // Seleciona todas as imagens que possuem a classe .zoomable
  const imagens = document.querySelectorAll("img.zoomable");

  imagens.forEach((img) => {
    img.addEventListener("click", function () {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      modalImg.src = this.src;
      captionText.textContent = this.alt || "";
      document.body.style.overflow = "hidden"; // Impede rolar a página com o modal aberto
    });
  });

  // Função para fechar o modal
  function fecharModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restaura a rolagem da página
  }

  // Fechar ao clicar no botão 'X'
  if (closeBtn) {
    closeBtn.addEventListener("click", fecharModal);
  }

  // Fechar ao clicar no fundo escuro fora da imagem
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      fecharModal();
    }
  });

  // Fechar ao apertar a tecla ESC no teclado
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      fecharModal();
    }
  });
}

// Inicializa a função após carregar o DOM
document.addEventListener("DOMContentLoaded", inicializarZoomImagens);
