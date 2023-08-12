let cart = [];
let cartItemOriginal = [];
getProducts();

initCart();

function initCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  displayCart(cart);
}

function getProducts() {
  apiGetProducts()
    .then((response) => {
      let data = response.data;
      cartItemOriginal = [];
      cartItemOriginal = data;
      display(cartItemOriginal);
    })
    .catch((error) => {
      console.log(error);
    });
}

// display product
function display(products) {
  let showProducts = products.reduce((result, value) => {
    let product = new Product(
      value.id,
      value.name,
      value.price,
      value.screen,
      value.backCamera,
      value.frontCamera,
      value.img,
      value.desc,
      value.type
    );

    return (
      result +
      `<div class="product_item col-12 col-sm-12 col-md-6 col-xl-4">
        <div class="product_box">
        <div class="card-header">
        <img src="${product.img}" width="200px" height="100%"/>
        </div>
        <div class="card-body">
        <h3 class="product_name">
        ${product.name}
        </h3>
        <p>${product.price.toLocaleString()} VND</p>
        <p class="product_type">${product.type}</p>
        <p class="product_desc">
        <h4 id="desc">Description:</h4>${product.desc}
        </p>
        </div>
        <div class="card-footer">
        <p id="stock-status">In Stock</p>
        </div>
        <div class="product_overlay">
        <div class="overlay_info">
          <p>Screen: ${product.screen}</p>
          <p>Back Camera: ${product.backCamera}</p>
          <p>Front Camera: ${product.frontCamera}</p>
          <a href="#">Click for more Infomation</a>
          </div>
        <button onclick="addCart('${
          product.id
        }')" id="cart-btn" class="btn">Add to cart</button>
        </div>
        </div>
      </div>
      `
    );
  }, "");
  getEl("#product-list").innerHTML = showProducts;
}

// Utils
function getEl(n) {
  return document.querySelector(n);
}

// ------------------------------------------------------

let openShopping = getEl("#shopping");
let closeShopping = getEl("#close-shopping");
let body = getEl("body");
let overlay = getEl(".shopping-cart-overlay");

// find brand by onchange function
function selectBrands() {
  let select = getEl("#selectBrand").value;
  const selectedValue = cartItemOriginal.filter((value) => {
    if (select === "default") {
      return cartItemOriginal;
    } else {
      return value.type === select;
    }
  });
  display(selectedValue);
}

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});
overlay.addEventListener("click", () => {
  body.classList.remove("active");
});

// calc total
function calcSubTotal(cart) {
  let total = 0;
  cart.forEach((value) => {
    total += value.price * value.quantity;
  });
  return total;
}

// cart count function
function cartCount(cart) {
  let cartCount = 0;
  cart.forEach((value) => {
    cartCount += value.quantity;
  });
  return cartCount;
}

// add to cart
function addCart(productId) {
  const cartItem = cartItemOriginal.find((value) => {
    if (value.id === productId) {
      return value;
    }
  });

  let cartitem = new Cartitem(
    cartItem.id,
    cartItem.name,
    cartItem.price,
    cartItem.img,
    1
  );

  const newCartItem = cart.find((value) => {
    if (value.id === cartItem.id) {
      return value;
    }
  });

  if (newCartItem) {
    newCartItem.quantity++;
  } else {
    cart.push(cartitem);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(cart);
}

// display cart
function displayCart(cart) {
  let showCart = cart.reduce((result, value) => {
    let product = new Cartitem(
      value.id,
      value.name,
      value.price,
      value.img,
      value.quantity
    );

    return (
      result +
      `
      
       <tr class="cart_item">
        <td><img src="${product.img}" width="100px" height="100%" /></td>
        <td>${product.name}</td>
        <td>${product.price.toLocaleString()}</td>
        <td>
        <button onclick="descBtn('${product.id}')" class="desc-btn">-</button>
        <span id="count">${product.quantity}</span>
        <button onclick="inscBtn('${product.id}')" class="insc-btn">+</button>
        </td>
        <td id="remove">
         <i onclick="removeCart('${
           product.id
         }')" id="recycle" class="fa-solid fa-trash"></i>
        </td>
       </tr>
      
      
      `
    );
  }, "");

  let subTotal = calcSubTotal(cart);
  let quantity = getEl("#quantity");
  let total = getEl("#total");
  quantity.innerHTML = cartCount(cart);
  total.innerText = subTotal.toLocaleString() + " VND";
  getEl("#cart-item-list").innerHTML = showCart;
}

// change quantity function
// +
function inscBtn(productId) {
  const newCartItem = cart.find((value) => {
    if (value.id === productId) {
      return value;
    }
  });
  if (newCartItem) {
    newCartItem.quantity++;
  }
  displayCart(cart);

  localStorage.setItem("cart", JSON.stringify(cart));
}
//-
function descBtn(productId) {
  const newCartItem = cart.find((value) => {
    if (value.id === productId) {
      return value;
    }
  });
  if (newCartItem.quantity === 1) {
    cart = cart.filter((value) => {
      return value.id !== productId;
    });
  } else {
    newCartItem.quantity--;
  }
  console.log(newCartItem);
  displayCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

//remove cart function
function removeCart(productId) {
  Swal.fire({
    title: "Remove, are you sure?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((willDelete) => {
    if (willDelete.isConfirmed) {
      Swal.fire({
        title: "Remove Successfully.",
        icon: "success",
      });
      cart = cart.filter((value) => {
        return value.id != productId;
      });
      displayCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}

//clear cart function
function clearCart() {
  cart = [];
  displayCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

//buy function
function buy() {
  if (cart.length > 0) {
    Swal.fire({
      title: "Thanks For Shopping!!!",
      text: "Have a nice day.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
    cart = [];
  } else {
    Swal.fire({
      title: "Your Cart Is Empty.",
      text: 'Add item to cart and click "Purchase".',
      icon: "error",
    });
  }
  displayCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}
