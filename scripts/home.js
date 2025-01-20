const modal = document.getElementById("modal");
const title = document.getElementById("title");
const body = document.getElementById("body");
const content = document.getElementById("content");
const spinner = document.getElementById("spinner");
const regDet = document.getElementById("reg-nav");
let homeTitle = document.getElementById("homeTitle");
const postsEle = document.getElementById("posts-to-show");
const sleep = (time)=> new Promise((resolve) => setTimeout(resolve, 1000*time));

class Post {
    constructor(id, title, body, username) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.username = username;
    }
}

if (homeTitle && postsEle) {

    document.getElementById("showModal").addEventListener(
        "click",
        () => {
            modal.showModal()
        }
    )

    document.getElementById("savePost").addEventListener(
        "click",
        () => {
            if(title.value == "" || body.value == "") {
                alert("one of the inputs are empty");
                window.location.reload();
            }else{
                let userDetails = JSON.parse(localStorage.getItem("currentUser"));
                const newPost = new Post(1, title.value, body.value, userDetails.username);
                
                if(localStorage.getItem("posts") && JSON.parse(localStorage.getItem("posts")).length != 0) {
                    console.log(JSON.parse(localStorage.getItem("posts")).length);
                    newPost.id = JSON.parse(localStorage.getItem("posts"))[length - 1].id + 1;
                    const arr = JSON.parse(localStorage.getItem("posts"));
                    arr.push(newPost); 
                    localStorage.setItem("posts", JSON.stringify(arr))
                }else {
        
                    localStorage.setItem("posts", JSON.stringify([newPost]))
                }
                alert("Post created!");
            }
            modal.close();
        }
    )




    homeTitle.innerHTML = "Welcome to Shaked's website!";
    let currentPost = null;
    let changeTitle = null;
    let changeBody = null;
    if (localStorage.getItem("currentUser")) {
        regDet.innerHTML = "";
        const newEle = document.createElement('div');
        newEle.innerHTML = "";
        newEle.innerHTML = `
    <li>
    <a onclick = "logOut()">Log out, ${JSON.parse(localStorage.getItem("currentUser")).username}</a>
    </li>
    `;
        regDet.append(newEle);

    } else {
        window.location.href = "./signIn.html";
    }



    function logOut() {
        localStorage.removeItem("currentUser");
        window.location.href = "./signIn.html";
    }
    function deletePost(id) {
        const arr = JSON.parse(localStorage.getItem("posts"));
        arr.splice(id, 1);
        localStorage.setItem("posts", JSON.stringify(arr));
        displayPosts().then((success)=>success);
    }


    function editPost(id) {
        let allPosts = JSON.parse(localStorage.getItem("posts"));
        homeTitle.innerHTML = `
    <h1>Welcome to Shaked's website!</h1>
    <input type="text"  id="changeTitle" placeholder="${allPosts[id].title}">
    <input type="text"  id="changeBody" placeholder="${allPosts[id].body}">
    <button type="button" onclick="savePost(${id})">Save</button>
    `;
        changeTitle = document.getElementById("changeTitle");
        changeBody = document.getElementById("changeBody");
        changeTitle.value = allPosts[id].title;
        changeBody.value = allPosts[id].body;
    }



    function savePost(id) {
        let allPosts = JSON.parse(localStorage.getItem("posts"));
        allPosts[id].title = changeTitle.value;
        allPosts[id].body = changeBody.value;
        localStorage.setItem("posts", JSON.stringify(allPosts));
        homeTitle.innerHTML = `
        <h1>Welcome to Shaked's website!</h1>
        `;
        displayPosts();
    }

    async function displayPosts(){
        if (localStorage.getItem("posts") && JSON.parse(localStorage.getItem("posts")).length != 0) {
            let userDetails = JSON.parse(localStorage.getItem("currentUser"));
            const arr = JSON.parse(localStorage.getItem("posts"));

            postsEle.innerHTML = "";
            for (let i = 0; i < arr.length; i++) {
                spinner.style.display = "block";
                await sleep(0.5);
                const curUser = arr[i];
                if (userDetails.username == curUser.username) {
                    postsEle.innerHTML += ` 
                <ul>
                    <li>${curUser.id}</li>
                    <li>${curUser.title}</li>
                    <li>${curUser.body}</li>
                    <button id = "deletePost" onclick = "deletePost(${i})">Delete</button>
                    <button id = "editPost" onclick = "editPost(${i})">Edit</button>
                </ul>
                `;
                } else {
                    postsEle.innerHTML += ` 
                <ul>
                    <li>${curUser.id}</li>
                    <li>${curUser.title}</li>
                    <li>${curUser.body}</li>
                </ul>
                `;
                }
                spinner.style.display = "none";
            }
        } else {
            postsEle.innerHTML = "<h5>no posts yet</h5>";
        }
    }

    document.getElementById("displayPosts").addEventListener(
        "click",
        displayPosts
    )
}