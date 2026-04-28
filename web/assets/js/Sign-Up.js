async function signUp() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;
    
    console.log(name);
    console.log(email);
    console.log(mobile);
    console.log(password);

    const user = {
    name:name,
    email:email,
    mobile:mobile,
    password:password
};


    const userJson = JSON.stringify(user);
    
    const response = await fetch(
            "SignUp",
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
            window.location = "verifyAcc.html";
        }else{// when status false
          document.getElementById("message").innerHTML= json.message;
        }
     }else{
       document.getElementById("message").innerHTML="Registration failed. Please try again";
     }

}
