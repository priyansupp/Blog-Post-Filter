const input = document.getElementById('search');
const blogContainer = document.querySelector('.blog-container');
let allBlogs = [];
let maxDisplay = 6;

const readmoreposts = document.getElementById('btn--view');
readmoreposts.addEventListener('click', (e) => {
    console.log(e.target);
    maxDisplay += 6;
    generateBlogs(allBlogs);
})





// listens for input response and filters the allBlogs array based on that which is then passed in generateBlogs again to be used to populate the html content inside blogContainer again.
input.addEventListener('input', (e) => {
    console.log(e.target, e.target.value);
    // console.log(allBlogs);
    generateBlogs(allBlogs.filter(blog => blog.title.toLowerCase().includes(e.target.value)));
})


// generates a template for  blog
const generateBlog = blog => {
    const article =  document.createElement('article');
    article.classList.add('post');
    
    const returnPostDate = date => `
    ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]}
    ${date.getDate()} ${date.getFullYear()}
    `;
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    article.innerHTML = `
    <div class="metadata">
    <div class="typeofpost">
    ${blog.meta.tags.map(tag => (`<span class="post_tag">${tag}</span>`)).join('')}
    </div>
    <p class="post_date">${returnPostDate(new Date(blog.meta.date))}</p>
    </div>
    <h3 class="post_header">
    <a href="#">${capitalizeFirstLetter(blog.title)}</a>
    </h3>
    <div class="post_author">
    <img src="./images/tyrion.jpg" alt="profile" width="40" height="40">
    <div class="author_info">
    <p class="name">${blog.user.name[0].firstName} ${blog.user.name[1].lastName}</p>
    <p class="role"><small>${blog.user.jobTitle}</small></p>
    </div>
    </div>
    <p class="post_body">
    ${blog.summary}
    </p>
        <button onclick="readpost()" class="btn">Read post</button>
    `;
    return article;
    }
    
    
    // takes a list of blogsss and populates the html content to be stored inside blogContainer using the blogs from the list passed.
    const generateBlogs = (blogsss) => {
        const frag = document.createDocumentFragment();         // creating a fragment is like creating <></> and appending all the html content in it, then this frag itself is appended in the DOM
        
        blogsss.slice(0, maxDisplay).map(blog => frag.appendChild(generateBlog(blog)));
        
        blogContainer.innerHTML = '';                           // clearing all the content(except the button) inside first then populating with the list we just generated
        blogContainer.appendChild(frag);                        // all blogs are in frag, which now is in .blog-container class
    }
    
    
    // fetches all the blogs only once and stores it in allBlogs, then it fires the first call(when the page renders) to generateBlogs using the list of all the blogs passed.
    const fetchBlogs = () => {
        fetch('./blogs.json')
        .then(response => response.json())
        .then(blogs => {
            // console.log(blogs.slice(0,10));
        blogs.map(blog => allBlogs.push(blog));
        generateBlogs(allBlogs);
    })
    .catch(err => {
        console.log("Error loading data", err);
    })
}
fetchBlogs();



const readpost = (e) => {
    console.log(e);
    // e.target.classList.toggle('readpost');
}
