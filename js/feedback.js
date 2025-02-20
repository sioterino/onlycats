const feedbackDiv = document.querySelector('#feedbacks')

fetch('../json/feedbacks.json')
  .then(response => response.json())
  .then(tutores => {
    const indexes = randNums(tutores.length, 4)
    
    const dupla31 = document.createElement('div')
    dupla31.classList.add('dupla1')
    dupla31.append(
      createCard(tutores[indexes[0]]),
      createCard(tutores[indexes[1]])
    )
    
    const dupla32 = document.createElement('div')
    dupla32.classList.add('dupla2')
    dupla32.append(
      createCard(tutores[indexes[2]]),
      createCard(tutores[indexes[3]])
    )

    feedbackDiv.appendChild(dupla31);
    feedbackDiv.appendChild(dupla32);

  })

function createCard(tutor) {
  const petTutor = document.createElement('div')
  const pet = document.createElement('p')
  const ecomercial = document.createElement('p')
  const dono = document.createElement('p')
  
  petTutor.classList.add('pet-tutor')
  pet.classList.add('pet')
  ecomercial.classList.add('ecomercial')
  dono.classList.add('dono')

  pet.textContent = tutor.pets[randInt(0, tutor.pets.length)]
  ecomercial.textContent = ' & '
  dono.textContent = tutor.nome

  petTutor.appendChild(pet)
  petTutor.appendChild(ecomercial)
  petTutor.appendChild(dono)

  const opiniao = document.createElement('p')
  opiniao.classList.add('opiniao')
  opiniao.textContent = tutor.feedback

  const estrelas = document.createElement('div')
  estrelas.classList.add('estrelas')
  
  for (let i = 0; i < 5; i++) {
    const icon = document.createElement('span')
    icon.classList.add('icon')
    icon.textContent = 'star '

    if (i >= tutor.estrelas) {
      icon.classList.add('hollow')
    }

    estrelas.appendChild(icon)
  }


  const card = document.createElement('div')
  card.classList.add('feedback')

  card.appendChild(petTutor)
  card.appendChild(opiniao)
  card.appendChild(estrelas)

  return card
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function randNums(length, n) {
  const result = [];
  const usedNumbers = new Set();

  while (result.length < n) {
    const randomNumber = randInt(0, length);
    if (!usedNumbers.has(randomNumber)) {
      result.push(randomNumber);
      usedNumbers.add(randomNumber);
    }
  }

  return result;
}
