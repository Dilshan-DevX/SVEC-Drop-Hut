async function loadCartItems() {
    
    const response = await fetch("LoadCartItems");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            const cart_item_container = document.getElementById("cart-item-container");
            cart_item_container.innerHTML = "";

            let total = 0;
            let totalQty = 0;
            json.cartItems.forEach(cart => {
                let productSubTotal = cart.product.price * cart.qty;
                total += productSubTotal;
                totalQty += cart.qty;
                let tableData = `<tr>
                                    <td class="product_thumb"><a href="#"><img src="product-images\\${cart.product.id}\\image1.png" alt=""></a></td>
                                    <td class="product_name"><a href="#">${cart.product.title}</a></td>
                                    <td class="product-price">${new Intl.NumberFormat("en-US",{minimumFractionDigits: 2}).format(cart.product.price)}</td>
                                                      
                                    <td class="product_quantity"><label>Quantity</label> <input min="1" max="100" value="${cart.qty}" type="number"></td>
                                    <td class="product_total"><span class="currency-symbol">Rs. </span>
                                        <span>${new Intl.NumberFormat("en-US",{minimumFractionDigits: 2}).format(productSubTotal)}</span>
                                    </td>             
				    <td class="product_remove"><a href="#"><i onclick="removeCartItem(${cart.product.id});" class="ion-android-close"></i></a></td>
                                </tr>`;
                cart_item_container.innerHTML += tableData;
            });
            document.getElementById("order-total-quantity").innerHTML = totalQty;
            document.getElementById("order-total-amount").innerHTML = new Intl.NumberFormat("en-US",
                    {minimumFractionDigits: 2})
                    .format(total);
            document.getElementById("order-total-amount2").innerHTML = new Intl.NumberFormat("en-US",
                    {minimumFractionDigits: 2})
                    .format(total);
        } else {
//            popup.error({
//                message: json.message
//            });
                        alert("Something went wrong! Please SignIn shortly");
        }
    } else {
//        popup.error({
//            message: "Cart Items loading failed..."
//        });
        
        alert("Cart Items loading failed...");
    }
}

// Remove from cart  

async function removeCartItem(product_id) {
    
//    alert(product_id);

    const pid = product_id;
       
    console.log(pid);
 
    const product = {
       pid:pid
    };
      
    const userJson = JSON.stringify(product);
    
    const response = await fetch(
            "RemoveCartItem",
            {
                method: "POST",
                body: userJson,
                header:{
                    "Content-Type": "application/json"
                }
            }
            );
    
     if(response.ok){ // success
        const json = await response.json();
        if(json.status){ // if true
            window.location.reload();
        }else{// when status false
//          document.getElementById("message").innerHTML= json.message;
        }
     }else{
        alert("Removeing failed. Please try again");
     }
}
