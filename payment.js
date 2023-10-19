// // var instance = new Razorpay({ key_id: 'rzp_test_0248PHQvPGQVQn', key_secret: 'XWJCTrri79oCB1TqQrPzky8x'});

// // instance.orders.create({
// //   amount: 50000,
// //   currency: "INR",
// //   receipt: "receipt#1"
// // })

// // $.ajax({
// //     type: "POST",
// //     url: "https://api.razorpay.com/v1/orders",
// //     api_key: "rzp_test_0248PHQvPGQVQn",
// //     key_secret: "XWJCTrri79oCB1TqQrPzky8x",
// //     headers: {
// //         'contentType': 'application/json',
// //     },
// //     data: {
// //         "amount": `${total}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
// //         "currency": `${currency}`,
// //         "reciept" : `${reciept}`
// //     },
// //     success: function(data) {
// //       console.log(data);
// //       //do something when request is successfull
// //     },
// //     dataType: "json"
// // });

// let payment = JSON.parse(localStorage.getItem('payment')) || [];
// let total = payment[0].amount;
// let currency = payment[0].currency;
// let reciept = payment[0].reciept;
// console.log(payment[0]);
// // let key = (instance.orders.create(payment[0])).id;
// // console.log(key);



// var myHeaders = new Headers();
// myHeaders.append("content-type", "application/json");
// myHeaders.append("Authorization", "Basic rzp_test_0248PHQvPGQVQn:XWJCTrri79oCB1TqQrPzky8x");

// var raw = JSON.stringify({
//   "amount": 500000,
//   "currency": "INR",
//   "receipt": "qw06sagfq1"
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://api.razorpay.com/v1/orders", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));






// // async function getObject() {
// //     try{
// //     let url = "https://api.razorpay.com/v1/orders";
// //     let headers = new Headers();
// //     headers.append('Authorization', 'Basic ' + btoa("rzp_test_0248PHQvPGQVQn" + ":" + "XWJCTrri79oCB1TqQrPzky8x"));
// //     headers.append('content-type', 'application/json');
// //     const response = await fetch(url, {
// //         method: 'POST',
// //         headers: headers,
// //         data: '{ "amount": `${total}`, "currency": "INR, "reciept" : `${reciept}`}'
// //     })
// //     .then(response => response.json())
// //     .then(json => console.log(json));
// //     // const data = await response.text();
// //     // console.log(data); //this will just be text
// //     // var data_obj = JSON.parse(data);
// //     // return data_obj;
// // //     curl --location 'https://api.razorpay.com/v1/orders' \
// // // --header 'content-type: application/json' \
// // // --header 'Authorization: Basic cnpwX3Rlc3RfMDI0OFBIUXZQR1FWUW46WFdKQ1Rycmk3OW9DQjFUcVFyUHpreTh4' \
// // // --data '{
// // //     "amount": 500000,
// // //     "currency": "INR",
// // //     "receipt": "qw06sagfq1",
// // //     "partial_payment": true,
// // //     "first_payment_min_amount": 230
// // // }'
// // }
// // catch(err){
// //     console.log(err);
// // }
// // };
// // getObject();
// // console.log(id);


// var options = {
//     "key": "rzp_test_0248PHQvPGQVQn", // Enter the Key ID generated from the Dashboard
//     "amount": `${total}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//     "currency": "INR",
//     "name": "Acme Corp", //your business name
//     "description": "Test Transaction",
//     "image": "https://example.com/your_logo",
//     "order_id": "id", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//     "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
//     "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//         "name": "Gaurav Kumar", //your customer's name
//         "email": "gaurav.kumar@example.com",
//         "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
//     },
//     "notes": {
//         "address": "Razorpay Corporate Office"
//     },
//     "theme": {
//         "color": "#3399cc"
//     }
// };
// var rzp1 = new Razorpay(options);
// document.getElementById('rzp-button1').onclick = function(e){
//     rzp1.open();
//     e.preventDefault();
// }