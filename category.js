const url = new URLSearchParams(window.location.search);
const categ = url.get('category');
if (categ) {
console.log(categ);
    fetch(`https://fakestoreapi.com/products/category/${categ}`)
        .then(prod => prod.json())
        .then(data => data.forEach(element => {
            makeCard(element);
        })
        )
        .catch(error => {
            console.error("Error fetching product:", error);
        });
}


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


let catCards = document.querySelector(".main-body");

function makeCard(element) {
    let link = document.createElement("a");
    link.href = `order.html?id=product-${element.id}`;

    let card = document.createElement("div");
    card.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    card.setAttribute('id', `card-${element.id}`);
    card.id = `card-${element.id}`;
    card.setAttribute('class', 'card d-flex flex-column rounded-4 text-center flex-wrap p-5 m-4 h-30 w-18 bg-white');


    let cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', ' d-flex flex-column flex-wrap justify-content-center')


    let img = document.createElement("img");
    img.src = element.image;
    img.style.width = "12.5rem";
    img.style.height = "12rem";
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
    rating.setAttribute('class', 'text-left');
    cardContainer.appendChild(rating);


    let category = document.createElement("h6");
    category.innerText = "Category: " + element.category;
    category.setAttribute('class', 'text-left');
    cardContainer.appendChild(category);


    let price = document.createElement("h2");
    price.innerText = "$ " + element.price;
    cardContainer.appendChild(price);

    link.setAttribute('class', 'text-decoration-none text-dark');
    link.appendChild(cardContainer);
    card.appendChild(link);

    let addToCart = document.createElement('button');
    addToCart.setAttribute('class', 'product-add flex-wrap rounded-5 p-2');
    addToCart.setAttribute('id', `product-${element.id}`);
    addToCart.innerText = "Add to Cart";
    addToCart.style.backgroundImage = "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)";
    card.appendChild(addToCart);

    catCards.appendChild(card);

    card.onmouseover = function () {
        card.style.transform = "scale(1.05)";
        card.style.transform = "transition 0.3s";
        // addToCart.style.backgroundImage = "linear-gradient(160deg, #1093F5 25%, #80D0C7 90%)";

    }
    card.onmouseout = function () {
        card.style.transform = "scale(1.00)";
        // addToCart.style.backgroundImage = "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)";
    }
    addToCart.onmouseover = function () {
        addToCart.style.boxShadow = "5px 1px 5px 0px black";

    }
    addToCart.onmouseout = function () {
        // card.style.transform = "scale(1.00)";
        addToCart.style.boxShadow = "0px 0px";
    }
}


function addToCart(productId, productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex((item) => item.name === productName);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id:productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setTimeout(() => { alert(`${productName}` + " added to cart.", 1000) });
};

const cardsDiv = document.querySelector(`#card-container`);
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
   }
    addtoCartById(id);
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