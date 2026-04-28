async function loadData() {    
//    console.log("ok");
    
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("id")) {
        const productId = searchParams.get("id");
        console.log(productId);
        const response = await fetch("LoadSingleProduct?id=" + productId);
        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                console.log(json);
                //single-product-images
                document.getElementById("image1").src = "product-images\\" + json.product.id + "\\image1.png";
                document.getElementById("image2").src = "product-images\\" + json.product.id + "\\image2.png";
//                document.getElementById("image3").src = "product-images\\" + json.product.id + "\\image1.png";
                
                //single-product-images-end

                document.getElementById("product-title").innerHTML = json.product.title;
                document.getElementById("published-on").innerHTML = json.product.created_at;
                document.getElementById("product-price").innerHTML ="Rs. "+ new Intl.NumberFormat(
                        "en-US",
                        {minimumFractionDigits: 2})
                        .format(json.product.price);
                document.getElementById("brand-name").innerHTML = json.product.model.brand.name;
                document.getElementById("model-name").innerHTML = json.product.model.name;
                document.getElementById("product-quality").innerHTML = json.product.quality.value;
                document.getElementById("product-stock").innerHTML = json.product.qty;
                
                //product-description
                document.getElementById("description").innerHTML = json.product.description;
                document.getElementById("description2").innerHTML = json.product.description;
//                document.getElementById("specification").innerHTML = json.product.Specification;

                // product-color
                document.getElementById("color-border").innerHTML = json.product.color.value;
//                document.getElementById("color-background").style.backgroundColor = json.product.color.value;

                //product-storage
                document.getElementById("product-storage").innerHTML = json.product.camara.value;
                

                //add-to-cart-main-button
                const addToCartMain = document.getElementById("add-to-cart-main");
                addToCartMain.addEventListener(
                        "click", (e) => {
                    addToCart(json.product.id, document.getElementById("add-to-cart-qty").value);
                    e.preventDefault();
                });
                


//                
            } else {
                window.location = "index.html";
                console.log(json);
            }
        } else {
            window.location = "index.html";
                console.log(json);
        }
    }
    }

async function addToCart(productId, qty) {
       
    const popup = new Notification();// link notification js in single-product.html
    const response = await fetch("AddToCart?prId=" + productId + "&qty=" + qty);
    if (response.ok) {
        const json = await response.json(); // await response.text();
        if (json.status) {
            
            document.getElementById("message2").innerHTML= "";
            document.getElementById("message3").innerHTML= json.message;
           
        } else {
            document.getElementById("message3").innerHTML= "";
            document.getElementById("message2").innerHTML= json.message;

        }
    } else {
            document.getElementById("message3").innerHTML= "";
            document.getElementById("message2").innerHTML= json.message;
    }
}


