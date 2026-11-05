// ==========================================================================
// VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO
// ==========================================================================

// Seleciona os elementos do formulário e das mensagens
const formularioContato = document.querySelector('#formulario-contato');
const campoNome = document.querySelector('#nome');
const campoEmail = document.querySelector('#email');
const campoTelefone = document.querySelector('#telefone');
const campoMensagem = document.querySelector('#mensagem');
const mensagemSucesso = document.querySelector('#mensagem-feedback');
const mensagemErro = document.querySelector('#mensagem-erro-contato');

// Função responsável por validar se o nome tem mais do que 3 caracteres
function validarNome(nome) {
  return nome.trim().length > 3;
}

// Função responsável por validar se o e-mail é obrigatório e contém '@' e '.'
function validarEmail(email) {
  const emailLimpo = email.trim();
  return emailLimpo !== '' && emailLimpo.includes('@') && emailLimpo.includes('.');
}

// Função responsável por validar se o telefone possui 11 dígitos
function validarTelefone(telefone) {
  const digitos = telefone.replace(/\D/g, '');
  return digitos.length === 11;
}

// Função responsável por validar se a mensagem possui pelo menos 10 caracteres
function validarMensagem(mensagem) {
  return mensagem.trim().length >= 10;
}

// Função responsável por exibir a mensagem de erro na tela
function exibirErro(texto) {
  if (mensagemSucesso) {
    mensagemSucesso.classList.add('mensagem-oculta');
  }
  if (mensagemErro) {
    mensagemErro.textContent = texto;
    mensagemErro.classList.remove('mensagem-oculta');
  }
}

// Função responsável por exibir a mensagem de sucesso na tela
function exibirSucesso() {
  if (mensagemErro) {
    mensagemErro.classList.add('mensagem-oculta');
  }
  if (mensagemSucesso) {
    mensagemSucesso.classList.remove('mensagem-oculta');
  }
}

// Função responsável por limpar os campos do formulário
function limparFormulario() {
  if (formularioContato) {
    formularioContato.reset();
  }
}

// Função responsável por verificar todos os campos e retornar o erro encontrado
function validarCampos(nome, email, telefone, mensagem) {
  if (!validarNome(nome)) {
    return 'O campo Nome deve ter mais do que 3 caracteres.';
  }
  if (!validarEmail(email)) {
    return 'O campo E-mail é obrigatório e deve conter "@" e um ponto "." (ex: nome@email.com).';
  }
  if (!validarTelefone(telefone)) {
    return 'O campo Telefone deve conter exatamente 11 dígitos com DDD (ex: 11987654321).';
  }
  if (!validarMensagem(mensagem)) {
    return 'A Mensagem deve ter pelo menos 10 caracteres.';
  }
  return null;
}

// Função responsável por processar o envio e validação do formulário
function lidarComEnvio(evento) {
  evento.preventDefault();

  const valorNome = campoNome ? campoNome.value : '';
  const valorEmail = campoEmail ? campoEmail.value : '';
  const valorTelefone = campoTelefone ? campoTelefone.value : '';
  const valorMensagem = campoMensagem ? campoMensagem.value : '';

  const erro = validarCampos(valorNome, valorEmail, valorTelefone, valorMensagem);

  if (erro) {
    exibirErro(erro);
  } else {
    exibirSucesso();
    limparFormulario();
  }
}

// Registra o ouvinte de envio no formulário de contato
if (formularioContato) {
  formularioContato.addEventListener('submit', lidarComEnvio);
}
