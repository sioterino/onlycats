let gatos = []

fetch('../json/cats.json')
  .then(response => response.json())
  .then(cats => {

    const numCats = document.querySelector('.num-cats')
    numCats.textContent = `${cats.length} gatinhos`
    
    const catalogo = document.querySelector('.catalogo')
    
    cats.sort((a, b) => {
        if (a.isCat === b.isCat) {
            return 0
        }
        return a.isCat ? -1 : 1
    })
    
    gatos = cats.map(cat => {
        const card = createPetCard(cat, '.jpg')
        catalogo.append(card)
        return {
            nome: cat.nome,
            cor: cat.cor,
            idade: cat.idade,
            sexo: cat.sexo,
            tags: cat.personalidade,
            tutor: cat.tutor,
            cadastro: cat.cadastro,
            popularidade: cat.popularidade,
            isCat: cat.isCat,
            element: card}
    })


    const select = document.querySelector('#ordenar')
    select.addEventListener('change', (e) => {
        sortCats(e.target.value, gatos, catalogo)
    })
})

function sortCats(order, gatos, catalogo) {
    const sortedCats = gatos
    switch (order) {
        case "0": // mais recente
            sortedCats.sort((a, b) => new Date(b.cadastro) - new Date(a.cadastro))
            break
        case "1": // mais antigo
            sortedCats.sort((a, b) => new Date(a.cadastro) - new Date(b.cadastro))
            break
        case "2": // mais popular
            sortedCats.sort((a, b) => b.popularidade - a.popularidade)
            break
        case "3": // menos popular
            sortedCats.sort((a, b) => a.popularidade - b.popularidade)
            break
    }

    catalogo.innerHTML = ''
    sortedCats.forEach(cat => {
        catalogo.append(cat.element)
    })
}

const searchbar = document.querySelector('#searchbar')
searchbar.addEventListener('input', e =>{
    const hide = findCat(e.target.value, gatos)

})  

function findCat(input, dataSet) {
    input = input.toLowerCase().replaceAll(" ", "")

    let shown = 0

    dataSet.forEach(cat => {
        const catName = cat.nome.toLowerCase().replaceAll(" ", "").includes(input)
        const catCor = cat.cor.toLowerCase().replaceAll(" ", "").includes(input)
        const catIdade = cat.idade.toLowerCase().replaceAll(" ", "").includes(input)

        const sexo = cat.sexo == 0 ? 'femea' : 'macho'
        const catSexo = sexo.includes(input)

        const catTags = cat.tags.some(tag => 
            tag.toLowerCase().replaceAll(" ", "").includes(input)
        )

        const tutorName = [...cat.tutor.nome, ...cat.tutor.sobrenome].join("").trim().toLowerCase()
        const catTutor = tutorName.includes(input)

        let hide = Boolean
        if (input === false) {
            hide = true
        } else {
            hide = catName || catCor || catIdade || catSexo || catTags || catTutor
        }

        if (hide) {
            cat.element.classList.remove('hidden')
            shown++
        } else {
            cat.element.classList.add('hidden')
        }

        const catNum = document.querySelector('.num-cats')
        catNum.textContent = `${shown} gatinhos`
    })
}

// filtro de gatineos
function filtrarGatos() {
    // tTransforma as checkboxes marcadas em uma lista e transforma o NodeList em um array normal
    const pets = Array.from(document.querySelectorAll('.filtro.pet:checked')).map(c => c.value)
    const cores = Array.from(document.querySelectorAll('.filtro.cor:checked')).map(c => c.value)
    const sexos = Array.from(document.querySelectorAll('.filtro.sexo:checked')).map(c => c.value)
    const tags = Array.from(document.querySelectorAll('.filtro.tag:checked')).map(c => c.value)

    let shown = 0

    gatos.forEach(cat => {
        // verifica se o gato atende a algum filtro ou se os filtros estão vazios
        let isCat = pets.length === 0 ||pets.includes(cat.isCat ? 'true' : 'false')
        let cor = cores.length === 0 || cores.includes(cat.cor)
        let sexo = sexos.length === 0 || sexos.includes(String(cat.sexo))
        let tag = tags.length === 0 || tags.some(tag => {
            return cat.tags.some(p => p.includes(tag))
            // queria deixar claro q fritei mto meu cérebro pra fazer esse
            // filtro de personalidade funcionar quero meu tempo de volta
        })

        console.log(isCat)
        let hide = isCat && cor && sexo && tag
        if (hide) {
            cat.element.classList.remove('hidden')
            shown++
        } else {
            cat.element.classList.add('hidden')
        }
    })

    // atualiza o número de gatinhos mostrados
    const catNum = document.querySelector('.num-cats')
    catNum.textContent = `${shown} gatinhos`
}

// Adiciona os event listeners para os filtros
const checkboxes = document.querySelectorAll('.filtro')
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => filtrarGatos())
})

// liga/deslica abre/fecha filtros de gatineos
const filteron = document.querySelector('.icon.filteron')
const filteroffes = document.querySelectorAll('.filteroff')
const filtroDiv = document.querySelector('.filter-options')

filteroffes.forEach(filteroff => {
    filteroff.addEventListener('click', (e) => {
        
        filteron.classList.toggle('hidden')
        filteroffes[0].classList.toggle('hidden')
        filtroDiv.classList.toggle('hidden')

        checkboxes.forEach(item => item.checked = false)
        filtrarGatos()
    })
})

filteron.addEventListener('click', (e) => {

    filteron.classList.toggle('hidden')
    filteroffes[0].classList.toggle('hidden')
    filtroDiv.classList.toggle('hidden')
})

document.body.addEventListener('click', e => {
    if (
        !e.target.closest('.filter-options') &&
        !e.target.closest('.filteron') &&
        !e.target.closest('.filteroff')
    ) {
        filtroDiv.classList.add('hidden')
        filteron.classList.remove('hidden')
        filteroffes[0].classList.add('hidden')
    }
})
