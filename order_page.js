let product = document.querySelector(".product");
if (product != null) {
   product.style.display = "flex";
   product.style.flexDirection = "column";
   product.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
   product.style.margin = "5rem";
   product.style.padding = "4rem";
}

let prodMain = document.querySelector(".product-main");
if (prodMain != null) {
   prodMain.style.display = "flex";
   prodMain.style.flexDirection = "row";
   prodMain.style.justifyContent = "space-around";
   prodMain.style.flexWrap = "row wrap";
   prodMain.style.objectFit = "fill";
}





function displayProductDetails(product) {
   //    console.log(product);
   let img = document.querySelector(".image");
   img.style.width = "15rem";
   img.style.height = "15rem";
   img.src = `${product.image}`;


   let name = document.querySelector(".product-name");
   name.innerText = `${product.title}`;
   let rating = document.querySelector(".product-rating");
   rating.innerHTML = `<h5>Rating : </h5> <sub><h6 class="px-2"> ${product.rating.rate}</h6></sub>`;
   let category = document.querySelector(".product-category");
   category.innerHTML = `<h4>Category : </h4> <sub><h5 class="px-2">${product.category}</h5></sub>`;
   let price = document.querySelector(".product-price");
   price.innerText = `$  ${product.price}`;
   let desc = document.querySelector(".product-description");
   desc.innerText = `${product.description}`;
   let addtoCart = document.querySelector(".product-add");
   addtoCart.style.backgroundImage = "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)";

}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
   const prodId = productId.split('-')[1];
   console.log(prodId);
   fetch(`https://fakestoreapi.com/products/${prodId}`)
      .then(res => res.json())
      .then(data => {
         displayProductDetails(data);
         let addtoCart = document.querySelector("button");
         addtoCart.addEventListener('click', cart => {
            if (addtoCart.innerText === "Go to Cart") {
               window.location.href = "cart.html";
            }
            else {
               addToCart(`${data.id}`, `${data.title}`, `${data.price}`, `${data.image}`)
               addtoCart.innerText = "Go to Cart";
               addtoCart.style.background = "linear-gradient(180deg, rgba(233,176,18,1) 90%, rgba(26,0,0,1) 100%)";
            }
         });
      })
      .catch(error => {
         console.error("Error fetching product:", error);
      });
}


function addToCart(productId, productName, productPrice, productImage) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   console.log(cart);
   let productIndex = cart.findIndex((item) => item.name === productName);

   if (productIndex !== -1) {
      cart[productIndex].quantity += 1;
   } else {
      cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
   }

   localStorage.setItem('cart', JSON.stringify(cart));
   // setTimeout(() => {alert(`${productName}` + " added to cart.", 1000)}); 
};

let carts = document.querySelector("a");
// console.log(carts);
carts != null ? carts.addEventListener('click', display => displayCartItems()) : null;

