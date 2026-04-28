async function userDelete(users, id) {

    const userId = id;

    const user = {
        userId: userId
    };

    const userJson = JSON.stringify(user);
    const response = await fetch(
            "userDelete",
            {
                method: "POST",
                body: userJson,
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


