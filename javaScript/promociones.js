document.addEventListener('DOMContentLoaded', function() {
    
    //FUNCIONAMIENTO DE LOS CHECKBOX Y CONTROLES DE CANTIDAD
    const products = document.querySelectorAll('.product-item');
    const calcButton = document.querySelector('.calc-button');
    let anyChecked = 0;
    products.forEach(product => {
        const checkbox = product.querySelector('.product-item-checkbox');
        const qtyController = product.querySelector('.quantity-controller');
        const minusBtn = product.querySelector('.qty-btn.minus');
        const plusBtn = product.querySelector('.qty-btn.plus');
        const qtyDisplay = product.querySelector('.qty-display');
        let quantity = 0;
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.style.display = 'none';
                qtyController.style.display = 'flex';
                quantity = 1;
                qtyDisplay.textContent = quantity;
            }
        });
        minusBtn.addEventListener('click', function() {
            quantity = Math.max(0, quantity - 1);
            qtyDisplay.textContent = quantity;
            if (quantity === 0) {
                checkbox.parentElement.style.display = 'block';
                qtyController.style.display = 'none';
                checkbox.checked = false;
                 anyChecked = anyChecked-1;
                 checkForCalcButton();
            }
        });
        plusBtn.addEventListener('click', function() {
            quantity++;
            qtyDisplay.textContent = quantity;
        });
        
    });

    //FUNCIONAMIENTO DE BOTON CALCULAR
    products.forEach(product => {
        const checkbox = product.querySelector('.product-item-checkbox');
        checkbox.addEventListener('change', function() {
                if (this.checked) {
                    anyChecked = anyChecked+1;
                    
                }
                checkForCalcButton();
        });
                
    });

    checkForCalcButton = () => {
        if (anyChecked > 0) {
            calcButton.style.display = 'flex';
        } else {
            calcButton.style.display = 'none';
        }
    };
});