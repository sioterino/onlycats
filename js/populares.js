fetch('../json/cats.json')
  .then(response => response.json())
  .then(cats => {

    cats.sort((a, b) => {
      if (a.isCat !== b.isCat) {
        return b.isCat - a.isCat
      }
      return b.popularidade - a.popularidade
    })
    
    const galeria = document.querySelector('.galeria')

    const dupla1 = document.createElement('div')
    dupla1.classList.add('dupla1')
    dupla1.append(createPetCard(cats[0], ".jpg"), createPetCard(cats[1], ".jpg"))
    
    const dupla2 = document.createElement('div')
    dupla2.classList.add('dupla2')
    dupla2.append(createPetCard(cats[2], ".jpg"), createPetCard(cats[3], ".jpg"))
    
    galeria.append(dupla1, dupla2)  

  }) 