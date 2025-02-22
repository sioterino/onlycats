let cats = JSON.parse(localStorage.getItem("catsData"))
const onlyCats = cats.filter(cat => cat.isCat)

const pick = document.querySelector('.pick')
createCatCard(onlyCats[randInt(0, onlyCats.length)], 'jpg', pick)

// função que ajuda a criar elementos html com mais agilidade
function createElement(element, classList = null, textContent = null) {
    // ciaar o elemento
    const el = document.createElement(element)

    // caso a class tenha sido especificada
    if (classList !== null) {
        // é uma lista de classes?
        if (Array.isArray(classList)) {
            classList.forEach(cls => el.classList.add(cls))
            
        // classe única
        } else if (typeof classList === "string") {
            el.classList.add(classList)
        }
    }

    // possui textContent?
    if (textContent !== null) {
        el.textContent = textContent
    }

    return el
}

// cria to card inteiro kkkkk
function createCatCard(cat, ext, pick) {

    const imgContainer = createElement('div', 'img-container')

    const arrowLeft = createElement('span', ['icon', 'pick-arrow-left'], 'arrow_back_ios')
    const arrowRight = createElement('span', ['icon', 'pick-arrow-right'], 'arrow_forward_ios')
    const carrossel = createElement('div', 'carrossel')

    imgContainer.append(arrowLeft, carrossel, arrowRight)
    
    for (let i = 0; i < cat.imgPath.length; i++) {
        const img = createElement('div', 'img-pick')    
        img.style.backgroundImage = `url(${cat.imgPath[i]}.${ext})`     
        carrossel.append(img)
    }

    pick.append(imgContainer)

    
    const descricao = createElement('div', 'descricao')
    const superior = createElement('div', 'superior')

    descricao.appendChild(superior)

    const titulo = createElement('div', 'titulo')
    const smallIcons = createElement('div', 'small-icons')

    superior.append(titulo, smallIcons)

    const idcat = createElement('p', 'idcat', `#${cat.id}`)
    const nomecat = createElement('p', 'nomecat', cat.nome)
    const assinantescat = createElement('p', 'assinantescat', `${formatNumber(cat.popularidade)} Assinantes`)

    titulo.append(idcat, nomecat, assinantescat)


    const heartDiv = createElement('div', ['botao', 'botao-fav'])
    const heart = createElement('span', ['icon', 'heart', 'hollow'], 'favorite')
    heartDiv.append(heart)

    if (pick.tagName === 'DIALOG') {
        const closeDiv = createElement('div', ['botao', 'botao-close'])
        const close = createElement('span', ['icon', 'close'], 'close')
        closeDiv.append(close)
        smallIcons.append(closeDiv)
    }


    const botoes = createElement('div', 'botoes')

    const chatDiv = createElement('div', ['botao', 'botao-chat'])
    const chatP = createElement('p', null, 'Conversar')
    const chat = createElement('span', ['icon', 'chat', 'hollow'], 'sms')
    chatDiv.append(chatP, chat)

    const cartDiv = createElement('div', ['botao', 'botao-cart'])
    const cartP = createElement('p', null, 'Assinar')
    const cart = createElement('span', ['icon', 'cart'], 'shopping_cart')
    cartDiv.append(cartP, cart)

    botoes.appendChild(chatDiv)
    botoes.appendChild(cartDiv)
    titulo.appendChild(botoes)
    smallIcons.append(heartDiv)

    const table = document.createElement('table')
    const tableTitle = document.createElement('p')
    tableTitle.classList.add('table-titulo')
    tableTitle.textContent = 'Sobre o gato'
    const tbody = document.createElement('tbody')

    descricao.append(table)

    const content = [
        { label: 'Tutor', value: [...cat.tutor.nome, ...cat.tutor.sobrenome].join(' ') },
        { label: 'Sexo', value: cat.sexo === 0 ? 'Fêmea' : 'Macho', icon: cat.sexo === 0 ? 'female' : 'male' },
        { label: 'Idade', value: cat.idade },
        { label: 'Cor', value: cat.cor }
    ]    

    for (let i = 0; i < content.length; i++) {
        const tr = createElement('tr')
        if (i % 2 != 0) {
            tr.classList.add('impar')
        }

        const th = createElement('th', null, content[i].label)

        const td = createElement('td', null, content[i].value)

        if (content[i].icon) {
            const iconSpan = createElement('span', ['icon', content[i].icon], content[i].icon)
            td.appendChild(iconSpan)
        }

        tr.append(th, td)
        tbody.appendChild(tr)
    }

    table.appendChild(tableTitle)
    table.appendChild(tbody)

    const tags = createElement('div', 'tags')
    descricao.appendChild(tags)

    cat.personalidade.forEach(item => {
        const tag = createElement('p', 'tag', item)
        tags.appendChild(tag)
    })

    pick.appendChild(descricao)
}

// gera um número aleatório onde min é inclusivo e max é exclusivo
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

// formata númeors 1567 > 1.5K
function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(num)
}


// animação do coração de favorito
const favButon = pick.querySelector('.botao-fav')
favButon.addEventListener('click', () => {
    const heart = favButon.querySelector('.icon')
    heart.classList.toggle('hollow')
    heart.classList.toggle('liked')
})



const img = document.querySelectorAll(".img-pick");
const carrossel = document.querySelector(".carrossel");
const leftArrow = document.querySelector(".pick-arrow-left");
const rightArrow = document.querySelector(".pick-arrow-right");

function calculateScroll(isLeftArrow) {
    const currentScroll = carrossel.scrollLeft;
    const imageWidth = img[0].offsetWidth + 1.2 * 16; // Assuming 1.2rem gap
    return isLeftArrow ? currentScroll - imageWidth : currentScroll + imageWidth;
}

leftArrow.addEventListener("click", () => {
    const newScroll = calculateScroll(true);
    if (newScroll < 0) {
        carrossel.scrollTo({ left: carrossel.scrollWidth - carrossel.clientWidth, behavior: "smooth" });
    } else {
        carrossel.scrollTo({ left: newScroll, behavior: "smooth" });
    }
});

rightArrow.addEventListener("click", () => {
    const newScroll = calculateScroll(false);
    if (newScroll >= carrossel.scrollWidth - carrossel.clientWidth) {
        carrossel.scrollTo({ left: 0, behavior: "smooth" });
    } else {
        carrossel.scrollTo({ left: newScroll, behavior: "smooth" });
    }
});
