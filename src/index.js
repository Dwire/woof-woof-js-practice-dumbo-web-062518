fetchDogs()

// ------------GRAB FROM DOM
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const goodDogFilter = document.querySelector("#good-dog-filter")

let dogsList = []

// --------------ADD EVENT LISTENERS
dogBar.addEventListener('click', clickHandler)
goodDogFilter.addEventListener('click', filterDogs)

// =----------------FETCH FROM SERVER
function fetchDogs(){
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(slapDogsOnDom)
}

function fetchDogShow(dogId){
  fetch(`http://localhost:3000/pups/${dogId}`)
  .then(res => res.json())
  .then(slapDogOnDom)
}

function fetchGoodDogPatch(event, dog){
  fetch(`http://localhost:3000/pups/${dog.id}`,{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({isGoodDog: !dog.isGoodDog})
  })
  .then(res => res.json())
  .then(slapDogOnDom)
}


// ----------------SLAP IT ON THE DOM

function clickHandler(event){
  if(event.target.className === 'dog-btn'){
    const dogId = event.target.id
    fetchDogShow(dogId)
  }
}

function slapDogsOnDom(dogs){
  dogsList = dogs

  dogBar.innerHTML = ''
  dogs.forEach(dog => {
    dogBar.innerHTML += `
      <span class='dog-btn' id=${dog.id}>${dog.name}</span>
    `
  })
}

function slapDogOnDom(dog){
  dogInfo.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button id='goodDogBtn'>${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog'}</button>
  `
  const goodDogBtn = document.querySelector('#goodDogBtn')
  goodDogBtn.addEventListener('click', (event) => fetchGoodDogPatch(event, dog))

}

function filterDogs(event) {
  if(event.target.className === 'off'){
    let filterdDogsList = dogsList.filter(dog => dog.isGoodDog)
    event.target.className = 'on'
    event.target.innerText = 'Filter good dogs: ON'
    slapDogsOnDom(filterdDogsList)
  }else{
    event.target.className = 'off'
    event.target.innerText = 'Filter good dogs: OFF'
    fetchDogs()
  }
}
