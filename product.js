async function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if(!id) return;

  const resProducts = await fetch("products.json");
  const products = await resProducts.json();

  const resInfos = await fetch("infos.json");
  const infos = await resInfos.json();

  const product = products.find(p => p.id === id);
  if(!product) return;

  const info = infos[id]; // optional

  const container = document.getElementById("product-detail");
  container.innerHTML = `
    <div class="product-top">
      <img src="${info ? info.picture : `productsimages/${product.image}`}" alt="Extra Image">
      <h2>${product.name}</h2>
      <hr></hr>
    </div>

    <div class="product-bottom">
      <b>Details</b>
      <p>ID: ${product.id}</p>
      <p>Price: ${product.price}</p>
      ${info ? `<p>Username: ${info.username}</p>` : ""}
    </div>
  `;
}

loadProduct();