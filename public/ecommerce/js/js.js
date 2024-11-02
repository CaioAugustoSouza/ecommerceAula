document.addEventListener('DOMContentLoaded', () => {
    let sacola = JSON.parse(localStorage.getItem('carrinho'));
    let cartContent = document.getElementById('cart-content')
    cartContent.innerHTML = sacola.length
})
