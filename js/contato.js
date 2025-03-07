const forms = document.querySelector('.forms')

forms.addEventListener('submit', e => {
    e.preventDefault()

    const nome = forms.querySelector('#nome')
    const email = forms.querySelector('#email')
    const mensagem = forms.querySelector('#msg')

    const msg = {
        nome: nome.value,
        email: email.value,
        mensagem: mensagem.value
    }

    nome.value = ''
    email.value = ''
    mensagem.value = ''

    const contatos = JSON.parse(localStorage.getItem('contatos')) || []
    contatos.push(msg)
    localStorage.setItem('contatos', JSON.stringify(contatos))
})
