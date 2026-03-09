document.getElementById("login-btn").addEventListener("click", function(){
    const nameInput = document.getElementById("input-name");
    const userName = nameInput.value;

    const passInput = document.getElementById("input-pass");
    const pass = passInput.value;

    if(userName == "admin" && pass == "admin123"){
        alert("login Success");
        window.location.assign("/homepage.html")
    }
    else{
        alert("login Failed");
        return;
    }
});