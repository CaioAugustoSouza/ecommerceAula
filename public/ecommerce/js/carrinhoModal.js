var carrinho = []
document.addEventListener('DOMContentLoaded', async () => {
    
})

function mostrarCarrinho(cartContent) {
    atualizarPreco();
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : carrinho = [];
    let total = 0;
    let linha;
    
    if (carrinho.length > 0) {
        for (let produto of carrinho) {
            linha = document.createElement('tr');
            linha.innerHTML = `
            <th scope="row">
                            <div class="d-flex align-items-center">
                                <img src="${produto.imagem}" class="img-fluid me-5 rounded-circle" style="width: 80px;" alt="">
                            </div>
                        </th>
                        <td>
                            <p class="mb-0 mt-4">${produto.nome}</p>
                        </td>
                        <td>
                            <p class="mb-0 mt-4">R$${produto.valor}</p>
                        </td>
                        <td>
                            <div class="input-group quantity mt-4" style="width: 100px;">
                                
                                <input type="text" class="form-control form-control-sm text-center border-0 inputQuantidade" data-id="${produto.id}" value="${produto.quantidade}">
                                
                            </div>
                        </td>
                        <td>
                            <p class="mb-0 mt-4" id="total-de-${produto.id}">R$${produto.valor*produto.quantidade}</p>
                        </td>
                        <td>
                            <button class="btn btn-md rounded-circle bg-light border mt-4 btn-excluir-produto" id="btn-excluir-produto" data-id=${produto.id}>
                                <i class="fa fa-times text-danger"></i>
                            </button>
                        </td>`
            cartContent.appendChild(linha);
            total += produto.valor * produto.quantidade;
        }
    }
    let inputValorTotal = document.getElementById('valor-total');
    inputValorTotal.innerText = `R$${total}`;
}

async function atualizarPreco() {
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : [];
    if (carrinho.length > 0) {
        for (let produto of carrinho) { 
            await fetch('/obter-valor/' + produto.id)
            .then(r => r.json())
            .then(r => {
                if (r.ok) {
                    produto.valor = r.produto.produtoValorUnitario;
                    produto.nome = r.produto.produtoNome                            
                    produto.imagem = r.produto.produtoImagem
                    console.log(produto)
                }
            })
            .catch(e => {
                console.log(e);
            });
        }
        console.log(carrinho)
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
}

function atualizarQuantidade(){
    let total = 0;
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : carrinho = [];
    let inputValor = this
    for (let produto of carrinho){
        if(produto.id == inputValor.dataset.id){
            produto.quantidade = parseInt(inputValor.value);
            let totalDoItem = document.getElementById(`total-de-${produto.id}`);
            totalDoItem.innerHTML = `R$${produto.valor*produto.quantidade}` 
        }
    }
    for(let produto of carrinho){
        total+= parseFloat(produto.valor*produto.quantidade)
    }
    let inputValorTotal = document.getElementById('valor-total');
    inputValorTotal.innerHTML = `R$${total}`;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function excluirDoCarrinho(){
    let thisElement = this;
    let thisId = thisElement.dataset.id;
    for(let i=0; i<carrinho.length; i++){
        if (thisId == carrinho[i].id){
            carrinho.splice(i,1);
            i--;
        }
    }
    console.log(carrinho)
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    thisElement.parentElement.parentElement.remove()

}