let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Hp laptop 15.6 inch',
        tag: 'lap1-1',
        price: 68077,
        inCart: 0
    },
    {
        name: 'Hp Laptop 14 inch',
        tag: 'lap2-1',
        price: 76499,
        inCart: 0
    },
    {
        name: 'HP Probook 450 G6',
        tag: 'lap3-1',
        price: 115000,
        inCart: 0 
    },
    {
        name: 'HP Probook 440 G5',
        tag: 'lap4-1',
        price: 125999,
        inCart: 0  
    },
    {
        name: 'HP Elitebook 850 G5',
        tag: 'lap5-1',
        price: 125999,
        inCart: 0  
    },
    {
        name: 'HP 15 8th Gen',
        tag: 'lap6-1',
        price: 99000,
        inCart: 0  
    },
    {
        name:'Motorola Duriod Turbo',
        tag: 'moto1-1',
        price: 14900,
        inCart: 0
    },
    {
        name:'Motorola One macro',
        tag: 'moto2-1',
        price: 30999,
        inCart: 0
    },
    {
        name:'Motorola E6 Plus',
        tag: 'moto3-1',
        price: 19499,
        inCart: 0
    },
    {
        name:'Samsung Galaxy A10S',
        tag: 'sam1-1',
        price: 20999,
        inCart: 0
    },
    {
        name:'Samsung A30S',
        tag: 'sam2-1',
        price: 38999,
        inCart: 0
    },
    {
        name:'Samsung Galaxy J6+',
        tag: 'sam3-1',
        price: 30999,
        inCart: 0
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartsNumbers');
    if( productNumbers ) {
        document.querySelector('.cart-span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart-span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart-span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart-span').textContent = 1;
    }
    
    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    console.log((productNumbers))

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
 
    if( cartItems && productContainer) {
        productContainer.innerHTML = "";
         Object.values(cartItems).map((item, index ) => {
             productContainer.innerHTML += `
          
             <div class="product"  style="border-bottom: 2px solid lightgray;" >
                 <ion-icon name="close-circle" ></ion-icon>
                 <img src="./cartImages/${item.tag}.webp" width="60" height="80" />
                 <span class="sm-hide" >${item.name}</span>
                 </div>
                 <div class="price sm-hide"  style="border-bottom: 2px solid lightgray;"> PKR ${item.price}</div>
                 <div class="quantity"  style="border-bottom: 2px solid lightgray;">
                      <ion-icon class="decrease" name="caret-back-circle"></ion-icon>
                        <span>${item.inCart}</span>
                      <ion-icon class="increase" name="caret-forward-circle"></ion-icon>
                 </div>
                 <div class="total"  style="border-bottom: 2px solid lightgray;" >
                 PKR${item.inCart * item.price} 
                 </div>
              `;
          });
                 productContainer.innerHTML +=`
                 <div class="basketTotalContainer">
                 <h4 class="basketTotalTitle">Basket Total</h4>
                 <h4 class="basketTotal">PKR ${cart}</h4>
                 
                 </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
  

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    // console.log(typeof(cartCost))
   
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);
    // console.log(typeof(cartItems));

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
           

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();