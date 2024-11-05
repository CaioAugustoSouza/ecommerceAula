const ProdutoModel = require("../models/produtoModel");
const ProdutoController = require("./produtoController");

class EcommerceController {
    async ecommerceView(req, res){
        
        let produtos = new ProdutoModel();
        produtos = await produtos.listarProdutos()
        res.render('ecommerce/home/index.ejs', {layout: 'ecommerce/layout.ejs', produtos:produtos});
    }
    carrinhoView (req,res){
        res.render('ecommerce/home/carrinho', {layout: 'ecommerce/layout'})
    }
    async obterValor(req,res){
        let id = req.params.id;
        let produto = new ProdutoModel();
        produto = await produto.buscarProduto(id);
        let ok = false;
        if (produto){
            ok=true;
        }
        res.json({produto:produto, ok:ok});
    }
}

module.exports = EcommerceController;