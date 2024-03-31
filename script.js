const personagem = document.getElementById('gerson');
const pipe = document.getElementById('pipe');
const clouds = document.getElementById('clouds');
const moeda = document.getElementById('money')
const container = document.querySelector('.container');
const btn = document.getElementById('btn')
let contador = -1;

// remover animação de pulo

personagem.addEventListener('animationend', function () {
 personagem.classList.remove('animation');
});

// adicionar animação de pulo toda vez q clicar na tecla espaço

document.addEventListener('keydown', function (event) {
 if (event.keyCode === 32) {
  personagem.classList.add('animation');
 }
});

// função para criar moedas e aleatorizar a geração dela

function criarMoeda() {

 const posY = Math.random() * (250 - 15) + 15;
 moeda.style.bottom = posY + 'px';

 container.appendChild(moeda);

 // função para identificar q o jogador coletou a moeda e adicionando os pontos

 setInterval(function () {
  const personagemRect = personagem.getBoundingClientRect();
  const moedaRect = moeda.getBoundingClientRect();

  if (moeda) {
   if (personagemRect.left < moedaRect.right &&
    personagemRect.right > moedaRect.left &&
    personagemRect.top < moedaRect.bottom &&
    personagemRect.bottom > moedaRect.top) {

    moeda.remove();
    criarMoeda();
   }
  }
 }, 100);

 contador++;
 document.getElementById('numberMoneys').textContent = contador;

 // inverte a cor para confundir a mente

 if (contador === 10) {
  container.style.filter = 'invert(100%)';
 }
 if (contador === 20) {
  container.style.filter = 'none';
 }
}

window.addEventListener('load', criarMoeda);

// função q adiciona colisão com os pipes(canos)

function colisao() {
 const personagemRect = personagem.getBoundingClientRect();
 const pipeRect = pipe.getBoundingClientRect();

 if (personagemRect.left < pipeRect.right &&
  personagemRect.right > pipeRect.left &&
  personagemRect.top < pipeRect.bottom &&
  personagemRect.bottom > pipeRect.top) {

  moeda.style.animationPlayState = 'paused';
  personagem.style.animationPlayState = 'paused';
  clouds.style.animationPlayState = 'paused';
  pipe.style.animationPlayState = 'paused';

  // troca a imagem ao jogador encostar em um pipe(cano) e adicionando botão para restart

  const character = document.getElementById('character')
  character.src = './image/game-over.png';
  container.style.filter = 'brightness(30%)';

  btn.style.display = 'block'
  btn.addEventListener('click', function () {
   location.reload()
  })

 }
}
setInterval(colisao, 100);

