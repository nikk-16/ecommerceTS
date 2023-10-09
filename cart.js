// let head = document.querySelector(".head");
// head.style.display = "flex";
// head.style.flexDirection = "row";
// head.style.justifyContent = "space-between";
// head.style.margin = "1rem";


let checkout = document.querySelector(".checkout-main");
checkout.style.display = "flex";
checkout.style.flexDirection = "column";

// let check = document.createElement("h2");
// check.innerText = "Checkout";
// checkout.appendChild(check);



let checkoutProds = document.createElement("div");
let check = document.querySelector(".checkMain");
console.log(check);
function makeElement(){
   let c1d1 = document.createElement("div");
   c1d1.classList.add("c1d1");
   c1d1.style.display = "flex";
   c1d1.style.flexDirection = "column";
   c1d1.style.margin = "1rem";
   c1d1.style.padding = "1rem";
   c1d1.style.border = "1px solid black";
   c1d1.style.borderRadius = "1rem";
   c1d1.style.width = "20vw";
   c1d1.style.height = "20vh";
   c1d1.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
   // checkoutProds.appendChild(c1d1);
   return c1d1;
}
checkout.appendChild(checkoutProds.appendChild(makeElement()));
check.appendChild(checkout);
console.log(checkoutProds);




function addToCart(productName, productPrice, productImage) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   let productIndex = cart.findIndex(item => item.name === productName);

   if (productIndex !== -1) {
       cart[productIndex].quantity += 1;
   } else {
       cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
   }

   localStorage.setItem('cart', JSON.stringify(cart));
   alert(`${productName} added to cart.`);
}

document.addEventListener("DOMContentLoaded", function() {
   displayCartItems();
});

function displayCartItems() {
   const cartContainer = document.getElementById('cart-items');
   let cart = JSON.parse(localStorage.getItem('cart')) || [];

   cartContainer.innerHTML = "";

   cart.forEach((item, index) => {
       const tr = document.createElement('tr');

       tr.innerHTML = `
           <td><img src="${item.image}" alt="${item.name}" width="50"></td>
           <td>${item.id}</td>
           <td>${item.name}</td>
           <td>${item.category}</td>
           <td>${item.description}</td>
           <td>$${item.price}</td>
           <td>${item.quantity}</td>
           <td>$${item.price * item.quantity}</td>
           <td>
               <button onclick="removeFromCart(${index})" class="btn btn-danger btn-sm">Remove</button>
               <button onclick="addQuantity(${index})" class="btn btn-primary btn-sm">Add</button>
           </td>
       `;

       cartContainer.appendChild(tr);
   });
}



function removeFromCart(index) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   cart.splice(index, 1);
   localStorage.setItem('cart', JSON.stringify(cart));
   displayCartItems();
}

function addQuantity(index) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   cart[index].quantity += 1;
   localStorage.setItem('cart', JSON.stringify(cart));
   displayCartItems();
}
function proceedToPayment() {
   window.location.href = 'payment.html';
}