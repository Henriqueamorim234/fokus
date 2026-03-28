const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const imgFoco = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const botaoIniciar = document.getElementById('start-pause');
const inputMusica = document.getElementById('alternar-musica');
const imagemPlayPausar = document.querySelector('.app__card-primary-butto-icon');
const iniciarPausarBtn = document.querySelector('#start-pause span');
const tempoNaTela = document.getElementById('timer')
const musica =  new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const musicaPlay = new Audio('/sons/play.wav');
const musicaPausar = new Audio('/sons/pause.mp3');
const musicaFinalizado = new Audio('/sons/beep.mp3');

let tempoDecorrido = 1500;
let intervalo = null; 

inputMusica.addEventListener('change', ()=>{
    musica.paused ? musica.play() : musica.pause();
})

focoBtn.addEventListener('click', () => {
    tempoDecorrido = 1500;
    alterarContexto('foco');
    focoBtn.classList.add('active');
})

curtoBtn.addEventListener('click', () => {
    tempoDecorrido = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
})

longoBtn.addEventListener('click', () => {
    tempoDecorrido = 900;
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempo();
    html.setAttribute('data-contexto', contexto)
    imgFoco.setAttribute("src", `/imagens/${contexto}.png`)
    switch(contexto) {
        case 'foco':
                titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break
        case 'descanso-curto':
                titulo.innerHTML = `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        case 'descanso-longo':
                titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`
        
        default: break;
    }
    botoes.forEach(contexto => {
        contexto.classList.remove('active');
    })
}

const contagemRegressiva = () => {
    if (tempoDecorrido <= 0){
        musicaFinalizado.play()
        alert('Tempo finalizado!')
        zerar() 
        return
    }
    tempoDecorrido -= 1;
    mostrarTempo()
}

botaoIniciar.addEventListener('click', iniciar);

function iniciar(){
    if (intervalo){
        musicaPausar.play()
        zerar()
        return
    }
    musicaPlay.play()
    imagemPlayPausar.setAttribute('src', '/imagens/pause.png')
    intervalo = setInterval(contagemRegressiva, 1000)
    iniciarPausarBtn.textContent = 'pausar'
}

function zerar(){
    clearInterval(intervalo)
    intervalo = null;
    iniciarPausarBtn.textContent = 'Começar'
    imagemPlayPausar.setAttribute('src', '/imagens/play_arrow.png')
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {
        minute: '2-digit',
        second: '2-digit'
    })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()