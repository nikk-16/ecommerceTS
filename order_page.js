let product = document.querySelector(".product");
product.style.display = "flex";
product.style.flexDirection = "column";
product.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
product.style.margin = "5rem";
product.style.padding = "4rem";

let prodMain = document.querySelector(".product-main");
prodMain.style.display = "flex";
prodMain.style.flexDirection = "row";
prodMain.style.justifyContent = "space-around";
prodMain.style.flexWrap = "row wrap";
prodMain.style.objectFit = "fill";


let prodInfo = document.querySelector(".product-info");
prodInfo.style.marginLeft = "4em";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log(productId);
if (productId) {
         fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(data => {
               displayProductDetails(data);
            })
            .catch(error => {
               console.error("Error fetching product:", error);
            });
   } else {
         // Handle the case where no product ID is provided
         alert("Invalid product ID.");
      
   }


function displayProductDetails(product) {
   console.log(product);
   // const productDetailContainer = document.getElementById('prod-page');
   let img = document.querySelector(".image");
   img.style.width = "15rem";
   img.style.height = "15rem";
   img.src = `${product.image}`;


   let name = document.querySelector(".product-name");
   name.innerText = `${product.title}`;
   let rating = document.querySelector(".product-rating");
   rating.style.display="flex";
   rating.style.flexDirection ="row";
   rating.innerHTML = `
   <h5>Rating : </h5><sub><h6> ${ product.rating.rate}</h6></sub>`;
   // <p style="font-size : 15px;">Count : ${product.rating.count}</p>
   let category = document.querySelector(".product-category");
   category.style.display="flex";
   category.style.flexDirection ="row";
   // category.style.padding = "4px";
   category.innerHTML = `<h4>Category : </h4> <sub><h5 style="padding-left:5px">${product.category}</h5></sub>`;
   let price = document.querySelector(".product-price");
   price.innerText = `$  ${product.price}`;
   let desc = document.querySelector(".product-description");
   desc.innerText = `${product.description}`;
   let addToCart = document.querySelector(".product-add");
   addToCart.style.background = "linear-gradient(180deg, rgba(233,176,18,1) 90%, rgba(26,0,0,1) 100%)";
}

