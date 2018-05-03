//1. define functions:
const getPosts = () => {
    container.innerHTML = ''
    fetch('http://localhost:3000/posts/').then(response =>{
        return response.json();
      }).then(showPosts)
}

const deletePost = (e) => {
    const id = e.target.id
    fetch('http://localhost:3000/posts/' + id, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    }).then(function(response) {
        return response.text();
    }).then(function(data) {
        getPosts()
    })
    e.preventDefault()
}

const showPosts = (posts) => {
    console.log(posts)
    const container = document.getElementById('container')
    posts.forEach(post => {
        let template = `
            <div class="clearfix">
                <h2>${post.title}</h2>
                <a id="${post._id}" class="delete" href="#">Delete</a>
                <img src="${post.imageURL}" />
                <p>${post.text}</p>
            </div>`
        container.innerHTML += template;
    })
    document.querySelectorAll('.delete').forEach(element => {
        element.onclick = deletePost
    })
}
const createPost = () => {
    const data = {
        title: document.querySelector('#title').value,
        imageURL: document.querySelector('#imageURL').value,
        text: document.querySelector('#text').value
    }

    fetch('http://localhost:3000/posts/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        clearForm()
        getPosts()
    })
}

const clearForm = () => {
    document.querySelector('#title').value = ''
    document.querySelector('#imageURL').value = ''
    document.querySelector('#text').value = ''
    document.querySelector('.modal').classList.toggle('show')
}

document.querySelector('.button-primary').onclick = createPost
getPosts()
