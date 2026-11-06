// ==========================================================================
// LÓGICA DA TELA DE LOGIN (SIMULAÇÃO NO FRONT-END)
// ==========================================================================

// Seleciona os elementos do formulário e das mensagens de retorno
const formularioLogin = document.querySelector('#formulario-login');
const campoEmail = document.querySelector('#email-login');
const campoSenha = document.querySelector('#senha-login');
const mensagemSucesso = document.querySelector('#mensagem-login-sucesso');
const mensagemErro = document.querySelector('#mensagem-login-erro');

// Função responsável por ocultar todas as mensagens de feedback
function ocultarMensagens() {
  if (mensagemSucesso) {
    mensagemSucesso.classList.add('mensagem-oculta');
  }
  if (mensagemErro) {
    mensagemErro.classList.add('mensagem-oculta');
  }
}

// Função responsável por exibir a mensagem de sucesso
function exibirSucesso() {
  if (mensagemSucesso) {
    mensagemSucesso.classList.remove('mensagem-oculta');
  }
}

// Função responsável por exibir a mensagem de erro
function exibirErro() {
  if (mensagemErro) {
    mensagemErro.classList.remove('mensagem-oculta');
  }
}

// Função responsável por extrair o nome do usuário a partir do e-mail
function extrairNomeUsuario(email) {
  const parteInicial = email.split('@')[0];
  return parteInicial.charAt(0).toUpperCase() + parteInicial.slice(1);
}

// Função responsável por salvar o status de login no navegador
function salvarSessaoLogin(email) {
  const nomeUsuario = extrairNomeUsuario(email);
  localStorage.setItem('usuario-logado', 'true');
  localStorage.setItem('email-logado', email);
  localStorage.setItem('nome-usuario', nomeUsuario);
}

// Função responsável por redirecionar para a página inicial (Home)
function redirecionarParaHome() {
  window.location.href = 'index.html';
}

// Função responsável por processar a tentativa de login
function processarLogin(evento) {
  evento.preventDefault();
  ocultarMensagens();

  const emailValor = campoEmail ? campoEmail.value.trim() : '';
  const senhaValor = campoSenha ? campoSenha.value.trim() : '';

  // Qualquer pessoa que preencher e-mail e senha tem o login confirmado
  if (emailValor !== '' && senhaValor !== '') {
    salvarSessaoLogin(emailValor);
    exibirSucesso();
    setTimeout(redirecionarParaHome, 1000);
  } else {
    exibirErro();
  }
}

// Registra o ouvinte de envio no formulário de login
if (formularioLogin) {
  formularioLogin.addEventListener('submit', processarLogin);
}
