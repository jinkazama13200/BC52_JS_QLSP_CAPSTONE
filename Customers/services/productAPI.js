function apiGetProducts() {
  return axios({
    url: "https://64a6ad34096b3f0fcc80447c.mockapi.io/Products",
    method: "GET",
  });
}
