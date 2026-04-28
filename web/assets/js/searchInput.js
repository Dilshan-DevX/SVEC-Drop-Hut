async function searchInput() {



    const shin = document.getElementById("searchInput").value;
     console.log(shin);
     
//    const search = {
//        searchInput: searchInput
//    };
//
//    const searchJson = JSON.stringify(search);
//    const response = await fetch(
//            "searchInput",
//            {method: "POST",
//                body: searchJson,
//                hearder: {
//                    "Content-Type": "application/json"
//                }
//            }
//    );
//    
//    if (response.ok) {
//        const json = await response.json();
//        if (json.status) {
//            loadNewArrivals(json);
//        } else {
//            alert("Not Available Products!!")
//        }
//    } else {
//        document.getElementById("message").innerHTML = "SignIn failed. Please try again";
//    }
}


function loadNewArrivals(json) {
    const new_arrival_product_container = document.getElementById("new-arrival-product-container");
    new_arrival_product_container.innerHTML = "";
    json.productList.forEach(item => {
        let product_card = `<div class="col-xl-3 col-lg-4 col-sm-6 col-12 mb--30">
<div class="product product-10 text-center">
                                        <figure class="product-media">
                                            <a href="single-product.html?id=${item.id}">
                                                <img src="product-images\\${item.id}\\image1.png" alt="Product image" class="product-image">
                                                <img src="product-images\\${item.id}\\image2.png" alt="Product image" class="product-image-hover">
                                            </a>

                                            <div class="product-action-vertical">
                                                <a href="single-product.html?id=${item.id}" class="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                            </div>
                                        </figure>

                                        <div class="product-body">

                                            <div class="product-action">
                                                <a href="#" class="btn-cart" onclick="addToCart(${item.id},1);"><span>add to cart</span></a>
                                                <a href="#" class="btn-product-icon btn-wishlist"><span>Add to Wishlist</span></a>
                                            </div>
                                            <div class="product-intro">
                                                <h3 class="product-title">
                                                    <a href="single-product.html">${item.title}</a>
                                                </h3>
                                                <div class="product-price">
                                                    Rs. ${new Intl.NumberFormat(
                "en-US",
                {minimumFractionDigits: 2})
                .format(item.price)}
                                                </div>
                                            </div>
                                            <div class="product-detail">
                                                <div class="ratings-container">
                                                    <div class="ratings">
                                                        <div class="ratings-val" style="width: 60%;"></div>
                                                    </div> 
                                                    <span class="ratings-text">( 6 Reviews )</span>
                                                </div>                                            
                                            </div>
                                        </div>
                                    </div>
</div>`;
        new_arrival_product_container.innerHTML += product_card;
    });
}