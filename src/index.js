document.addEventListener('DOMContentLoaded', function(){
getDogs()

//? ---------------grab elements off the dom 
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')

//? ------------- Add event listener to DOM Elements
dogBar.addEventListener('click', handleDogClick)
dogInfo.addEventListener('click', handleDogClick)

//? ------------------talk to server using FETCH

function getDogs() {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(displayDogList)
}

function fetchSingleDog(dogId){
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(res => res.json())
    .then(dogObj => displaySingleDog(dogObj))
  }

function updateDogGoodness(dogId, dogGoodness, event){
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({isGoodDog: !dogGoodness})
  })
  .then(res => res.json())
  .then(dogData => {
    let buttonText = dogData.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    event.target.dataset.dogGoodness = dogData.isGoodDog
    event.target.innerText = buttonText 
  })
}


//? --------------------Logic/DOM manipulation functions 
function displayDogList(dogListData){
  dogListData.forEach(dog => {
    //* HOW TO CREATE AND APPEND ELEMENTS 2 WAYS
    // let span = document.createElement('SPAN')
    // span.innerText = dog.name
    // dogBar.append(span)
    dogBar.innerHTML += `<span data-dog-id=${dog.id} class='dogSpan'>${dog.name}</span>`
  })
}

function handleDogClick(event){  
  if (event.target.className === "dogSpan"){
    let dogId = event.target.dataset.dogId
    fetchSingleDog(dogId)
  } else if (event.target.className === "goodDogBtn"){
    let dogId = event.target.dataset.dogId
    let dogGoodness = event.target.dataset.dogGoodness === 'false' ? false : true 
    updateDogGoodness(dogId, dogGoodness, event)
  }
}


function displaySingleDog(dogObj){
  dogInfo.innerHTML += `
    <img src=${dogObj.image}>
    <h2>${dogObj.name}</h2>
   <button class='goodDogBtn' data-dog-goodness=${dogObj.isGoodDog} data-dog-id=${dogObj.id}>${dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
  `
  // put event on button when created
  // dogInfo.querySelector('button').addEventListener('click', function(){console.log("hi")})
 
}














































})

