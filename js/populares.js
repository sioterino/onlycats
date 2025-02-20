const galeria = document.querySelector('.galeria')

fetch('../json/cats.json')
  .then(response => response.json())
  .then(cats => {

    cats.sort((a, b) => {
      if (a.isCat !== b.isCat) {
          return b.isCat - a.isCat
      }
      return b.popularidade - a.popularidade
  }) 

    const dupla1 = document.createElement('div')
    dupla1.classList.add('dupla1')
    dupla1.append(createCard(cats[0], ".jpg"), createCard(cats[1], ".jpg"))
    
    const dupla2 = document.createElement('div')
    dupla2.classList.add('dupla2')
    dupla2.append(createCard(cats[2], ".jpg"), createCard(cats[3], ".jpg"))

    galeria.append(dupla1, dupla2)

  })

function createCard(cat, ext) {
  const card = document.createElement('div')
  card.classList.add('card')

  const img = document.createElement('div')
  img.classList.add('gato')
  img.style.backgroundImage = `url(${cat.imgPath[0]}${ext})`

  const nome = document.createElement('div')
  nome.classList.add('nome')

  const gatoNome = document.createElement('p')
  const bulletEl = document.createElement('p')
  const tutor = document.createElement('p')

  gatoNome.classList.add('gato-nome')
  bulletEl.classList.add('bullet')
  tutor.classList.add('tutor')

  gatoNome.textContent = cat.nome
  bulletEl.textContent = '•'
  tutor.textContent = cat.tutor.nome[0]

  nome.append(gatoNome, bulletEl, tutor)

  const more = document.createElement('div')
  more.classList.add('more')

  const sexo = document.createElement('p')
  const icon = document.createElement('span')
  const idade = document.createElement('p')

  sexo.classList.add('sexo')
  icon.classList.add('icon', 'sexicon')
  idade.classList.add('idade')

  sexo.textContent = "Sexo:"
  if (cat.sexo === 0) {
    icon.textContent = "female"
    icon.style.color = "magenta"
  } else {
    icon.textContent = "male"
    icon.style.color = "blue"

  }
  idade.innerHTML = `Idade: <strong>${cat.idade}</strong>`

  sexo.append(icon)
  more.append(sexo, idade)


  const assinantes = document.createElement('p')
  assinantes.classList.add('assinantes')
  assinantes.textContent = `${formatNumber(cat.popularidade)} Assinantes`

   card.append(img, nome, more, assinantes)

  return card
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatNumber(num) {
  return new Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 1
  }).format(num);
}