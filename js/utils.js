// função que facilita a criação de elementos html em js
function createElement(element, classList = null, textContent = null) {
    // ciaa o elemento
    const el = document.createElement(element)

    // caso a class tenha sido especificada
    if (classList !== null) {
        // é uma lista de classes?
        if (Array.isArray(classList)) {
            classList.forEach(cls => el.classList.add(cls))
            
        // classe única
        } else if (typeof classList === 'string') {
            el.classList.add(classList)
        }
    }

    // possui textContent?
    if (textContent !== null) {
        el.textContent = textContent
    }

    return el
}

// cria o card dos pets que ficam na galeria
function createPetCard(cat, ext) {
    // DIV CARD que contém todo os elementos
    const card = createElement('div', 'card')
  
    // imagem do gatineo
    const img = createElement('div', 'gato')
    img.style.backgroundImage = `url(${cat.imgPath[0]}${ext})`
  
    // FLEX DIV que contem {gato nome} • {tutor nome}
    const nome = createElement('div', 'nome')
  
    const gatoNome = createElement('p', 'gato-nome', cat.nome)
    const bulletEl = createElement('p', 'bullet', '•')
    const tutor = createElement('p', 'tutor', cat.tutor.nome[0])
  
    nome.append(gatoNome, bulletEl, tutor)
  
    // MORE mais informações sobre o gato/pet
    const more = createElement('div', 'more')
  
    const sexo = createElement('p', 'sexo', 'Sexo:')
    const icon = createElement('span', ['icon', 'sexicon', cat.sexo === 0 ? 'female' : 'male'], cat.sexo === 0 ? 'female' : 'male')
    const idade = createElement('p', 'idade')

    sexo.append(icon)
    
    idade.innerHTML = `Idade: <strong>${cat.idade}</strong>`
  
    more.append(sexo, idade)
  
    // define id número dos gatos
    const catid = createElement('p', 'catid', `# ${cat.id}`)
  
    // define número de assinantes
    const assinantes = createElement('p', 'assinantes', `${formatNumber(cat.popularidade)} Assinantes`)
    
    // coloca todos os elementos dentro do card e retorna
    card.append(img, catid, nome, more, assinantes)  
    return card
}

// inteiro aleatório: max inclusivo
function randIntMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// inteiro aleatório: max exclusivo
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

// formata um número: 5684 > 5.7K
function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(num)
}

// adiciona os eventos nos cards de informação sobre os pets
function catCardEventListener(card) {

    // caso seja a div de DIALOG, garantir que o botão X feche o dilogo
    if (card.classList.contains('dialog')) {
        const closeDialog = card.querySelector('.botao-close')
        closeDialog.addEventListener('click', () => {
            document.querySelector('dialog').close()
        })
    }

    card.addEventListener('click', e => {
        e.stopPropagation()
    })

    const pickImg = card.querySelectorAll('.img-pick')
    const carrosselDiv = card.querySelector('.carrossel')
    const leftArrowicon = card.querySelector('.pick-arrow-left')
    const rightArrowIcon = card.querySelector('.pick-arrow-right')

    // scrolla o slide show para a ESQUERDA
    leftArrowicon.addEventListener('click', () => {
        const slideShowSize = carrosselDiv.scrollWidth - carrosselDiv.clientWidth
        const currentScroll = carrosselDiv.scrollLeft
        const imageWidth = pickImg[0].offsetWidth + 1.2 * 16
        const newScroll = currentScroll - imageWidth

        console.log('botao da esquerda scrollar pra esquerda')

        if (newScroll < 0) {
            // caso essa seja a primeira imagem, scrollar para a última imagem
            carrosselDiv.scrollTo({ left: slideShowSize, behavior: 'smooth' })
        } else {
            // se não, scrollar para esquerda
            carrosselDiv.scrollTo({ left: newScroll, behavior: 'smooth' })
        }
    })

    // scrolla o slide show para a DIREITA
    rightArrowIcon.addEventListener('click', () => {
        const slideShowSize = carrosselDiv.scrollWidth - carrosselDiv.clientWidth
        const currentScroll = carrosselDiv.scrollLeft
        const imageWidth = pickImg[0].offsetWidth + 1.2 * 16
        const newScroll = currentScroll + imageWidth

        console.log('botao da direita scrollar pra direita')

        if (newScroll > slideShowSize) {
            // caso essa seja a última imagem do slide show, voltar ao início
            carrosselDiv.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
            // se não, scrollar para direita
            carrosselDiv.scrollTo({ left: newScroll, behavior: 'smooth' })
        }
    })

    // animação do coração de favorito
    const fav = card.querySelector('.botao.botao-fav')
    fav.addEventListener('click', () => {
        const heart = fav.querySelector('.icon')
        heart.classList.toggle('hollow')
        heart.classList.toggle('liked')
    })
}
