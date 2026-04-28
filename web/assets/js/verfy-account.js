async function verifyAccount() {
    const verificationCode = document.getElementById("verificationCode").value;

    const verifyCode = {
        verificationCode: verificationCode
    };
    const verifyCodeJSON = JSON.stringify(verifyCode);

    const response = await fetch("verifyAccount",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: verifyCodeJSON
            });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            window.location = "index.html";
            window.location.reload();
        } else {
            if (json.message === "1") { // Email not found
                window.location = "sign-in.html";
            } else {
                document.getElementById("message").innerHTML = json.message;
            }
        }
    } else {
        document.getElementById("message").innerHTML = "Verification failed! Please try again";
    }
}


