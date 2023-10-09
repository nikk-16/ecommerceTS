// var d = document.querySelector("body");
// d.style.display = "flex";
// d.style.flexDirection = "column";

// var doc = document.querySelector("ul");
// doc.style.display = "flex";
// doc.style.flexDirection = "row";
// doc.style.justifyContent = "flex-end";
// doc.style.listStyle = "none";

// console.log(doc);
let head = document.querySelector(".head");
head.style.display = "flex";
head.style.flexDirection = "row";
head.style.justifyContent = "space-between";
head.style.margin = "1rem";
// head.style.margin = "20px";

let category = document.querySelector(".cat");
category.style.display = "flex";
category.style.flexDirection = "row";
category.style.justifyContent = "end";
category.style.marginRight = "40px";


let cat = document.querySelectorAll(".p-2");
// cat.onmouseover = function() 
// {
//     this.style.transform = "scale(1.03)";
// }
cat.forEach(element => {
   element.style.marginLeft = "15px";
   element.style.border = "1px solid black";
   // element.style.
   element.onmouseover = function() 
   {
      element.style.transform = "scale(1.05)";
      element.style.transform = "transition 0.3s";
      element.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
   }
   element.onmouseout = function() 
   {
      element.style.transform = "scale(1.00)";
   }
});


let cards = document.querySelector(".main-body");
// cards.style.display = `flex`;
cards.style.display = "flex";
cards.style.flexDirection = "row";
cards.style.flexWrap = "wrap";
cards.style.justifyContent = "start";
cards.style.alignItems = "right";
cards.style.margin = "5rem";

function makeCards(element) {

   // for (i = 0; i < 20; i++) {
      let link = document.createElement("a");
      link.href = `order.html?id=${element.id}`;

      let card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "16.5rem";
      card.style.height = "28rem";
      card.style.margin = "1.5rem";
      card.style.backgroundColor = "white";
      card.style.borderRadius = "1rem";
      card.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
      card.style.textAlign = "center";
      card.style.padding = "2rem";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.flexWrap = "wrap";
      // card.style.overflow = "";
      card.id = `${element.id}`;
      card.setAttribute('class', 'card');
      card.onmouseover = function() 
      {
         card.style.transform = "scale(1.05)";
         card.style.transform = "transition 0.3s";
         
      }
      card.onmouseout = function() 
      {
         card.style.transform = "scale(1.00)";
      }

      let img = document.createElement("img");
      img.src = element.image;
      img.style.width = "12rem";
      img.style.height = "12rem";
      card.appendChild(img);
      let title = document.createElement("h4");
      title.style.width = "100%";
      title.innerText = element.title;
      title.style.display = "-webkit-box";
      title.style.textAlign = "left";
      title.style.overflow = "hidden";
      title.style.whiteSpace = "nowrap";
      title.style.textOverflow = "ellipsis";
      title.style.wordWrap = "break-word";
      // title.style.maxHeight = "6";
      title.style.webkitLineClamp = "3";
      title.style.webkitLineClamplineClamp = "3";
      title.style.webkitBoxOrient = "vertical";
      // title.style.lineHeight = "3";
      card.appendChild(title);
      let rating = document.createElement("div");
      rating.innerText = "Rating : " + element.rating.rate;
      rating.style.textAlign = "left";
      card.appendChild(rating);
      let category = document.createElement("h6");
      category.innerText = "Category: " + element.category;
      category.style.textAlign = "left";
      card.appendChild(category);
      let price = document.createElement("h2");
      price.innerText = "₹" + element.price;
      price.style.textAlign = "left";
      card.appendChild(price);
      // card.setAttribute('id', element.id);
      let addToCart = document.createElement("button");
      // addToCart.setAttribute('class', btn);
      // addToCart.onclick = "addToCart(${element.id}, '${element.title}', ${element.price}, '${element.category}', '${element.description}', '${element.image}')";
      addToCart.innerText = "Add to Cart";
      addToCart.style.background = "linear-gradient(180deg, rgba(233,176,18,1) 90%, rgba(26,0,0,1) 100%)";
      card.appendChild(addToCart);
      link.appendChild(card);

      cards.appendChild(link);
      // makeProduct(element);
      // let im = document.querySelector(".image");
      // im.src = `${element.image}`;

   // }
}
// makeCards();


// console.log(cards);

async function fetchProducts() {
   try{
   var products = await fetch("https://fakestoreapi.com/products");
   var data = await products.json();
   // console.log(data);q
   data.forEach(element => {
      makeCards(element);
   });
}
catch(err){
   console.log(err);
}
}
fetchProducts();





// document.addEventListener("DOMContentLoaded", function() {
//    const urlParams = new URLSearchParams(window.location.search);
//    console.log(urlParams);
//    const productId = urlParams.get('id');

//    if (productId) {
//        fetch(`https://fakestoreapi.com/products/${productId}`)
//            .then(res => res.json())
//            .then(data => {
//                displayProductDetails(data);
//            })
//            .catch(error => {
//                console.error("Error fetching product:", error);
//            });
//    } else {
//        // Handle the case where no product ID is provided
//        alert("Invalid product ID.");
//    }
// });

function displayProductDetails(product) {
   const productDetailContainer = document.getElementById('prod-page');
   let im = document.querySelector('.image');
   im.src = "${product.image}";
   // productDetailContainer.append(im);
}
   // productDetailContainer.innerHTML = `
   //     <div class="col-md-6">
   //         <img src="${product.image}" alt="${product.title}" class="img-fluid">
   //     </div>
   //     <div class="col-md-6">
   //         <h2>${product.title}</h2>
   //         <p>${product.description}</p>
   //         <p><strong>Price: $${product.price}</strong></p>
   //         <p><strong>Category: ${product.category}</strong></p>
   //         <button class="btn btn-primary" onclick="addToCart('${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
   //     </div>
   // `;
// }


function addToCart(productID, productName, productPrice, productCategory, productDescription, productImage) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   let productIndex = cart.findIndex(item => item.id === productID);

   if (productIndex !== -1) {
       cart[productIndex].quantity += 1;
   } else {
       cart.push({
           id: productID,
           name: productName,
           price: productPrice,
           category: productCategory,
           description: productDescription,
           image: productImage,
           quantity: 1
       });
   }

   localStorage.setItem('cart', JSON.stringify(cart));
   alert(`${productName} added to cart.`);
}