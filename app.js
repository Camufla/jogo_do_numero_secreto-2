let listaNumeroSorteado = [];
//var para atualizar automaticamento a condicional que compara o limite da lista com a quantidade de numeros gerados de deve ser o mesmo digitado
let limiteDeElementos = 10;

//armazena o numero gerado pela funçao 
let numeroScreto = gerarNumeroSecreto();
let tentativas = 1;

//Exibindo os texo na tela atravez da função abaixo
function exibirTextoNaTela (tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  
  //Recurso esterno de fala recebe 3 parametros o 1º texto, 2º o idioma, 3º velocidade da fala.
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.0})
}

//função criada para evitar repetinção de código
function exibirMensagemInicial() {

  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

//Função que mostra a mensagem no console ao clicar no botão
function verificarChute() {
  let chute = document.querySelector('input').value;

  if(chute == numeroScreto) {
    exibirTextoNaTela('h1', 'Acertou!');
    //Ternário para corrigir o erro na palavra tetativas caso de acerto na 1º tentaiva
    let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
    
    //Usamos essa var para concatenar tamplante string ao paragrafo evitando erro
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);

    //capturar e habilitar o botão de novo jogo retirando o atributo desabled
    document.getElementById('reiniciar').removeAttribute('disabled');
 } else {
  //Condiconal que informa as dicas de orientação para o usuário
  if(chute > numeroScreto) {
    exibirTextoNaTela('p', 'O número secreto é menor');
  } else {
    exibirTextoNaTela('p', 'O número secreto é maior');
  }
    tentativas++
    limparCampo();
  }
}

function gerarNumeroSecreto() {
  let numeroEscolhido = parseInt(Math.random() * limiteDeElementos + 1);
  //armazena a capacidade de elementos dentro da lista
  let quantidadesDeElementosNaLista = listaNumeroSorteado.length;

  //verifica se a lista já atingiu sua capacidade de elementos
  if(quantidadesDeElementosNaLista == limiteDeElementos) {
    //caso tenha atingido essa linha abaixo apaga todos reiniciando tudo novamente sem interromper o jogo
    listaNumeroSorteado = [];
  }

  //verificamos se o numero escolhido já existe na lista, caso sim gerar outro numero 
  if(listaNumeroSorteado.includes(numeroEscolhido)) {
    return gerarNumeroSecreto();
  } else {
    //senao incluir numero gerado na lista
    listaNumeroSorteado.push(numeroEscolhido);
    console.log(listaNumeroSorteado);
    return numeroEscolhido;
  }
}

//Apaga o número digitado no campo quando clicar no botão de chute
function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
  chute = chute.focus();

}

//Ativa o botão novo jogo, assim que a partida finalizar. Clicado ele reiniciando a partida.
function reiniciarJogo() {
  numeroScreto = gerarNumeroSecreto();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  //Colocamos um atributo novo ao botão e definimos se ele deve estar ativo com false ou desativado com true
  document.getElementById('reiniciar').setAttribute('disabled', true);
  chute = chute.focus();
}