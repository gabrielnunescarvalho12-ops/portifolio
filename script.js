// Seleciona o botão de tema pelo seu identificador
const botaoTema = document.querySelector('#botao-tema');

// Função responsável por atualizar o texto do botão de acordo com o tema ativo
function atualizarTextoBotao() {
  if (!botaoTema) return;
  const estaNoModoEscuro = document.body.classList.contains('modo-escuro');

  if (estaNoModoEscuro) {
    botaoTema.textContent = '☀️ Modo claro';
  } else {
    botaoTema.textContent = '🌙 Modo escuro';
  }
}

// Função responsável por salvar a preferência do tema no armazenamento local
function salvarTema(estaNoModoEscuro) {
  if (estaNoModoEscuro) {
    localStorage.setItem('tema-preferido', 'escuro');
  } else {
    localStorage.setItem('tema-preferido', 'claro');
  }
}

// Função responsável por alternar a classe de modo escuro no corpo da página
function alternarModoEscuro() {
  document.body.classList.toggle('modo-escuro');
  const estaNoModoEscuro = document.body.classList.contains('modo-escuro');
  salvarTema(estaNoModoEscuro);
  atualizarTextoBotao();
}

// Função responsável por carregar o tema salvo ao iniciar a página
function carregarTemaSalvo() {
  const temaSalvo = localStorage.getItem('tema-preferido');
  if (temaSalvo === 'escuro') {
    document.body.classList.add('modo-escuro');
  }
  atualizarTextoBotao();
}

// Executa o carregamento inicial do tema
carregarTemaSalvo();

// Registra o evento de clique para acionar a troca de tema
if (botaoTema) {
  botaoTema.addEventListener('click', alternarModoEscuro);
}

// ==========================================================================
// MENU DE NAVEGAÇÃO PARA DISPOSITIVOS MÓVEIS (BOTÃO ☰)
// ==========================================================================

// Seleciona o botão de menu mobile e a lista de abas
const botaoMenuMobile = document.querySelector('#botao-menu-mobile');
const listaAbas = document.querySelector('.lista-abas');

// Função responsável por alternar a abertura do menu no celular
function alternarMenuMobile() {
  if (listaAbas) {
    listaAbas.classList.toggle('menu-aberto');
  }
}

// Registra o evento de clique no botão hambúrguer
if (botaoMenuMobile) {
  botaoMenuMobile.addEventListener('click', alternarMenuMobile);
}

// ==========================================================================
// SAUDAÇÃO E HORA COM NOME DO USUÁRIO NO CABEÇALHO
// ==========================================================================

// Seleciona o elemento do cabeçalho destinado às informações de tempo
const informacoesCabecalho = document.querySelector('#informacoes-cabecalho');

// Função responsável por definir a saudação apropriada com base na hora
function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return 'Bom dia';
  }
  if (hora >= 12 && hora < 18) {
    return 'Boa tarde';
  }
  return 'Boa noite';
}

// Função responsável por formatar apenas as horas, minutos e segundos em tempo real
function formatarHora(dataAtual) {
  const horas = String(dataAtual.getHours()).padStart(2, '0');
  const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
  const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

  return `${horas}:${minutos}:${segundos}`;
}

// Função responsável por atualizar a saudação com o nome do usuário e o relógio
function atualizarDataHora() {
  if (!informacoesCabecalho) return;
  const agora = new Date();
  const saudacao = obterSaudacao(agora.getHours());
  const hora = formatarHora(agora);
  const nomeUsuario = localStorage.getItem('nome-usuario');

  // Exibe o nome do usuário que acessou no lugar da data
  if (nomeUsuario) {
    informacoesCabecalho.textContent = `${saudacao}, ${nomeUsuario}! ${hora}`;
  } else {
    informacoesCabecalho.textContent = `${saudacao}! ${hora}`;
  }
}

// Inicializa a exibição imediata e atualiza a cada segundo
if (informacoesCabecalho) {
  atualizarDataHora();
  setInterval(atualizarDataHora, 1000);
}

// ==========================================================================
// CONTROLE DO BOTÃO DE LOGIN / SAIR
// ==========================================================================

// Seleciona o link da aba de login no cabeçalho
const linkLogin = document.querySelector('#link-login');

// Função responsável por atualizar o texto e link do botão para Sair
function configurarBotaoSair() {
  if (!linkLogin) return;
  linkLogin.textContent = 'Sair';
  linkLogin.setAttribute('href', '#');
}

// Função responsável por restaurar o botão para Login
function configurarBotaoLogin() {
  if (!linkLogin) return;
  linkLogin.textContent = 'Login';
  linkLogin.setAttribute('href', 'login.html');
}

// Função responsável por deslogar e resetar dados do usuário
function deslogarUsuario(evento) {
  if (evento) {
    evento.preventDefault();
  }

  // Remove os dados salvos do usuário
  localStorage.removeItem('usuario-logado');
  localStorage.removeItem('nome-usuario');
  localStorage.removeItem('email-logado');

  // Reseta os campos do formulário caso exista na tela
  const formularioLogin = document.querySelector('#formulario-login');
  if (formularioLogin) {
    formularioLogin.reset();
  }

  configurarBotaoLogin();
  atualizarDataHora();

  // Redireciona de volta para a tela de login
  window.location.href = 'login.html';
}

// Função responsável por gerenciar o clique na aba de login/sair
function gerenciarCliqueLogin(evento) {
  const estaLogado = localStorage.getItem('usuario-logado') === 'true';
  if (estaLogado) {
    deslogarUsuario(evento);
  }
}

// Função responsável por verificar o estado atual do login ao carregar a página
function verificarEstadoLogin() {
  if (!linkLogin) return;
  const estaLogado = localStorage.getItem('usuario-logado') === 'true';

  if (estaLogado) {
    configurarBotaoSair();
  } else {
    configurarBotaoLogin();
  }

  linkLogin.addEventListener('click', gerenciarCliqueLogin);
}

// Inicializa a verificação do estado de login
verificarEstadoLogin();

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

