// ==========================================================================
// LAYOUT GLOBAL: TEMA, MENU MOBILE, SAUDAÇÃO E SESSÃO DO CABEÇALHO
// ==========================================================================

// --------------------------------------------------------------------------
// 1. CONTROLE DE TEMA (MODO CLARO E MODO ESCURO)
// --------------------------------------------------------------------------

// Seleciona o botão de tema pelo seu identificador
const botaoTema = document.querySelector('#botao-tema');

// Função responsável por atualizar o texto e ícone do botão conforme o tema ativo
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

// --------------------------------------------------------------------------
// 2. MENU MOBILE (BOTÃO ☰)
// --------------------------------------------------------------------------

// Seleciona o botão de menu mobile e a lista de abas
const botaoMenuMobile = document.querySelector('#botao-menu-mobile');
const listaAbas = document.querySelector('.lista-abas');

// Função responsável por alternar a visibilidade do menu no celular
function alternarMenuMobile() {
  if (listaAbas) {
    listaAbas.classList.toggle('menu-aberto');
  }
}

// Registra o evento de clique no botão hambúrguer
if (botaoMenuMobile) {
  botaoMenuMobile.addEventListener('click', alternarMenuMobile);
}

// --------------------------------------------------------------------------
// 3. SAUDAÇÃO E HORA COM NOME DO USUÁRIO NO CABEÇALHO
// --------------------------------------------------------------------------

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

// --------------------------------------------------------------------------
// 4. CONTROLE DO BOTÃO DE LOGIN / SAIR
// --------------------------------------------------------------------------

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

