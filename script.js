// ===== DISCORD BUTTON =====

const discord = document.getElementById("discord")

if(discord){
discord.onclick = () => {
window.open("https://discord.gg/7k39BFYzSn")
}
}


// ===== THEME SYSTEM =====

const themeToggle = document.getElementById("themeToggle")

// gespeichertes Theme laden
if(localStorage.getItem("theme") === "light"){
document.body.classList.add("light")
}

if(themeToggle){

themeToggle.onclick = () => {

document.body.classList.toggle("light")

// speichern
if(document.body.classList.contains("light")){
localStorage.setItem("theme","light")
}else{
localStorage.setItem("theme","dark")
}

}

}


// ===== CATEGORY OPEN =====

function openCategory(cat){
window.location = "category.html?cat=" + cat
}


// ===== PRODUCTS LOADER =====

async function loadProducts(){

const params = new URLSearchParams(window.location.search)
const cat = params.get("cat")

if(!cat) return

const res = await fetch("products.json")
const data = await res.json()

const container = document.getElementById("products")

data.forEach(p => {

    if(p.category !== cat) return

    const div = document.createElement("div")
    div.className = "product"

    // === Nur klickbar, wenn Kategorie "rblxeh" ===
    if(cat === "rblxeh"){
        div.onclick = () => {
            window.location = `product.html?id=${p.id}`
        }
        div.style.cursor = "pointer" // optional: zeigt Klickbarkeit
    }

    div.innerHTML = `
    <img src="productsimages/${p.image}">
    <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-id">${p.id}</div>
        <div class="product-price">
            ${p.price}${cat === "rblxeh" ? "" : "$"}
        </div>
    </div>
`

    container.appendChild(div)

})
}

loadProducts()