// Grab Elements
let websiteUrl = document.getElementById("website-url");
const getShopProductsBtn = document.getElementById("get-shopify-products-btn");
const getSupProductsBtn = document.getElementById("get-sup-products-btn");
let output = document.getElementById("output");
// Get Product Button Event Listener
getShopProductsBtn.addEventListener("click", getShopProducts);
getSupProductsBtn.addEventListener("click", getSupProducts);

// Get Product Function
function getShopProducts() {
  // Get product.json URL
  fetch(websiteUrl.value + "products.json")
    .then((res) => res.json())
    .then((data) => {
      const shopItems = data.products;
      // Test Product
      // console.log(shopItems[0]);
      let result = `<h1>Products</h1><h2>Website: <a href="${websiteUrl.value}" target="_blank">${websiteUrl.value}</a></h2>`;
      // Get Product Info
      shopItems.forEach((product) => {
        result += `<ul class="product list">
          <li><img src =${product.images[0].src} height="100" width="100"></li> 
          <li>ID: ${product.id}</li>
          <li>Name: ${product.title}</li>
          <li>URL: <a href="${websiteUrl.value}products/${product.handle}" target="_blank">${websiteUrl.value}products/${product.handle}</a></li>
        </ul>
        <h3>Sizes:</h3>
        `;
        // Get Sizes
        for (let i = 0; i < product.variants.length; i++) {
          let availability = "";
          if (product.variants[i].available === false) {
            availability = `<p>Price: $${product.variants[i].price}<p class= "oos">OOS</p>`;
          } else {
            availability = `<p>Price: $${product.variants[i].price}<p class="in-stock">In Stock</p></p>`;
          }
          result += `
          <ul class="product sizes">
            <li><a target="_blank" href="${websiteUrl.value}/cart/${product.variants[i].id}:1">${product.variants[i].title}</a> - ${product.variants[i].id} ${availability}</li>
          </ul>`;
        }
      });
      // Append to Output Div
      output.innerHTML = result;
      websiteUrl.value = "";
    })
    // Catch Error
    .catch(() =>
      alert(`Please Check your URL and Try Again (ex: https://www.kith.com/)`)
    );
}

function getSupProducts() {
  fetch("https://www.supremenewyork.com/mobile_stock.json")
    .then((res) => res.json())
    .then((data) => {
      let shopCategories = data.products_and_categories; // selects all catagories
      console.log(shopCategories);
    });
}
