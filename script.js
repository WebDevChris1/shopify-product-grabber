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
        let id = product.id;
        let title = product.title;
        let handle = product.handle;
        let image = product.images[0].src;
        let url = websiteUrl.value;
        result += `<ul class="product list">
          <li><img src =${image} height="100" width="100"></li> 
          <li>ID: ${id}</li>
          <li>Name: ${title}</li>
          <li>URL: <a href="${url}products/${handle}" target="_blank">${url}products/${handle}</a></li>
        </ul>
        <h3>Sizes:</h3>
        `;
        // Get Sizes
        for (let i = 0; i < product.variants.length; i++) {
          let availability = "";
          let variantPrice = product.variants[i].price;
          let variantId = product.variants[i].id;
          let variantTitle = product.variants[i].title;
          let variantAvailability = product.variants[i].available;
          if (variantAvailability === false) {
            availability = `<p>Price: $${variantPrice}<p class= "oos">OOS</p>`;
          } else {
            availability = `<p>Price: $${variantPrice}<p class="in-stock">In Stock</p></p>`;
          }
          // Check for One Size
          if (variantTitle === "Default Title") {
            variantTitle = "OS";
            result += `
          <ul class="product sizes">
            <li><a target="_blank" href="${url}/cart/${variantId}:1">${variantTitle}</a> - ${variantId} ${availability}</li>
          </ul>`;
          } else {
            result += `
          <ul class="product sizes">
            <li><a target="_blank" href="${url}/cart/${variantId}:1">${variantTitle}</a> - ${variantId} ${availability}</li>
          </ul>`;
          }
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
  alert("Supreme Product Grabber Still in Production");
  fetch("https://www.supremenewyork.com/mobile_stock.json")
    .then((res) => res.json())
    .then((data) => {
      let shopCategories = data.products_and_categories; // selects all catagories
      console.log(shopCategories);
      let result = `<h1>Products</h1><h2>Website: <a href="https://www.supremenewyork.com/" target="_blank">https://www.supremenewyork.com/</a></h2>`;
      shopCategories["T-Shirts"].forEach((product) => {
        result += `
        <ul>
          <li><img src="https:${product.image_url_hi}" height="100" width="100"></li>
          <li>Name: ${product.name}</li>
          <li>Price: $${product.price}</li>
          <li>Category: ${product.category_name}</li>
          <li>ID: ${product.id}</li>
          <li>New Item: ${product.new_item}</li>
        </ul>`;
      });

      output.innerHTML = result;
    });
}
