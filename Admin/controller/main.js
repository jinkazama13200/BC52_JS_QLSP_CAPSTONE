let editedProduct = {};
// Utils
function getEl(n) {
  return document.querySelector(n);
}

getProducts();

let isSubmitted = false;

function getProducts() {
  apiGetProducts()
    .then((response) => {
      let product = response.data;
      editedProduct = product;
      display(editedProduct);
    })
    .catch((error) => {
      console.log(error);
    });
}

// add product function
function addProduct() {
  // DOM
  isSubmitted = true;
  let product = {
    name: getEl("#name").value,
    price: getEl("#price").value,
    screen: getEl("#screen").value,
    backCamera: getEl("#backCamera").value,
    frontCamera: getEl("#frontCamera").value,
    img: getEl("#image").value,
    desc: getEl("#mota").value,
    type: getEl("#hangSP").value,
  };
  let isValid = validate(product);
  if (!isValid) return;

  apiCreateProduct(product)
    .then(() => {
      $("#myModal").modal("hide");
      resetForm();
      Swal.fire({
        width: 400,
        icon: "success",
        title: "Create Successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      return getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

// update product function
function updateProduct() {
  isSubmitted = true;
  // DOM
  let product = {
    name: getEl("#name").value,
    price: getEl("#price").value,
    screen: getEl("#screen").value,
    backCamera: getEl("#backCamera").value,
    frontCamera: getEl("#frontCamera").value,
    img: getEl("#image").value,
    desc: getEl("#mota").value,
    type: getEl("#hangSP").value,
  };
  let isValid = validate(product);
  if (!isValid) return;

  apiUpdateProduct(editedProduct.id, product)
    .then(() => {
      Swal.fire({
        width: 400,
        icon: "success",
        title: "Update Successfully.",
        showConfirmButton: false,
        timer: 2000,
      });
      $("#myModal").modal("hide");
      resetForm();

      return getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

// edit product function
function editProduct(productId) {
  $("#myModal").modal("show");
  // thay đổi nd modal
  getEl("#header-title").innerHTML = "Cập nhật sản phẩm";
  getEl("#btnThemSP").style.display = "none";
  getEl("#btnCapNhat").style.display = "block";
  apiGetProductById(productId)
    .then((response) => {
      let product = response.data;
      editedProduct = product;
      getEl("#name").value = product.name;
      getEl("#price").value = product.price;
      getEl("#screen").value = product.screen;
      getEl("#backCamera").value = product.backCamera;
      getEl("#frontCamera").value = product.frontCamera;
      getEl("#image").value = product.img;
      getEl("#mota").value = product.desc;
      getEl("#hangSP").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

// remove product function
function removeProduct(productId) {
  Swal.fire({
    icon: "warning",
    title: "Are you sure want to delete?",
    confirmButtonText: "Yes",
    showCancelButton: true,
  }).then((willDelete) => {
    if (willDelete.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Deleted.",
        showConfirmButton: false,
        timer: 2000,
      });
      apiDeleteProduct(productId)
        .then(() => {
          return getProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}

// display products
function display(products) {
  let output = products.reduce((result, value, index) => {
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
      `<tr>
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price.toLocaleString()}</td>
      <td><img src="${product.img}" width="100px" height="100%"/></td>
      <td>${product.desc}</td>
      <td>
      <button class="btn btn-primary" onclick="editProduct('${
        product.id
      }')">Chỉnh sửa</button>
      <button class="btn btn-danger" onclick="removeProduct('${
        product.id
      }')">Xóa</button>
      </td>
      </tr>`
    );
  }, "");
  document.getElementById("tableDanhSach").innerHTML = output;
}

// resetform
function resetForm() {
  isSubmitted = false;
  getEl("#name").value = "";
  getEl("#price").value = "";
  getEl("#screen").value = "";
  getEl("#backCamera").value = "";
  getEl("#frontCamera").value = "";
  getEl("#image").value = "";
  getEl("#mota").value = "";
  getEl("#hangSP").value = "";

  getEl("#tbName").innerHTML = "";
  getEl("#tbGia").innerHTML = "";
  getEl("#tbScreen").innerHTML = "";
  getEl("#tbbackCamera").innerHTML = "";
  getEl("#tbfrontCamera").innerHTML = "";
  getEl("#tbImg").innerHTML = "";
  getEl("#tbMota").innerHTML = "";
  getEl("#tbType").innerHTML = "";
}

// check chuỗi rỗng
function isRequired(value) {
  if (!value.trim()) {
    // check chuoi rong
    return false;
  } else {
    return true;
  }
}

// check number
function isNumber(value) {
  if (isNaN(value)) {
    return false;
  }
  return true;
}

// check product name if already created before
function checkName(value) {
  for (let i = 0; i < editedProduct.length; i++) {
    if (editedProduct[i].name === value) {
      return false;
    }
  }
  return true;
}

// validation
function validate(input) {
  let isValid = true;
  if (!isRequired(input.name)) {
    isValid = false;
    getEl("#tbName").innerHTML = "(*)Empty";
    getEl("#tbName").style.display = "block";
  } else if (!checkName(input.name)) {
    isValid = false;
    getEl("#tbName").innerHTML = "(*)This product name is already created.";
    getEl("#tbName").style.display = "block";
  }
  if (!isRequired(input.price)) {
    isValid = false;
    getEl("#tbGia").innerHTML = "(*)Empty";
    getEl("#tbGia").style.display = "block";
  } else if (!isNumber(+input.price)) {
    isValid = false;
    getEl("#tbGia").innerHTML = "(*)Must be a Number.";
    getEl("#tbGia").style.display = "block";
  }
  if (!isRequired(input.screen)) {
    isValid = false;
    getEl("#tbScreen").innerHTML = "(*)Empty";
    getEl("#tbScreen").style.display = "block";
  }
  if (!isRequired(input.backCamera)) {
    isValid = false;
    getEl("#tbbackCamera").innerHTML = "(*)Empty";
    getEl("#tbbackCamera").style.display = "block";
  }
  if (!isRequired(input.frontCamera)) {
    isValid = false;
    getEl("#tbfrontCamera").innerHTML = "(*)Empty";
    getEl("#tbfrontCamera").style.display = "block";
  }
  if (!isRequired(input.img)) {
    isValid = false;
    getEl("#tbImg").innerHTML = "(*)Empty";
    getEl("#tbImg").style.display = "block";
  }
  if (!isRequired(input.desc)) {
    isValid = false;
    getEl("#tbMota").innerHTML = "(*)Empty";
    getEl("#tbMota").style.display = "block";
  }
  if (!isRequired(input.type)) {
    isValid = false;
    getEl("#tbType").innerHTML = "(*)Empty";
    getEl("#tbType").style.display = "block";
  }

  return isValid;
}

getEl("#btnThem").onclick = function () {
  getEl("#header-title").innerHTML = "Thêm sản phẩm";
  getEl("#btnThemSP").style.display = "block";
  getEl("#btnCapNhat").style.display = "none";
};

getEl("#btnDong").onclick = () => {
  resetForm();
};

// oninput
getEl("#name").oninput = (event) => {
  if (!isSubmitted) return;
  if (event.target.value) {
    getEl("#tbName").innerHTML = "";
    getEl("#tbName").style.display = "block";
  } else {
    getEl("#tbName").innerHTML = "(*)Empty";
  }
};
getEl("#price").oninput = (event) => {
  if (!isSubmitted) return;
  if (event.target.value) {
    getEl("#tbGia").innerHTML = "";
    getEl("#tbGia").style.display = "block";
  } else {
    getEl("#tbGia").innerHTML = "(*)Empty";
  }
};
getEl("#screen").oninput = (event) => {
  if (!isSubmitted) return;
  if (event.target.value) {
    getEl("#tbScreen").innerHTML = "";
    getEl("#tbScreen").style.display = "block";
  } else {
    getEl("#tbScreen").innerHTML = "(*)Empty";
  }
};
getEl("#backCamera").oninput = (event) => {
  if (!isSubmitted) return;
  if (event.target.value) {
    getEl("#tbbackCamera").innerHTML = "";
    getEl("#tbbackCamera").style.display = "block";
  } else {
    getEl("#tbbackCamera").innerHTML = "(*)Empty";
  }
};
getEl("#frontCamera").oninput = (event) => {
  if (!isSubmitted) return;
  if (event.target.value) {
    getEl("#tbfrontCamera").innerHTML = "";
    getEl("#tbfrontCamera").style.display = "block";
  } else {
    getEl("#tbfrontCamera").innerHTML = "(*)Empty";
  }
};
getEl("#image").oninput = (event) => {
  if (!isSubmitted) return;
  if (event.target.value) {
    getEl("#tbImg").innerHTML = "";
    getEl("#tbImg").style.display = "block";
  } else {
    getEl("#tbImg").innerHTML = "(*)Empty";
  }
};
getEl("#mota").oninput = (event) => {
  if (!isSubmitted) return;
  if (event.target.value) {
    getEl("#tbMota").innerHTML = "";
    getEl("#tbMota").style.display = "block";
  } else {
    getEl("#tbMota").innerHTML = "(*)Empty";
  }
};
getEl("#hangSP").oninput = (event) => {
  if (!isSubmitted) return;
  if (event.target.value) {
    getEl("#tbType").innerHTML = "";
    getEl("#tbType").style.display = "block";
  } else {
    getEl("#tbType").innerHTML = "(*)Empty";
  }
};
// ------------------------------------------------

// search using onkeypress or onkeydown function
getEl("#search").onkeydown = (event) => {
  if (event.key !== "Enter") return;

  apiGetProducts(event.target.value)
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// search using onclick function
function searchProd() {
  let search = getEl("#search").value;
  search = search.trim().toLowerCase();

  apiGetProducts(search)
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function orderBy() {
  let tmpArray = editedProduct;
  let tmp = {};

  for (let i = 0; i < tmpArray.length; i++) {
    for (let j = i + 1; j < tmpArray.length; j++) {
      if (parseInt(tmpArray[i].price) < parseInt(tmpArray[j].price)) {
        tmp = tmpArray[i];
        tmpArray[i] = tmpArray[j];
        tmpArray[j] = tmp;
      }
    }
  }
  editedProduct = tmpArray;
  getEl("#SapXepTang").style.display = "none";
  getEl("#SapXepGiam").style.display = "block";

  display(editedProduct);
}

function orderByDesc() {
  let tmpArray = editedProduct;
  let tmp = {};

  for (let i = 0; i < tmpArray.length; i++) {
    for (let j = i + 1; j < tmpArray.length; j++) {
      if (parseInt(tmpArray[j].price) < parseInt(tmpArray[i].price)) {
        tmp = tmpArray[j];
        tmpArray[j] = tmpArray[i];
        tmpArray[i] = tmp;
      }
    }
  }
  editedProduct = tmpArray;
  getEl("#SapXepGiam").style.display = "none";
  getEl("#SapXepTang").style.display = "block";

  display(editedProduct);
}
