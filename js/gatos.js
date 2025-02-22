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
        const card = createPetCard(cat, '.jpg');
        catalogo.append(card)
        return {nome: cat.nome, cor: cat.cor, idade: cat.idade, sexo: cat.sexo, tags: cat.personalidade, tutor: cat.tutor, element: card}
    })
}) 

const searchbar = document.querySelector('#searchbar')
searchbar.addEventListener('input', e =>{
    // console.log(e.target.value)
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

        const tutorName = [...cat.tutor.nome, ...cat.tutor.sobrenome].join("").trim().toLowerCase();
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