let local_host = true

function getHost(){
    if (local_host){
        return 'http://localhost:5000'
    } else {
        return ""
    }
}

function isLoggedIn(){
    if(localStorage.getItem('token')){
        return true;
        
    }
    else{
        return false;
    }
}


let username = document.getElementById('user').value
let password = document.getElementById('pass').value
function getToken(){
    return localStorage.getItem('token');
}
function setToken(token){
    localStorage.setItem('token', token);
    updateTheNavigationBar();
}
function removeToken(){
    localStorage.removeItem('token');
    updateTheNavigationBar();
}
let configuration = {
    isLoggedIn: ()=> isLoggedIn(),  host: ()=> getHost(), token:()=> getToken()
}

updateTheNavigationBar();

async function updateTheNavigationBar(){
    const navigation = document.getElementsByClassName("topnav")[0];
    let loginTag = navigation.children[navigation.children.length-1];
    if(configuration.isLoggedIn){
        loginTag.innerHTML = '<li class="right"> <a href="#" onClick= "logout()">Logout</a></li>';
    }
    else{
        loginTag.innerHTML = '<li class="right"> <a href="login.html">Login</a></li>';
    }
}

async function login(){
    let url = getHost() + '/signin'
    let body = {
        username: username, 
        password: password
    }
    let request = {
        method: 'POST',
        Headers:{
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(body)
        
    }
    try{
        let response = await fetch(url, request);
        if(response.status == 200){
            alert("Login successful");
            const token = await response.json();
            setToken(token);
            location.href = "index.html";
        }
        else{
            console.log(`response status: ${response.status}`)
            removeToken()
            alert("Invalid username or password");
        }
    }
    catch(err){
        console.log(err)
        removeToken()
        alert("Something went wrong! Please try again later.")
    }
} 

function logout(){
    removeToken();
    location.href = "login.html";
}