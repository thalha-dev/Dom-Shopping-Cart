if (
  !localStorage.hasOwnProperty("currentUser") ||
  !localStorage.hasOwnProperty("token")
) {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  window.location.href = "../login/index.html";
}

const currentUser = localStorage.getItem("currentUser");
const token = localStorage.getItem("token");

if (!currentUser || !token) {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  window.location.href = "../login/index.html";
}

if (!localStorage.hasOwnProperty("cart")) {
  window.location.href = "../shop/index.html";
}

let products = localStorage.getItem("products");
let cart = JSON.parse(localStorage.getItem("cart"));
const cartElement = document.querySelector(".cart");

// function that return product markup

function createProductForCart(product) {
  console.log(product.id);
  let p = `<div class="product">
            <img src=${product.image} alt=${product.category} />
            <div class="product-info cart-info">
              <div class="product-price-size">
                <div>Title: ${product.title}</div>
                <p>Price: $${product.price}</p>
              </div>
            </div>
            <button value="${product.id}" class="remove-from-cart-button">Remove From Cart</button>
          </div>`;
  return p;
}

function createCheckoutListItem(num, product) {
  let l = `<div class="checkout-list-item">
            <p class="checkout-item-title">${num}. ${product.title}</p>
            <p class="checkout-item-price">$${product.price}</p>
          </div>`;
  return l;
}

function totalAmount(cart) {
  const sum = cart.reduce((accumulator, o) => accumulator + o.price, 0);
  return (sum * 74.5).toFixed(2);
}

// function that render products

function renderProductsForCart(cart) {
  cartElement.innerHTML = "";
  document.querySelector(".checkout-list-container").innerHTML = "";
  cartElement.innerHTML += `<div class="products-list-cart"></div>`;
  let num = 0;
  cart.forEach((item) => {
    document.querySelector(".products-list-cart").innerHTML +=
      createProductForCart(item);
    document.querySelector(".checkout-list-container").innerHTML +=
      createCheckoutListItem(++num, item);
  });

  document.querySelector(".checkout-total").innerHTML = `
          <h4>Total</h4>
          <p>Rs ${totalAmount(cart)}</p>`;

  // create event listener for adding product to cart

  const removeFromCartButtons = document.querySelectorAll(
    ".remove-from-cart-button",
  );

  for (let i = 0; i < removeFromCartButtons.length; i++) {
    removeFromCartButtons[i].addEventListener("click", () => {
      let id = removeFromCartButtons[i].value;
      console.log(id);
      cart = cart.filter((p) => p.id !== Number(id));
      localStorage.setItem("cart", JSON.stringify(cart));
      renderProductsForCart(cart);
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  renderProductsForCart(cart);
});

document.querySelector(".checkout-button").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq",
    amount: totalAmount(cart) * 100,
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order",
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  localStorage.setItem("cart", "[]");
  cart = localStorage.getItem("cart");
  renderProductsForCart(cart);
  e.preventDefault();
};
