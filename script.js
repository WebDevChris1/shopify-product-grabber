let websiteUrl = document.getElementById("website-url");
const getProductsBtn = document.getElementById("get-products-btn");
let output = document.getElementById("output");

getProductsBtn.addEventListener("click", getProducts);

function getProducts() {
  fetch(websiteUrl.value + "products.json")
    .then((res) => res.json())
    .then((data) => {
      websiteUrl.value = "";
      let shopItems = data.products;
      console.log(shopItems[0]);
      let result = `<h1>Products</h1>`;
      shopItems.forEach((product) => {
        result += `<ul id="product-list">
          <li><img src =${product.images[0].src} height="70" width="70"></li> 
          <li>ID: ${product.id}</li>
          <li>Name: ${product.title}</li>

        </ul>`;
      });
      output.innerHTML = result;
      // const productList = document.getElementById("product-list");
      // for (let i = 0; i < shopItems.length; i++) {
      //   productList.innerHTML += `<li>${shopItems.variants[i]}</li>`;
      // }
    });
}

// <li>Name: ${product.variants[0].id}</li>;
