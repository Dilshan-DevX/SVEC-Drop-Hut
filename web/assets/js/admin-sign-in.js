async function signIn(){
    
//    alert("ok");
    
    const email = "Adminx@gmail.com";
    const password = "Dil@2003";
    
    const signInObject = {
        email:email,
        password:password
    };
    
    const signInJSON = JSON.stringify(signInObject);
    const response = await fetch("adminSignIn",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:signInJSON
    });
    
    if(response.ok){
        const json = await response.json();
        if(json.status){       
                alert("Sign In successfully!"); 
                window.location="bootstrap-table.html";
//                window.location.reload();           
        }else{
//            document.getElementById("message").innerHTML = ;
            alert(json.message);
        }
    }else{
                
        alert("Sign In Failed! Please try again"); 
    }
}


