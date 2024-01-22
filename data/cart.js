export const cart = JSON.parse(localStorage.getItem('cart')) ||
[
    // {
    //     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //     quantity: 1
    // },
    // {
    //     productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    //     quantity: 1
    // }
]; 

export function saveToStorage () {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart (productId, productQuantity) {
    let matchingItem;
        cart.forEach((cartItem) => {//check if the item is in the cart
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            };
        });
        if (matchingItem) {
            matchingItem.quantity += productQuantity;
        }
        else {
            cart.push({
                productId: productId,
                quantity: productQuantity
            });
            saveToStorage();
        }
}

export function removeFromCart (productId) {
    let matchingItemIndex;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItemIndex = cart.indexOf(item);
        }
    cart.splice(matchingItemIndex,1);
    saveToStorage();
    console.log(cart);
    });
};

export function updateCartQuantity () {
    let CartQuantity = 0;
    cart.forEach((item) => {
        CartQuantity += item.quantity;
    });
   return CartQuantity;
};


