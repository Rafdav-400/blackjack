let deck = []
const types = ['C','D','H','S']
const specials = ['A','J','Q','K']
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const btnNuevo = document.querySelector('#btnNuevo')
let jugadorPuntos = 0
let computadoraPuntos = 0
const puntosHTML = document.querySelectorAll('span')
const divJugadorCartas = document.querySelector('#jugador-cartas')
const divComputadoraCartas = document.querySelector('#computadora-cartas')

/*const createDeck = ()=>{
    for (let i = 2; i <= 10; i++){
        deck.push(i+"C")
    }
    for (let i = 2; i <= 10; i++){
        deck.push(i+"D")
    }
    for (let i = 2; i <= 10; i++){
        deck.push(i+"H")
    }
    for (let i = 2; i <= 10; i++){
        deck.push(i+"S")
    }
    console.log(deck)
}
createDeck()*/

//Creamos una función para crear el deck y revolverlo.
const createDeck = ()=>{
    //Se utiliza un 'for' que hace aparecer los números del 2 al 10.
    for (let i = 2; i <= 10; i++){
        //Este 'for' nos ponía los types CDHS que son trebol, diamantes, corazones y espadas.
        for (let type of types){
            //Insertamos el número más el tipo en el deck. "2c", "2h", "2d", "2s".
            deck.push(i+type)
        }
    }
    for (let type of types){
        for (let special of specials){
            deck.push(special+type)
        }
    }
    deck = _.shuffle(deck)
    /*console.log(deck)*/
    return deck
}
createDeck()
//Esta función nos va a permitir pedir una carta.
const drawCard = ()=>{
    if (deck.length === 0) {
        throw "No hay mas cartas en la barajilla"
    }
    const card = deck.pop()
    /*console.log(deck)
    console.log(card)*/
    return card
}
/*for (let i = 0; i <= 100; i++) {
    drawCard()
}*/
const cardValue = (card)=>{
    const value = card.substring(0,card.length-1)
    let points = 0
    return (isNaN(value)) ? 
    (value === "A") ? 11 : 10
    : (value*1)
    
}
/*const value = cardValue(drawCard())
console.log({value})*/
//Turno de la computadora

const turnoCompu = (minPuntos)=>{
    console.log("hola")
    do {
        const card = drawCard()
        computadoraPuntos = computadoraPuntos+cardValue(card)
        puntosHTML[1].innerText = computadoraPuntos
        //<!-- <img class="carta" src="./assets/2C.png" alt="carta"/> -->
        const imgCarta = document.createElement('img')
        imgCarta.src = `./assets/${card}.png`
        imgCarta.alt = 'carta'
        imgCarta.classList.add('carta')
        divComputadoraCartas.append(imgCarta)
        if (minPuntos > 21) {
            break
        }
    } while ((computadoraPuntos < minPuntos) && (minPuntos <= 21));
    setTimeout(()=>{
        if (computadoraPuntos === minPuntos) {
            alert("Nadie ganó, fue un empate.")
        } else if (minPuntos > 21){
            alert("La computadora gana/ó.")
        } else if (computadoraPuntos > 21) {
            alert("El jugador gana/ó.")
        } else {
            alert("La computadora gana.")
        }
    }, 10)
}

//Eventos
btnPedir.addEventListener('click',()=>{
    const card = drawCard()
    jugadorPuntos = jugadorPuntos+cardValue(card)
    puntosHTML[0].innerText = jugadorPuntos
    //<!-- <img class="carta" src="./assets/2C.png" alt="carta"/> -->
    const imgCarta = document.createElement('img')
    imgCarta.src = `./assets/${card}.png`
    imgCarta.alt = 'carta'
    imgCarta.classList.add('carta')
    divJugadorCartas.append(imgCarta)
    if (jugadorPuntos > 21) {
        console.warn("Perdiste, te pasaste de 21.")
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoCompu(jugadorPuntos)
    }else if(jugadorPuntos === 21){
        console.log("Sacaste 21 puntos!")
        btnPedir.disabled = true
        turnoCompu(jugadorPuntos)
        btnDetener.disabled = true
    }
})
//TODO:terminar
btnNuevo.addEventListener('click',()=>{
    console.clear()
    deck = createDeck()
    jugadorPuntos = 0
    computadoraPuntos = 0
    puntosHTML[0].innerText = 0
    puntosHTML[1].innerText = 0
    divComputadoraCartas.innerHTML = ""
    divJugadorCartas.innerHTML = ""
    btnPedir.disabled = false
    btnDetener.disabled = false
    
})

btnDetener.addEventListener('click',()=>{
    console.log("Juego Detenido")
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoCompu(jugadorPuntos)
})