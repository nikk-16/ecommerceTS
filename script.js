let cat = document.querySelectorAll(".category");
cat.forEach(element => {
   element.style.marginLeft = "15px";
   element.style.textDecoration = "none";

   element.onmouseover = function () {
      element.style.transform = "scale(1.15)";
      element.style.transform = "transition 0.3s";
   }
   element.onmouseout = function () {
      element.style.transform = "scale(1.00)";
   }
});


let cards = document.querySelector(".main-body");


function makeCards(element) {

   let link = document.createElement("a");
   link.href = `order.html?id=product-${element.id}`;

   let card = document.createElement("div");
   card.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
   card.style.width = "20rem";
   card.id = `card-${element.id}`;
   card.setAttribute('class', 'card d-flex flex-column rounded-4 text-center flex-wrap p-5 m-4 h-30 bg-white');

   let cardContainer = document.createElement('div');
   cardContainer.setAttribute('class', ' d-flex flex-column flex-wrap justify-content-around')


   let img = document.createElement("img");
   img.src = element.image;
   img.style.width = "100%";
   img.style.height = "15rem";
   img.setAttribute('class', 'align-items-center');
   cardContainer.appendChild(img);


   let title = document.createElement("h4");
   title.style.width = "14rem";
   title.innerText = element.title;

   //hiding content more than a line with ellipsis
   title.setAttribute('class', 'text-left text-truncate');
   cardContainer.appendChild(title);


   let rating = document.createElement("div");
   rating.innerText = "Rating : " + element.rating.rate;
   rating.style.textAlign = "left";
   cardContainer.appendChild(rating);


   let category = document.createElement("h6");
   category.innerText = "Category: " + element.category;
   category.style.textAlign = "left";
   cardContainer.appendChild(category);


   let price = document.createElement("h2");
   price.innerText = "$ " + element.price;
   cardContainer.appendChild(price);

   link.appendChild(cardContainer);
   link.setAttribute('class', 'text-decoration-none text-dark');
   card.appendChild(link);

   let addToCart = document.createElement('button');
   addToCart.setAttribute('id', `product-${element.id}`);
   addToCart.setAttribute('class', `flex-wrap w-100 p-2 rounded-5 font-weight-bold`);
   addToCart.style.backgroundImage = "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)";
   addToCart.innerText = "Add to Cart";
   card.appendChild(addToCart);

   cards.appendChild(card);

   card.onmouseover = function () {
      card.style.transform = "scale(1.05)";
      card.style.transform = "transition 0.3s";

   }
   card.onmouseout = function () {
      card.style.transform = "scale(1.00)";
   }
   addToCart.onmouseover = function () {
      addToCart.style.boxShadow = "5px 1px 5px 0px black";

   }
   addToCart.onmouseout = function () {
      addToCart.style.boxShadow = "0px 0px";
      // if(document.getElementById(`product-${id}`).innerText === "Go to Cart"){
      //    goToCart.style.background = "linear-gradient(180deg, rgba(233,176,18,1) 90%, rgba(26,0,0,1) 100%)";
      // }
   }
}



async function fetchProducts() {
   try {
      var products = await fetch("https://fakestoreapi.com/products");
      var data = await products.json();
      data.forEach(element => {
         makeCards(element);
      });
   }
   catch (err) {
      console.log(err);
   }
}
fetchProducts();



// localStorage.setItem('card', []);
// let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, productPrice, productImage) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   let productIndex = cart.findIndex((item) => item.name === productName);

   if (productIndex !== -1) {
      cart[productIndex].quantity += 1;
   } else {
      cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
   }

   localStorage.setItem('cart', JSON.stringify(cart));
   alert(`${productName} added to cart.`);
};


//Event-bubbling

const cardsDiv = document.querySelector(`#card-container`);
// let id;
cardsDiv.addEventListener('click', event => {
   const target = event.target;
   const buttonId = target.id;
   const id = +buttonId.slice(8);
   let goToCart = document.getElementById(`product-${id}`);
   if (goToCart.innerText === "Go to Cart") {
      // goToCart.style.background = "linear-gradient(180deg, rgba(233,176,18,1) 90%, rgba(26,0,0,1) 100%)";
      window.location.href = "cart.html";
   }
   else {
      goToCart.innerText = "Go to Cart";
      goToCart.style.background = "linear-gradient(180deg, rgba(233,176,18,1) 90%, rgba(26,0,0,1) 100%)";
      // goToCart.onmouseout = function () {
      //    goToCart.style.background = "linear-gradient(180deg, rgba(233,176,18,1) 90%, rgba(26,0,0,1) 100%)";
      // }
      addtoCartById(id);
   }
});

async function addtoCartById(id) {
   try {
      let data = await (await fetch(`https://fakestoreapi.com/products/${id}`)).json();
      addToCart(`${data.id}`, `${data.title}`, `${data.price}`, `${data.image}`);
   }
   catch (err) {
      console.log(err);
   }
}
