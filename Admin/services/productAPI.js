function apiGetProducts(searchInput, productPrice) {
  return axios({
    url: "https://64a6ad34096b3f0fcc80447c.mockapi.io/Products",
    method: "GET",
    params: {
      name: searchInput,
      price: productPrice,
    },
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://64a6ad34096b3f0fcc80447c.mockapi.io/Products/${productId}`,
    method: "GET",
  });
}

function apiCreateProduct(product) {
  return axios({
    url: "https://64a6ad34096b3f0fcc80447c.mockapi.io/Products",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64a6ad34096b3f0fcc80447c.mockapi.io/Products/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://64a6ad34096b3f0fcc80447c.mockapi.io/Products/${productId}`,
    method: "DELETE",
  });
}
