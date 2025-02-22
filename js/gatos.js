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
        return a.isCat ? -1 : 1; // If a.isCat is true, it comes first; otherwise, b comes first
    });
    
    cats.forEach(cat => {
        catalogo.append(createPetCard(cat, '.jpg'))
    });
    

}) 