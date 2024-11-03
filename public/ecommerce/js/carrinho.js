var carrinho = []
document.addEventListener('DOMContentLoaded', async () => {
    let btnsCarrinho = document.querySelectorAll('.btn-adicionar-carrinho')
    for (let btnCarrinho of btnsCarrinho) {
        btnCarrinho.addEventListener('click', adicionarCarrinho)
    }
    let meuCarrinho = document.getElementById('meu-carrinho');
    meuCarrinho.innerHTML = '';
    await atualizarPreco();
    mostrarCarrinho(meuCarrinho);
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : []
    // console.log(carrinho)

    let inptsQnt = document.querySelectorAll('.inputQuantidade')
    for(let inptQnt of inptsQnt){
        inptQnt.addEventListener('blur', atualizarQuantidade);
    }
    let btnsExcluirProduto = document.querySelectorAll('.btn-excluir-produto');
    for(let btnExcluirProduto of btnsExcluirProduto){
        btnExcluirProduto.addEventListener('click', excluirDoCarrinho)
    }
})

function adicionarCarrinho(event) {
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : [];
    let btnCarrino = event.target;
    let id = btnCarrino.dataset.id;
    let nome = btnCarrino.dataset.nome;
    let imagem = btnCarrino.dataset.imagem;
    let valor = btnCarrino.dataset.valor
    let obj = {
        id: id,
        nome: nome,
        imagem: imagem,
        quantidade: 1,
        valor: valor
    }
    let produtoAdicionado = false
    for (let produto of carrinho) {
        if (obj.id == produto.id) {
            produto.quantidade++;
            produtoAdicionado = true
        }
    }
    if (!produtoAdicionado) {
        carrinho.push(obj)
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    let sacola = JSON.parse(localStorage.getItem('carrinho'));
    let cartContent = document.getElementById('cart-content')
    cartContent.innerHTML = sacola.length;
    alert('Produto Adicionado ao Carrinho')
}


function mostrarCarrinho(cartContent) {
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : [];
    let total = 0;
    let linha;
    if (carrinho.length > 0) {
        for (let produto of carrinho) {
            linha = document.createElement('tr');
            linha.innerHTML = `
            <th scope="row">
                            <div class="d-flex align-items-center">
                                <img src="${produto.imagem}" class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="">
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
                            <p class="mb-0 mt-4">R$${produto.valor*produto.quantidade}</p>
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
            let body = JSON.stringify({ id: produto.id });
            await fetch('/ecommerce/obter-valor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            })
            .then(r => r.json())
            .then(r => {
                if (r.ok) {
                    produto.valor = r.produto.produtoValorUnitario;
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

function atualizarQuantidade(event){
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : [];
    let inputValor = event.target
    for (let produto of carrinho){
        if(produto.id == inputValor.dataset.id){
            produto.quantidade = parseInt(inputValor.value);
        }
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function excluirDoCarrinho(event){
    let thisElement = event.target;
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