async function ProductDelete(product, id) {

    const productId = id;
    
    alert(productId);

    const products = {
        productId: productId
    };

    const productJson = JSON.stringify(products);
    const response = await fetch(
            "productDelete",
            {
                method: "POST",
                body: productJson,
                header: {
                    "Content-Type": "application/json"
                }
            }
    );

    if (response.ok) {

        alert("Delete Success");

        window.location.reload(true);

        const json = await response.json();
        
        if (json.status) {
            alert("Delete Success Status");
        } else {
            alert("Delete Error");
        }
    } else {
        alert("Response Error");
    }
}


