const galeria = document.querySelector('.galeria');

fetch('../json/cats.json')
  .then(response => response.json())
  .then(cats => {
    createCard(cats[3]);
  });

function createCard(cat) {
  console.log('Creating card for', cat);

  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('div');
  img.classList.add('gato');
  img.style.backgroundImage = `url(${cat.imgPath[0]})`;
  img.style.height = "300px"
  img.style.width = "300px"

  const nome = document.createElement('div');
  nome.classList.add('nome');

  const gatoNome = document.createElement('p');
  const bulletEl = document.createElement('p');
  const tutor = document.createElement('p');

  gatoNome.classList.add('gato-nome');
  tutor.classList.add('tutor');

  gatoNome.textContent = cat.nome;
  bulletEl.textContent = '•';
  tutor.textContent = cat.tutor.nome[0];

  nome.append(gatoNome, bulletEl, tutor);

  const more = document.createElement('div');
  more.classList.add('more');

  const sexo = document.createElement('p');
  const icon = document.createElement('span');
  const idade = document.createElement('p');

  sexo.classList.add('sexo');
  icon.classList.add('icon', 'sexo');
  idade.classList.add('idade');

  sexo.textContent = "Sexo:";
  icon.textContent = cat.sexo === 0 ? "female" : "male";
  idade.textContent = `Idade: ${cat.idade}`;

  sexo.append(icon);
  more.append(sexo, bulletEl.cloneNode(true), idade);

  card.append(img, nome, more);

  galeria.append(card);
}
