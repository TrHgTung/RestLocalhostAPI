const postsList = document.querySelector('.posts-list');
let output = '';
const url = 'http://localhost:5177/api/department';
const addPostForm = document.querySelector('.add-post-form');
// const titleValue = document.getElementById('body-value');
const bodyValue = document.getElementById('body-value');
const btnSubmit = document.querySelector('.btn');
const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <div class="card col-md-6 bg-ligt mt-2" style="width: 18rem;">
            <div class="card-body" data-id=${post.id}>
                <h5 class="card-title">Mã số khoa: #0000${post.id}</h5>
                <strong>Tên khoa:</strong>
                <h6 class="card-subtitle mb-2 text-body-secondary"> ${post.name}</h6>
                <p class="card-text">Quản lý khoa</p> 
                <a href="#" class="card-link" id="edit-post">Sửa</a>
                <a href="#" class="card-link" id="delete-post">Xóa</a>
            </div>
        </div>
        `;         
    });
    postsList.innerHTML = output;
}

// GET

fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))

postsList.addEventListener('click', (e) => {
    // console.log(e.target.id);
    e.preventDefault();
    let delBtnIsPressed = e.target.id == 'delete-post';
    let editBtnIsPressed = e.target.id == 'edit-post';

    let id = e.target.parentElement.dataset.id;

    if(delBtnIsPressed){
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => location.reload())
    }

    if(editBtnIsPressed){
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-subtitle').textContent;
        bodyValue.value = titleContent;
    }

    btnSubmit.addEventListener('click', (e) =>{
        e.preventDefault();
        // console.log('edited');
        fetch(`${url}/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: bodyValue.value,
            })
        })
        .then(res => res.json())
        .then(() => location.reload())
    })
});

// POST

addPostForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    console.log(bodyValue.value);
    // console.log('Hello');
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // id:titleValue.value,
            name: bodyValue.value
        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
    })
})