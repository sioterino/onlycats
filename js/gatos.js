const gatos = JSON.parse(localStorage.getItem("catsData"))

const numCats = document.querySelector('.num-cats')
numCats.textContent = `${gatos.length} gatinhos`

const catalogo = document.querySelector('.catalogo')

gatos.sort((a, b) => {
    if (a.isCat === b.isCat) {
        return 0
    }
    return a.isCat ? -1 : 1; // If a.isCat is true, it comes first; otherwise, b comes first
});

gatos.forEach(cat => {
    catalogo.append(createCard(cat, 'jpg'))
});


function createCard(cat, ext) {
    const card = document.createElement('div')
    card.classList.add('card')
  
    const img = document.createElement('div')
    img.classList.add('gato')
    img.style.backgroundImage = `url(${cat.imgPath[0]}.${ext})`
  
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
  