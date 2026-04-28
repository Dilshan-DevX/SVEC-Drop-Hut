
//window.onload = function () {
//    alert("OK");
//}



function loadData() {
    getUserData();
    getCityData();
}

async function getUserData() {
    const response = await fetch("MyAccount");
    if (response.ok) {
        const json = await response.json();
        
//        console.log(json);
        
        document.getElementById("username").innerHTML = `Hello ${json.name}`;
        document.getElementById("since").innerHTML = `DropHut Member Since ${json.since}`;
        document.getElementById("name").value = json.name;
        document.getElementById("mobile").value = json.mobile;
        document.getElementById("email").value = json.email;
        document.getElementById("cpw").value = json.password;

        if (json.hasOwnProperty("addressList") && json.addressList !== undefined) {
            let email;
            let lineOne;
            let lineTwo;
            let city;
            let postalCode;
            let cityId;
            const addressUL = document.getElementById("addressUL");
            json.addressList.forEach(address => {
                email = address.user.email;
                lineOne = address.lineOne;
                lineTwo = address.lineTwo;
                city = address.city.name;
                postalCode = address.postalCode;
                cityId = address.city.id;
                const line = document.createElement("li");
                line.innerHTML = lineOne + ",<br/>" +
                        lineTwo + ",<br/>" +
                        city + "<br/>" +
                        postalCode;
                addressUL.appendChild(line);
            });
            document.getElementById("addName").innerHTML = `Name: ${json.name}`;
            document.getElementById("addEmail").innerHTML = `Email: ${email}`;
            document.getElementById("contact").innerHTML = `Phone: 011-2215453`;

            document.getElementById("l1").value = lineOne;
            document.getElementById("l2").value = lineTwo;
            document.getElementById("pcode").value = postalCode;
            document.getElementById("citySelect").value = parseInt(cityId);
        }
    }

}

async function getCityData() {
    const response = await fetch("CityData");
    if (response.ok) {
        const json = await response.json();
//        console.log(json);
        const citySelect = document.getElementById("citySelect");
        json.forEach(city => {
            let option = document.createElement("option");
            option.innerHTML = city.name;
            option.value = city.id;
            citySelect.appendChild(option);
        });

    }
}

async function saveChanges() {

    

    const Name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
//    const email = document.getElementById("email").value;
    const l1 = document.getElementById("l1").value;
    const l2 = document.getElementById("l2").value;
    const pcode = document.getElementById("pcode").value;
    const cityId = document.getElementById("citySelect").value;
    const currentPassword = document.getElementById("cpw").value;
    const newPassword = document.getElementById("npw").value;
    const confirmPassword = document.getElementById("conpw").value;

    const userDataObject = {
        name: Name,
        mobile: mobile,
        l1: l1,
        l2: l2,
        pcode: pcode,
        cityId: cityId,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    };

    const userDataJSON = JSON.stringify(userDataObject);

    const response = await fetch("MyAccount", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: userDataJSON
    });
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            getUserData();
        } else {
            document.getElementById("message").innerHTML = json.message;
        }
    } else {
        document.getElementById("message").innerHTML = "Profile details update failed!";
    }
}

function Reset() {
    
    alert("Your typed data has been reset and removed !");
    window.location.reload();
}

