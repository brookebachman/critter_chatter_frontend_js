
const posts = document.getElementById("posts")
const friendFeed = document.getElementById("friends-feed")
const profiles = document.getElementById("profiles")
const createPost = document.getElementById("new-post")
const form = document.getElementsByClassName("form-container")[0]
const postContainer = document.getElementById("all-posts")
const home = document.getElementById("home")
const middleBox = document.getElementById("middlebox")

                

posts.addEventListener('click', function () {
    postContainer.innerHTML ="";
    home.style.display = "none";
    console.log('you see the posts');
    getAllUsers().then(users => getAllPosts(users));
    

});

friendFeed.addEventListener("click", function(){
    postContainer.innerHTML = ""
    getAllUsers();
    
})

createPost.addEventListener("click", function(event){
    postContainer.innerHTML = ""
    makeFormAppearOnPage();
      
})

form.addEventListener("submit", function(event){
    event.preventDefault();
    getAllUsers().then(users => getAllPosts(users)).then( (posts) => createAPost(posts, event));   

})



function makeFormAppearOnPage(){
    const form = document.getElementsByClassName("form-container")[0]
    form.style.display = "block";
}


// This below function is what gets called when you click on friends tab//
function getAllUsers(){
    

   return fetch("http://localhost:3000/users")
   .then((resp) => resp.json())
   .then(function(users) {
        users.forEach(function(user) {
           
            postContainer.innerHTML += renderSingleProfile(user);
        }); 

        return users 
    }  );
    
}

function renderSingleProfile(user){
    
    return `
    <div id ="profile-card">
    <h2>User: ${user.name}</h2>
    <img id="profile-image" src= "http://localhost:3000${user.prof_photo}"/>
    <p>Age: ${user.age}</p>
    <p>Location: ${user.location}</p>
    <p>Job: ${user.job}</p>
    <p> Species: ${user.species}</p>
    <button class="like-btn" data-id="${user.id}">Like <3 </button> 
    
    <input type="text" name="comments" value="" class="input-comment">
    <button class="submit-btn" data-id="${user.id}>Submit Comment </button>
    </div> `
};
        
function getAllPosts(users){

   return fetch('http://localhost:3000/posts')
            .then((response) => {
              return response.json();
            })
            .then((animals) => {
              postContainer.innerHTML = ""
              animals.forEach(function(animal){
                const user = users.find(function(user){
                  return user.id === animal.user_id
                })
                const username = user.name
                postContainer.innerHTML += renderSinglePost(animal, username);
                const likeButton = document.getElementsByClassName("like-btn")[0]
                likeButton.addEventListener("click", function(){
                  console.log("i clicked the like button")
                    
                })
                
              });
              return users
             

            });
  
}

function renderSinglePost(animal, username){
    return `
    <div class ="card">
    <h3>${username}</h3>
    <img id="post-image" src= "${animal.photo}"/><br>
    <button class="like-btn" data-id="${animal.id}">Like <3 </button> 
    <button class="delete-btn" data-id="${animal.id}">Delete Post </button>
    <p> ${animal.content}</p>
     
    <input type="text" name="comments" value="" class="input-comment"> 
    <button type="submit" form="form1" value="Submit Comment">Submit</button>
    </div> `
   
}

function createAPost(posts, event){
    
    const data = {
        post: {
          content: event.target.content.value,
          photo: event.target.photo.value
        },
        
        user: {
            name: event.target.name.value,
            email: event.target.email.value,
            photo: event.target.photo.value,
            age: event.target.age.value,
            location: event.target.location.value,
            job: event.target.job.value,
            species: event.target.species.value

        }
        
    }

    fetch("http://localhost:3000/posts",{
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
    .then(function(data){
        console.log(form)

        form.style.display = "none";
  
     
    // let newPost = `
    // <div class ="card">
    // <h3>${event.target.name.value}</h3>
    // <img id="post-image" src= "${data.photo}"/>
    // <button class="like-btn" data-id="${data.id}">Like <3 </button> 
    // <p> ${data.content}</p>
   
    // <input type="text" name="comments" value="" class="input-comment"> 
    // <button type="submit" form="form1" value="Submit Comment">Submit</button>
    // </div> `

    // postContainer.innerHTML += newPost
    })
    

    


 
    
}



