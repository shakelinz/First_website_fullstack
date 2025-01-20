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
const email = document.getElementById("email");
const male = document.getElementById("male");
const female = document.getElementById("female");
const city = document.getElementById("city");
const spinner = document.getElementById("spinner");


async function sighUp(event) {
    event.preventDefault();
    const newUser = new User(username.value, password.value, email.value, male.value, female.value, city.value);
    if(localStorage.getItem("users")) {
        let response = JSON.parse(localStorage.getItem("users"));
        for (let i = 0; i < response.length; i++) {
            if(response[i].username == username.value) {
                alert("That username is already taken");
                window.location.reload();
                return;
            } else if(response[i].email == email.value) {
                alert("That email is already taken");
                window.location.reload();
                return;
            }
        }
        response.push(newUser);
        localStorage.setItem("users", JSON.stringify(response));
        spinner.style.display = "block";
        await sleep(1.5);
        alert("A new user saved");
        spinner.style.display = "none";
        window.location.href = "./signIn.html"
    }else {
        spinner.style.display = "block";
        await sleep(1.5);
        alert("The first user!");
        spinner.style.display = "none";
        localStorage.setItem("users", JSON.stringify([newUser]))
        window.location.href = "./signIn.html"
    }
}

