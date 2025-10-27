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

    //FUNCIONAMIENTO DE CALCULO Y MUESTRA DE RESULTADOS
    calcButton.addEventListener('click', function() {
        const popupResult = document.querySelector('.popup-result');
        const popupOverlay = document.querySelector('.popup-overlay');
        let subtotal = 0;
        let discountA = 0;
        let discountB = 0;
        let discountC = 0;
        
        products.forEach(product => {
            const qty = parseInt(product.querySelector('.qty-display').textContent) || 0;
            if (qty > 0) {
                const price = parseInt(product.dataset.price);
                const lineTotal = price * qty;
                subtotal += lineTotal;

                
                const pairs = Math.floor(qty / 2);
                if (pairs > 0) {
                    discountA += pairs * (price * 0.5);
                }

                
                const isPromo3x2 = product.dataset.promo3x2 === 'true';
                if (isPromo3x2 && qty >= 3) {
                    const trios = Math.floor(qty / 3);
                    discountB += trios * price;
                }
            }
        });

        
        if (subtotal > 30000) {
            discountC = subtotal * 0.1;
        }

        const totalDiscount = discountA + discountB + discountC;
        const finalTotal = subtotal - totalDiscount;

        
        popupResult.innerHTML = `
        <button class="popup-close" aria-label="Cerrar">×</button>
        <h3>Resumen de compra</h3>
        <div class="result-row">
            <span>Subtotal:</span>
            <span>${formatCurrency(subtotal)}</span>
        </div>
        ${discountA ? `
        <div class="result-row">
            <span>Descuento 2x1:</span>
            <span>-${formatCurrency(discountA)}</span>
        </div>` : ''}
        ${discountB ? `
        <div class="result-row">
            <span>Descuento 3x2:</span>
            <span>-${formatCurrency(discountB)}</span>
        </div>` : ''}
        ${discountC ? `
        <div class="result-row">
            <span>Descuento 10%:</span>
            <span>-${formatCurrency(discountC)}</span>
        </div>` : ''}
        <div class="result-row">
            <span>Total Final:</span>
            <span>${formatCurrency(finalTotal)}</span>
        </div>
        `;

        popupResult.classList.add('show');
        popupOverlay.classList.add('show');
        
        const closePopup = () => {
            popupResult.classList.remove('show');
            popupOverlay.classList.remove('show');
        };

        const closeBtn = document.querySelector('.popup-close');
        closeBtn.addEventListener('click', closePopup);
    
        function formatCurrency(value) {
        return '$' + value.toLocaleString('es-AR');
        }
    });

});

    