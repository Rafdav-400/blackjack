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
        console.warn("Perdiste, gg")
        btnPedir.disabled = true
    }else if(jugadorPuntos === 21){
        console.log("Ganaste!")
        btnPedir.disabled = true
    }
})
btnNuevo.addEventListener('click',()=>{
    console.log("Nuevo Juego Creado")
})
btnDetener.addEventListener('click',()=>{
    console.log("Juego Detenido")
})