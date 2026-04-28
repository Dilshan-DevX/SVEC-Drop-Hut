async function loadUserDashboard() {
    const response = await fetch("loadUserTable");

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            const user_container = document.getElementById("userContainer");
            user_container.innerHTML = "";

            json.userList.forEach(user => {
                let tableData = `
                              
                                 
                                    <tbody>
                                    <tr>
                                        <th scope="row">${user.id}</th>
                                        <td>${user.name}</td>
                                        <td>${user.email}</td>
                                        <td>${user.mobile}</td>
                                        <td><button class="btn btn-danger" onclick="userDelete(null, ${user.id});">Remove</button></td>
                                
                                    </tr>
                                   
                                    </tbody>
                                `;
                user_container.innerHTML += tableData;
            });
        } else {
            alert("status not ok");
        }
    } else {
        alert("response not ok");
    }
}



async function loadProductDashboard() {
    const response = await fetch("loadProductTable");

    if (response.ok) {
        const json = await response.json();
        console.log(json);
        if (json.status) {
            const product_container = document.getElementById("userContainer");
            product_container.innerHTML = "";

            json.productList.forEach(product => {
                let tableData = `
                                    <tr>
                                        <th scope="row">${product.id}</th>
                                        <td>${product.title}</td>
                                        <td>Rs :${product.price}</td>
                                        <td>${product.qty}</td>
                                        <td>${product.created_at}</td>
                                        <td><button class="btn btn-danger" onclick="ProductDelete(null,${product.id});">Remove </button></td>
                                
                                    </tr>
`;
                product_container.innerHTML += tableData;
            });
        } else {
            alert("status not ok");
        }
    } else {
        alert("response not ok");
    }
}