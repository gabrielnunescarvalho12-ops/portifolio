// ==========================================================================
// RENDERIZAÇÃO DINÂMICA DE PROJETOS (ARRAY E OBJETOS)
// ==========================================================================

// Array de objetos contendo as informações de cada projeto do portfólio
const listaProjetos = [
  {
    titulo: 'Nunes Play Mídia',
    imagem: 'img/nunes-play-midia.jpg',
    alt: 'Capa do projeto Nunes Play Mídia - Portal de notícias sobre cultura pop',
    descricao: 'Projeto de desenvolvimento de um portal de notícias sobre cultura pop, reunindo conteúdos de animes, filmes, séries, videogames e músicas. A plataforma tem como objetivo apresentar novidades, curiosidades e informações sobre o universo do entretenimento, utilizando tecnologias como HTML, CSS e JavaScript para desenvolver uma experiência dinâmica e acessível aos usuários.',
    linkRepositorio: 'https://github.com/gabrielnunescarvalho12-ops/cultura_pop_portal_de_noticias.git',
    linkDemonstracao: '[link-demonstracao]'
  },
  {
    titulo: 'Meu Portfólio',
    imagem: 'img/meu-portfolio.jpg',
    alt: 'Capa do projeto Meu Portfólio - Site pessoal para apresentação de habilidades e projetos',
    descricao: 'Projeto de desenvolvimento de um site pessoal de portfólio, criado para apresentar minhas habilidades, conhecimentos em programação, tecnologias utilizadas e projetos desenvolvidos. A plataforma possui seções sobre mim, competências técnicas, apresentação de projetos e contato, com foco em demonstrar minha evolução na área de desenvolvimento web.',
    linkRepositorio: 'https://github.com/gabrielnunescarvalho12-ops/projeto-web.git',
    linkDemonstracao: '[link-demonstracao]'
  }
];

// Função responsável por gerar a marcação HTML de um cartão de projeto individual
function criarCartaoProjeto(projeto) {
  return `
    <article class="cartao-projeto">
      <h3 class="titulo-projeto">${projeto.titulo}</h3>
      <img src="${projeto.imagem}" alt="${projeto.alt}" class="imagem-projeto">
      <p class="descricao-projeto">${projeto.descricao}</p>
      <div class="links-projeto">
        <a href="${projeto.linkRepositorio}" class="link-projeto" target="_blank" rel="noopener noreferrer">Ver código</a>
        <a href="${projeto.linkDemonstracao}" class="link-projeto" target="_blank" rel="noopener noreferrer">Ver projeto</a>
      </div>
    </article>
  `;
}

// Função responsável por renderizar a lista de projetos na página
function renderizarProjetos() {
  const gradeProjetos = document.querySelector('#grade-projetos');
  if (!gradeProjetos) return;

  const cartoesHtml = listaProjetos.map(criarCartaoProjeto).join('');
  gradeProjetos.innerHTML = cartoesHtml;
}

// Inicializa a renderização dinâmica dos projetos
renderizarProjetos();
