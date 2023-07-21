let shoppingCart = {};

getProducts();

function getProducts() {
  apiGetProducts()
    .then((response) => {
      display(response.data);
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
      `<div class="product_item col-4">
        <div class="product_box">
        <div class="card-header">
        <img src="${product.img}" width="200px" height="200px"/>
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
        <button id="cart-btn" class="btn">Add to cart</button>
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
