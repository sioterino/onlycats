function carregarAssinantes() {
    fetch('../json/assinantes.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
      })
      .then(assinantes => {
        console.log('Assinantes carregados:', assinantes); 

        const lista = document.getElementById('associados');
        lista.innerHTML = '';

        assinantes.forEach(assinante => {
          const li = document.createElement('li');
          li.classList.add('assinante-card'); 

          li.innerHTML = `
            <div>
              <div class="nome">${assinante.nome}</div>
              <p class="plano"><strong>Plano:</strong> ${assinante.plano}</p>
              <p><strong>ID:</strong> ${assinante.id}</p>
            </div>

            <div id="detalhes-${assinante.id}" class="detalhes-assinante" style="display: none;">
              <p><strong>Endereço:</strong> ${assinante.endereco}</p>
              <p><strong>Telefone:</strong> ${assinante.telefone}</p>
              <p><strong>Data de Adesão:</strong> ${assinante.dataAdesao}</p>
  
              <table class="tabela-pagamentos">
                <thead>
                  <tr>
                    <th>Dia</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Método</th>
                    <th>Plano</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  ${assinante.pagamentos.map(pagamento => `
                    <tr>
                      <td>${pagamento.dia}</td>
                      <td>${pagamento.data}</td>
                      <td>${pagamento.hora}</td>
                      <td>${pagamento.metodo}</td>
                      <td>${pagamento.plano}</td>
                      <td>${pagamento.valor}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <button class="ver-mais" onclick="mostrarDetalhes('${assinante.id}', this)">Ver mais</button>
          `;

          lista.appendChild(li); 
        });
      })
      .catch(error => console.error('Erro ao carregar os dados:', error)); 
}
 
function mostrarDetalhes(id, botao) {
    const detalhesDiv = document.getElementById(`detalhes-${id}`);
    
    if (detalhesDiv.style.display === "none" || !detalhesDiv.style.display) {
        detalhesDiv.style.display = "block";
        botao.textContent = "Fechar";
        botao.style.marginTop = "1rem";
    } else {
        detalhesDiv.style.display = "none";
        botao.textContent = "Ver mais"; 
        botao.style.marginTop = "0";
    }
}

carregarAssinantes();
