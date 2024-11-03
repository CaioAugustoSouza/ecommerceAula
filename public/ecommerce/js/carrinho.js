var carrinho = []
document.addEventListener('DOMContentLoaded', () => {
    let btnsCarrinho = document.querySelectorAll('.btn-adicionar-carrinho')
    for (let btnCarrinho of btnsCarrinho) {
        btnCarrinho.addEventListener('click', adicionarCarrinho)
    }
    let meuCarrinho = document.getElementById('meu-carrinho');
    mostrarCarrinho(meuCarrinho);
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : []
    console.log(carrinho)
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
                            <p class="mb-0 mt-4">R$${parseFloat(produto.valor)}</p>
                        </td>
                        <td>
                            <div class="input-group quantity mt-4" style="width: 100px;">
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-minus rounded-circle bg-light border" >
                                    <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control form-control-sm text-center border-0" value="${produto.quantidade}">
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-plus rounded-circle bg-light border">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="mb-0 mt-4">R$${parseFloat(produto.valor * produto.quantidade)}</p>
                        </td>
                        <td>
                            <button class="btn btn-md rounded-circle bg-light border mt-4" >
                                <i class="fa fa-times text-danger"></i>
                            </button>
                        </td>`
            cartContent.appendChild(linha);
            total += produto.valor*produto.quantidade;
        }
    }
    let inputValorTotal = document.getElementById('valor-total');
    inputValorTotal.innerText = `R$${total}`;
}