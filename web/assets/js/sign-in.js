async function signIn(){
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const signInObject = {
        email:email,
        password:password
    };
    
    const signInJSON = JSON.stringify(signInObject);
    const response = await fetch("signin",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:signInJSON
    });
    
    if(response.ok){
        const json = await response.json();
        if(json.status){
            if(json.message==="1"){// ===
                window.location="verifyAcc.html";
            }else{
                Swal.fire({
                    title: "Success",
                    text: json.message,
                    icon: "success"
                });
                window.location="index.html";
                window.location.reload();
            }
        }else{
            document.getElementById("message").innerHTML = json.message;
        }
    }else{
                Swal.fire({
                    title: "Success?",
                    text: "Sign In Failed! Please try again",
                    icon: "info"
                });
        document.getElementById("message").innerHTML = "Sign In Failed! Please try again";
    }
}


