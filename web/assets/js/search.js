async function loadData() {

//    const popup = new Notification();
    const response = await fetch("LoadData");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            loadOptions("brand", json.brandList, "name");
            loadOptions("condition", json.qualityList, "value");
            loadOptions("color", json.colorList, "value");
            loadOptions("storage", json.camaraList, "value");

            updateProductView(json);
        } else {
            alert("Somthing went wrong");
        }
    } else {
          alert("Somthing went wrong");
    }
}

//function loadSelect(selectId, items, property) {
//    const select = document.getElementById(selectId);
//    items.forEach(item => {
//        const option = document.createElement("option");
//        option.value = item.id;
//        option.innerHTML = item[property];
//        select.appendChild(option);
//    });
//}

function loadOptions(prefix, dataList, property) {

//    const select = document.getElementById(prefix + "-options");
////    let li = document.getElementById(prefix + "-li");
////    options.innerHTML = "";
//     
//     dataList.forEach(item => {
//        const option = document.createElement("option");
//        option.value = item.id;
//        option.innerHTML = item[property];
//        select.appendChild(option);
//    });
//     

 const select = document.getElementById(prefix + "-options");

    // Clear existing options
    select.innerHTML = "";

    // Add default "All" option
    const allOption = document.createElement("option");
    allOption.value = 0;  // 0 means no filter
    allOption.innerHTML = "All " + prefix.charAt(0).toUpperCase() + prefix.slice(1);
    select.appendChild(allOption);

    // Add real options
    dataList.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.innerHTML = item[property];
        select.appendChild(option);
    });
}


//async function searchProduct(firstResult) {
////    const popup = new Notification();
////  const brandId = document.getElementById("brand").value;
//
//    const brand_name = document.getElementById("brand-options").value;
//    const condition_name = document.getElementById("condition-options").value;
//    const color_name = document.getElementById("color-options").value;           
//    const camara_value = document.getElementById("storage-options").value;
//            
//    console.log(brand_name);
//    console.log(condition_name);
//    console.log(color_name);
//    console.log(camara_value);
//    
//    
//    const data = {
//        firstResult: firstResult,
//        brandName: brand_name,
//        conditionName: condition_name,
//        colorName: color_name,
//        camaraValue: camara_value
//    };
//
//    const dataJSON = JSON.stringify(data);
//
//    const response = await fetch("SearchProducts",
//            {
//                method: "POST",
//                headers: {
//                    "Content-Type": "application/json"
//                },
//                body: dataJSON
//            });
//
//    if (response.ok) {
//        const json = await response.json();
//        if (json.status) {
//            console.log(json);
//            updateProductView(json);
////            alert("Product Loading Complete...");
//        } else {
//           alert("Somthing went wrong. Please try again later");
//        }
//    } else {
//         alert("Somthing went wrong. Please try again later");
//    }
//}

async function searchProduct(firstResult) {
    const brand_name = document.getElementById("brand-options").value;
    const condition_name = document.getElementById("condition-options").value;
    const color_name = document.getElementById("color-options").value;           
    const camara_value = document.getElementById("storage-options").value;

    
    const searchText = document.getElementById("search-text").value.trim();

    const data = {
        firstResult: firstResult,
        brandName: brand_name,
        conditionName: condition_name,
        colorName: color_name,
        camaraValue: camara_value,
        searchText: searchText  // add text search to request
    };

    const dataJSON = JSON.stringify(data);

    const response = await fetch("SearchProducts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: dataJSON
    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            updateProductView(json);
        } else {
            alert("Something went wrong. Please try again later");
        }
    } else {
        alert("Something went wrong. Please try again later");
    }
}

const st_product = document.getElementById("st-product"); // product card parent node
let st_pagination_button = document.getElementById("st-pagination-button");
let current_page = 0;

function updateProductView(json) {
    const product_container = document.getElementById("st-product-container");
    product_container.innerHTML = "";
    json.productList.forEach(product => {
        let st_product_clone = st_product.cloneNode(true);// enable child nodes cloning / allow child nodes
        st_product_clone.querySelector("#st-product-a-1").href = "product-details.html?id=" + product.id;
        st_product_clone.querySelector("#st-product-img-1").src = "product-images//" + product.id + "//image1.png";
        st_product_clone.querySelector("#st-product-a-2").href = "single-product.html?id=" + product.id;
        st_product_clone.querySelector("#st-product-title-1").innerHTML = product.title;
        st_product_clone.querySelector("#st-product-price-1").innerHTML = new Intl.NumberFormat(
                "en-US",
                {minimumFractionDigits: 2})
                .format(product.price);
        
      //append child
        product_container.appendChild(st_product_clone);
    });

    let st_pagination_container = document.getElementById("st-pagination-container");
    st_pagination_container.innerHTML = "";
    let all_product_count = json.allProductCount;
    let product_per_page =8;
    let pages = Math.ceil(all_product_count / product_per_page); // round upper integer 

    //previous-button
    if (current_page !== 0) {
        let st_pagination_button_prev_clone = st_pagination_button.cloneNode(true);
        st_pagination_button_prev_clone.innerHTML = "Prev";
        st_pagination_button_prev_clone.addEventListener(
                "click", (e) => {
            current_page--;
            searchProduct(current_page * product_per_page);
//            e.preventDefault();            
        });
        st_pagination_container.appendChild(st_pagination_button_prev_clone);
    }
//
//
    // pagination-buttons
    for (let i = 0; i < pages; i++) {
        let st_pagination_button_clone = st_pagination_button.cloneNode(true);
        st_pagination_button_clone.innerHTML = i + 1;
        st_pagination_button_clone.addEventListener(
                "click", (e) => {
            current_page = i;
            searchProduct(i * product_per_page);
//            e.preventDefault();
        });

        if (i === Number(current_page)) {
            st_pagination_button_clone.className = "axil-btn btn btn-primary btn-lg fw-bold ml--10";
        } else {
            st_pagination_button_clone.className = "axil-btn btn btn-outline-secondary btn-lg ml--10";
        }
        st_pagination_container.appendChild(st_pagination_button_clone);
    }

    // next-button
    if (current_page !== (pages - 1)) {
        let st_pagination_button_next_clone = st_pagination_button.cloneNode(true);
        st_pagination_button_next_clone.innerHTML = "Next";
        st_pagination_button_next_clone.addEventListener(
                "click", (e) => {
            current_page++;
            searchProduct(current_page * product_per_page);
//            e.preventDefault();
        });
        st_pagination_container.appendChild(st_pagination_button_next_clone);
    }

}
