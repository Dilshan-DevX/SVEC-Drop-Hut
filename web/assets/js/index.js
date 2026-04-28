function indexOnloadFunctions() {
    checkSessionCart();
    loadProductData();
}
async function checkSessionCart() {

    const response = await fetch("CheckSessionCart");
    if (!response.ok) {
       alert("Something went wrong! Try again shortly");;
    }
}

async function loadProductData() {


    const response = await fetch("LoadHomeData");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            console.log(json);
//            loadBrands(json);
            loadNewArrivals(json);
        } else {
          
            alert("Something went wrong! Try again shortly");
        }
    } else {   
        alert("Something went wrong! Try again shortly");
    }
}

//function loadBrands(json) {
//    const product_brand_container = document.getElementById("product-brand-container");
//    let product_brand_card = document.getElementById("product-brand-card");
//    product_brand_container.innerHTML = "";
//    let card_delay = 200;
//    json.brandList.forEach(item => {
//        let product_brand_card_clone = product_brand_card.cloneNode(true);
//        product_brand_card_clone.querySelector("#product-brand-mini-card")
//                .setAttribute("data-sal", "zoom-out");
//        product_brand_card_clone.querySelector("#product-brand-mini-card")
//                .setAttribute("data-sal-delay", String(card_delay));
//        product_brand_card_clone.querySelector("#product-brand-a")
//                .href = "search.html";
//        product_brand_card_clone.querySelector("#product-brand-title")
//                .innerHTML = item.name;
//        product_brand_container.appendChild(product_brand_card_clone);
//        card_delay += 100;
//        sal();
//    });
//}

function loadNewArrivals(json) {
    const new_arrival_product_container = document.getElementById("new-arrival-product-container");
    new_arrival_product_container.innerHTML = "";

    json.productList.forEach(item => {
        let product_card = `<div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="single-tranding">
                        <a href="product-details.html?id=${item.id}">
                            <div class="tranding-pro-img">
                                <img style="height: 400px;" src="product-images\\${item.id}\\image1.png" alt="">
                            </div>
                            <div class="tranding-pro-title">
                                <h3><a href="#">${item.title}</a></h3>
                                <h4>Drone</h4>
                            </div>
                            <div class="tranding-pro-price">
                                <div class="price_box">
                                    <span class="current_price">Rs. ${new Intl.NumberFormat(
                "en-US",
                {minimumFractionDigits: 2})
                .format(item.price)}</span>
                                    <span class="old_price">$80.00</span>
                                </div>
                                <div class="d-grid gap-2 ">
                                    <a href="product-details.html?id=${item.id}"><button class="btn btn-primary col-12 mb-2" type="button" data-bs-toggle="modal">Quick View</button></a> 
                                    <a href="product-details.html?id=${item.id}"><button class="btn btn-outline-secondary col-12" type="button" href="product-details.html?id=${item.id}">Add to Cart</button></a>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`;
        new_arrival_product_container.innerHTML += product_card;
    });
}

async function addToCart(productId, qty) {

    const response = await fetch("AddToCart?prId=" + productId + "&qty=" + qty);
    if (response.ok) {
        const json = await response.json(); // await response.text();
        if (json.status) {
//            alert(json.message);
            alert("Success");
        } else {
            alert("Something went wrong! Try again shortly");

        }
    } else {
        alert("Something went wrong! Try again shortly");
    }
}

