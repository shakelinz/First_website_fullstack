
const sleep = (time)=> new Promise((resolve) => setTimeout(resolve, 1000*time))
class User {
    constructor(username, password, email, male, female, city) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.male = male;
        this.female = female;
        this.city = city;
    }
}

const username = document.getElementById("username");
const password = document.getElementById("password");
async function logUser(event) {
    event.preventDefault();
    if(localStorage.getItem("users")) {
        let response = JSON.parse(localStorage.getItem("users"));
        for (let i = 0; i < response.length; i++) {
            const curr = response[i];
            if(curr.username == username.value) {
                if(curr.password == password.value) {
                    localStorage.setItem("currentUser", JSON.stringify(curr));
                    spinner.style.display = "block";
                    await sleep(0.5);
                    alert("logged in successfully");
                    spinner.style.display = "none";
                    window.location.href = "./home.html"
                    return;
                } else {
                    alert("wrong password");
                    window.location.reload();
                    return;
                }
            }
        }
        alert("There is no such username");        
        window.location.reload();
    } else {
        alert("There is no such username");
        window.location.reload();
        return;
    }
}
