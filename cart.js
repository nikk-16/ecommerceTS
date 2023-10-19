displayCartItems();

function displayCartItems() {
   let cartContainer = document.getElementById('cart-items');
   let total = 0;
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   if (cart.length === 0) {
      cartContainer.innerHTML = "";
      const tr = document.createElement('tr');
      cartContainer.setAttribute('class', 'empty d-flex flex-column align-items-center justify-content-center')
      tr.innerHTML = `
         <div>
               <h2>Sorry, nothing to find here. Shop more!</h2>
         </div>
      `;
      cartContainer.appendChild(tr);
   }
   else {
      cartContainer.innerHTML = "";

      const div = document.createElement('div');
      div.innerHTML = "";
      const div2 = document.createElement('div');
      const innerDiv = document.createElement('div');
      innerDiv.setAttribute('class', 'd-flex flex-column align-items-center justify-content-center m-5');

      const table1 = document.createElement("table");
      table1.setAttribute("class", "table align-items-center table-light table-striped mx-2 p-3 my-5 table-responsive table hover");
      const tr1 = document.createElement('tr');
      tr1.setAttribute('class', "text-center");
      tr1.innerHTML = `
           <th colspan="2" style="width:60%">Product</th>
           <th style="width:8%">MRP</th>
           <th style="width:8%">Quantity</th>
           <th style="width:8%">Price</th>
           <th style="width:2%">Remove</th>
       `;
      table1.appendChild(tr1);
      // const tr2 = document.createElement('tr');
      // tr2.innerHTML = `
      //      <th colspan="2" style="width:60%"></th>
      //      <th style="width:8%"></th>
      //      <th style="width:8%"></th>
      //      <th style="width:8%"></th>
      //      <th style="width:2%"></th>
      //  `;
      // table1.appendChild(tr2);
      cart.forEach((item, index) => {
         const prodPrice = `${parseFloat((item.price * item.quantity).toFixed(2))}`;
         total += +prodPrice;

         const itemRow = document.createElement('tr');
         itemRow.setAttribute('class', "justify-content-center m-4");
         itemRow.innerHTML = `
         <td style="10%"><a href="order.html?id=product-${item.id}" style="background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);border-bottom-style: none;"><img src="${item.image}" alt="${item.name}" width="50"></a></td>
           <td style="40%"><a href="order.html?id=product-${item.id}" style="background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);border-bottom-style: none;">${item.name}</a></td>
           <td style="10%">$${item.price}</td>
           <td style="20%">
               <button onclick="decreaseQuantity(${index})" class="btn btn-primary m-2 py-1">-</button>
            ${item.quantity}
               <button onclick="addQuantity(${index})" class="btn btn-primary m-2 py-1">+</button>
           </td>
           <td style="15%">$${prodPrice}</td>
           <td style="5%"><button onclick="removeFromCart(${index})" class="btn btn-danger py-0">X</button></td>
       `;
         table1.appendChild(itemRow);
      });
      div.appendChild(table1);
      innerDiv.innerHTML = `<h2>Total : $${total}</h2><button onclick="proceedToPayment(${total});" id= "rzp-buon1" class = "btn btn-primary btn-xx-lg">Proceed to checkout</button>`;
      div2.appendChild(innerDiv);
      cartContainer.appendChild(div);
      cartContainer.appendChild(div2);
   }
}

function removeFromCart(index) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   cart.splice(index, 1);
   localStorage.setItem('cart', JSON.stringify(cart));
   displayCartItems();
}
function emptyCart() {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   cart = [];
   localStorage.setItem('cart', JSON.stringify(cart));
   displayCartItems();
   // setTimeout(()=>{
   //    alert("Order Successfully Placed!");
   // }, 200);
}

function addQuantity(index) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   cart[index].quantity += 1;
   localStorage.setItem('cart', JSON.stringify(cart));
   displayCartItems();
}

function proceedToPayment(total) {
   let payment = [];
   console.log(total);
   // payment = JSON.parse(localStorage.getItem('payment')) || [];
   payment.push({ amount: total, currency: "USD", reciept: Math.random() * 10 });
   // console.log(payment[payment.length-1]);
   localStorage.setItem('payment', JSON.stringify(payment));
   pay();
   
   // window.location.href = 'payment.html';
}

function decreaseQuantity(index) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];

   if (cart[index].quantity == 1) {
      cart.splice(index, 1);
   }
   else {
      cart[index].quantity -= 1;
   }
   localStorage.setItem('cart', JSON.stringify(cart));
   displayCartItems();
}

function pay() {
   let payment = JSON.parse(localStorage.getItem('payment'));
   console.log(payment[0]);
   let amount = payment[0].amount * 100;

   var options = {
      "key": "rzp_test_0248PHQvPGQVQn", // Enter the Key ID generated from the Dashboard
      "amount": `${amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "USD",
      "name": "Bhuvan Industries", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response) {
         alert(response.razorpay_payment_id);
         alert(response.razorpay_order_id);
         alert(response.razorpay_signature)
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
         "name": "Bhuvan Sood", //your customer's name
         "email": "bhuvansood01@gmail.com",
         "contact": "8692080859"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
         "address": "Razorpay Corporate Office"
      },
      "theme": {
         "color": "#3399cc"
      }
   };
   // console.log(options);
   var rzp1 = new Razorpay(options);
   rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
   });
   rzp1.open();
   e.preventDefault();
   // function() { 
   //    preventDefault();
   // };
   // document.getElementById('rzp-button1').onclick = function (e) {
   //    console.log(payment[0]);
   //    console.log(amount);
   //    // proceedToPayment();
      
   // };
}