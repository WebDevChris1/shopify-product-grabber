let websiteUrl = document.getElementById("website-url");
const getProductsBtn = document.getElementById("get-products-btn");
let output = document.getElementById("output");
getProductsBtn.addEventListener("click", getProducts);

function getProducts() {
  fetch(websiteUrl.value + "products.json")
    .then((res) => res.json())
    .then((data) => {
      let shopItems = data.products;
      console.log(shopItems[0]);
      let result = `<h1>Products</h1><h2>Website: <a href="${websiteUrl.value}" target="_blank">${websiteUrl.value}</a></h2>`;
      shopItems.forEach((product) => {
        result += `<ul class="product list">
          <li><img src =${product.images[0].src} height="100" width="100"></li> 
          <li>ID: ${product.id}</li>
          <li>Name: ${product.title}</li>  
        </ul>
        <h3>Sizes:</h3>
        `;
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
      output.innerHTML = result;
      websiteUrl.value = "";
    })
    .catch(() =>
      alert(`Please Check your URL and Try Again (ex: https//www.kith.com/)`)
    );
}
