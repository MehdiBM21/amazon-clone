import {cart, removeFromCart, updateCartQuantity, saveToStorage} from '../data/cart.js';
import { products } from '../data/products.js';
import {formatCurrency} from './utils/money.js';

document.querySelector('.js-items').innerHTML =`${updateCartQuantity()} items`;

let cartSummaryHTML = '';
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
        if (productId === product.id) {
            matchingProduct = product;
        };
    });
    cartSummaryHTML +=
    `
        <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>
    
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
    
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}" value="${cartItem.quantity}">
              <span class="save-quantity-link link-primary js-save-link-${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
    
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" value = 0>
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" value = 499>
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price ">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}" value = 999>
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price ">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
});
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
//ORDER SUMMARY
document.querySelector('.js-items-number').innerHTML = `Items (${updateCartQuantity()})`;




/*delete button responsive*/
document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
deleteLink.addEventListener('click', () => {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);
    // console.log(cart);
    saveToStorage();
    document.querySelector('.js-items').innerHTML =`${updateCartQuantity()} items`;
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    
    document.querySelector('.js-items-number').innerHTML = `Items (${updateCartQuantity()})`;
    orderSummary();
});
});

document.querySelectorAll('.js-update-link').forEach((updateLink) => {
    const productId = updateLink.dataset.productId;
    let matchingCartItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingCartItem = cartItem;
        };
    });
    updateLink.addEventListener('click', () => {
       const container = document.querySelector(`.js-cart-item-container-${productId}`);
       container.classList.add('is-editing-quantity');
        
      document.querySelectorAll(`.js-save-link-${productId}`)
      .forEach((saveLink) => {
          
      saveLink.addEventListener('click', () => {

        const newQuantity = document.querySelector(`.js-quantity-input-${productId}`).value;
        matchingCartItem.quantity = Number(newQuantity);
        saveToStorage();
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = Number(newQuantity);
        document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove('is-editing-quantity');
        document.querySelector('.js-items').innerHTML =`${updateCartQuantity()} items`;
        document.querySelector('.js-items-number').innerHTML = `Items (${updateCartQuantity()})`;
        orderSummary();
        //all the updates after editing quantity of an item need to be here 
    });
});
        
    });
    
});

// function deliveryOption(radioName) {
//   const deliveryOptions = document.querySelectorAll('input[name="' + radioName + '"]');
//   for (let i = 0; i < deliveryOptions.length; i++) {
//     if (deliveryOptions[i].checked) {
//       return deliveryOptions[i].value;
//     }
//   }
// }
// console.log(deliveryOption('delivery-option-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'));
function deliveryOption(radioName) {
  const deliveryOptions = document.querySelectorAll('input[name="' + radioName + '"]');

  deliveryOptions.forEach(function (radioButton) {//check each radioButton if it is checked
    if (radioButton.checked) {
      console.log(radioButton.value);
    }
    //check also when it is changed;
    radioButton.addEventListener('change', function () {
      if (radioButton.checked) {
        console.log(radioButton.value);
      }
    });
  });
}

deliveryOption('delivery-option-e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

function shippingPrice(){
  let shippingPrice;
  cart.forEach((cartItem) => {
    shippingPrice = cartItem.quantity * deliveryOption();
  });
}




//////////////////////////////////////animation//////
let toggle = false;
const darkmode = document.querySelector('.js-switch');
darkmode.addEventListener('click', () => {
    const timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 500
    });
    timeline.add({
        targets: "body",
        backgroundColor: toggle ?  ['#fff'] : ['#28282B'] ,
        color: toggle ? ['#28282B'] : ['#fff'] ,
    });
    if (!toggle){
        toggle = true;
    }
    else{
        toggle = false;
    }
});

function itemsPrice (){
  let itemsPrice = 0;
  cart.forEach((item) => {
      let matchingProduct;
      products.forEach((product) => {
          if (item.productId === product.id) {
              matchingProduct = product;
          };
      });
      itemsPrice += item.quantity * matchingProduct.priceCents;
  });
  return itemsPrice;
}

function totalBeforeTax(){
  return itemsPrice(); //shippingPrice needs to be defined
}
function tax(){
  return totalBeforeTax() * 0.1;
}
function totalAfterTax(){
  return totalBeforeTax() + tax();
}

//this needs to be updated each time we add a new item to the cart
function orderSummary(){
document.querySelector('.js-items-price').innerHTML = formatCurrency(itemsPrice());
document.querySelector('.js-total-before-tax').innerHTML = formatCurrency(totalBeforeTax());
document.querySelector('.js-tax').innerHTML = formatCurrency(tax());
document.querySelector('.js-total-after-tax').innerHTML = formatCurrency(totalAfterTax());
};
orderSummary();