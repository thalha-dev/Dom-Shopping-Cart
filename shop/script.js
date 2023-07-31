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
  localStorage.setItem("cart", "[]");
}

if (!localStorage.hasOwnProperty("products")) {
  localStorage.setItem("products", "[]");
}

let products = localStorage.getItem("products");
let cart = JSON.parse(localStorage.getItem("cart"));

const productsElement = document.querySelector(".products");
const menCategory = document.querySelector(".men-category");
const womenCategory = document.querySelector(".women-category");
const jeweleryCategory = document.querySelector(".jewellery-category");
const electronicsCategory = document.querySelector(".electronics-category");
const allCategory = document.querySelector(".all-category");
const ratingFilterElement = document.querySelector(".ratingFilter");
const clearRatingElement = document.getElementById("clearRating");
const price0to25 = document.getElementById("0-25");
const price25to50 = document.getElementById("25-50");
const price50to100 = document.getElementById("50-100");
const price100on = document.getElementById("100on");
const productSearchElement = document.querySelector(".product-search");

// INITIAL RENDER

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts(products);

      // adding product to cart

      const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

      for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", (e) => {
          let id = e.target.value;
          cart.push(products.find((o) => o.id === Number(id)));
          localStorage.setItem("cart", JSON.stringify(cart));
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// function that return product markup

function createProduct(product) {
  let p = `<div class="product">
            <img src=${product.image} alt=${product.category} />
            <div class="product-info">
              <div class="product-price-size">
                <p>$${product.price}</p>
                <p>S,M,L,XL</p>
              </div>
              <div class="product-colors">
                <p>Colors:</p>
                <div class="circle-container">
                  <div class="circle red-circle"></div>
                  <div class="circle blue-circle"></div>
                  <div class="circle black-circle"></div>
                </div>
              </div>
              <div class="product-rating">
                <p>Rating:</p>
                <p>${product.rating.rate}</p>
              </div>
            </div>
            <button value="${product.id}" class="add-to-cart-button">Add To Cart</button>
          </div>`;
  return p;
}

// function that render products

function renderProducts(products) {
  productsElement.innerHTML = "";
  const menCloths = products.filter((product) => {
    return product.category === "men's clothing";
  });
  const womenCloths = products.filter((product) => {
    return product.category === "women's clothing";
  });
  const electronics = products.filter((product) => {
    return product.category === "electronics";
  });
  const jewelery = products.filter((product) => {
    return product.category === "jewelery";
  });
  if (menCloths.length > 0) {
    productsElement.innerHTML += `<h3>Men's Clothing</h3>`;
    productsElement.innerHTML += `<div class="products-list-men"></div>`;
    menCloths.forEach((menCloth) => {
      document.querySelector(".products-list-men").innerHTML +=
        createProduct(menCloth);
    });
  }
  if (womenCloths.length > 0) {
    productsElement.innerHTML += `<h3>Women's Clothing</h3>`;
    productsElement.innerHTML += `<div class="products-list-women"></div>`;
    womenCloths.forEach((womenCloth) => {
      document.querySelector(".products-list-women").innerHTML +=
        createProduct(womenCloth);
    });
  }
  if (electronics.length > 0) {
    productsElement.innerHTML += `<h3>Electronics</h3>`;
    productsElement.innerHTML += `<div class="products-list-electronics"></div>`;
    electronics.forEach((e) => {
      document.querySelector(".products-list-electronics").innerHTML +=
        createProduct(e);
    });
  }
  if (jewelery.length > 0) {
    productsElement.innerHTML += `<h3>Jewelery</h3>`;
    productsElement.innerHTML += `<div class="products-list-jewelery"></div>`;
    jewelery.forEach((e) => {
      document.querySelector(".products-list-jewelery").innerHTML +=
        createProduct(e);
    });
  }
}

// filtering based on product ratings

ratingFilterElement.addEventListener("input", (e) => {
  allCategory.classList.add("category-active");
  menCategory.classList.remove("category-active");
  womenCategory.classList.remove("category-active");
  jeweleryCategory.classList.remove("category-active");
  electronicsCategory.classList.remove("category-active");
  const filteredProducts = products.filter((product) => {
    return (
      Math.floor(product.rating.rate) === Number(ratingFilterElement.value)
    );
  });
  console.log(filteredProducts);
  renderProducts(filteredProducts);
});

// function to clear rating filter

clearRatingElement.addEventListener("click", () => {
  ratingFilterElement.value = 0;
  renderProducts(products);
});

// filtering based on product price

price0to25.addEventListener("change", handlePriceFilter);
price25to50.addEventListener("change", handlePriceFilter);
price50to100.addEventListener("change", handlePriceFilter);
price100on.addEventListener("change", handlePriceFilter);

function handlePriceFilter(e) {
  allCategory.classList.add("category-active");
  menCategory.classList.remove("category-active");
  womenCategory.classList.remove("category-active");
  jeweleryCategory.classList.remove("category-active");
  electronicsCategory.classList.remove("category-active");

  let filteredProducts = [];

  if (price0to25.checked) {
    let p = products.filter((product) => {
      return product.price < 26;
    });
    filteredProducts = filteredProducts.concat(p);
  }
  if (price25to50.checked) {
    let p = products.filter((product) => {
      return product.price > 24 && product.price < 51;
    });
    filteredProducts = filteredProducts.concat(p);
  }
  if (price50to100.checked) {
    let p = products.filter((product) => {
      return product.price > 49 && product.price < 101;
    });
    filteredProducts = filteredProducts.concat(p);
  }
  if (price100on.checked) {
    let p = products.filter((product) => {
      return product.price > 100;
    });
    filteredProducts = filteredProducts.concat(p);
  }

  if (
    !price0to25.checked &&
    !price25to50.checked &&
    !price50to100.checked &&
    !price100on.checked
  ) {
    renderProducts(products);
    return;
  }

  renderProducts(filteredProducts);
}

// filtering based on product categories

allCategory.onclick = function () {
  allCategory.classList.add("category-active");
  menCategory.classList.remove("category-active");
  womenCategory.classList.remove("category-active");
  jeweleryCategory.classList.remove("category-active");
  electronicsCategory.classList.remove("category-active");
  renderProducts(products);
};

menCategory.onclick = function () {
  allCategory.classList.remove("category-active");
  menCategory.classList.add("category-active");
  womenCategory.classList.remove("category-active");
  jeweleryCategory.classList.remove("category-active");
  electronicsCategory.classList.remove("category-active");
  renderProducts(products.filter((o) => o.category === "men's clothing"));
};

womenCategory.onclick = function () {
  allCategory.classList.remove("category-active");
  menCategory.classList.remove("category-active");
  womenCategory.classList.add("category-active");
  jeweleryCategory.classList.remove("category-active");
  electronicsCategory.classList.remove("category-active");
  renderProducts(products.filter((o) => o.category === "women's clothing"));
};

jeweleryCategory.onclick = function () {
  allCategory.classList.remove("category-active");
  menCategory.classList.remove("category-active");
  womenCategory.classList.remove("category-active");
  jeweleryCategory.classList.add("category-active");
  electronicsCategory.classList.remove("category-active");
  renderProducts(products.filter((o) => o.category === "jewelery"));
};

electronicsCategory.onclick = function () {
  allCategory.classList.remove("category-active");
  menCategory.classList.remove("category-active");
  womenCategory.classList.remove("category-active");
  jeweleryCategory.classList.remove("category-active");
  electronicsCategory.classList.add("category-active");
  renderProducts(products.filter((o) => o.category === "electronics"));
};

// filtering based on products search

productSearchElement.addEventListener("input", (e) => {
  setTimeout(() => {
    renderProducts(
      products.filter((o) =>
        o.title.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  }, 1500);
});
