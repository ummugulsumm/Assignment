const addJobButton = document.querySelector('#post-data')
const content = document.querySelector(".content")

addJobButton.addEventListener('click', postData)

function postData() {
    const data = {
        name :  document.forms[0].name.value,
        job: document.forms[0].job.value 
    }

    var json = JSON.stringify(data);
    
    var url = "https://reqres.in/api/users"
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function() {
        if(xhr.status === 201 && xhr.readyState === 4) {
            var post = xhr.responseText;
            var response = JSON.parse(post)
            displayResponse(response.name, response.job, response.id, response.createdAt)
        } else {
            alert("Post fail!\n" + "Status Code: " + xhr.status)
        }
    }
    xhr.send(json);
    
}

function displayResponse(name, job, id, createdAt) {
    content.innerHTML = 
        `              
        <h3>Post successful</h3>
        <p><span>Name:</span> ${name}</p>
        <p><span>Job:</span> ${job}</p>
        <p><span>Id:</span> ${id}</p>
        <p><span>createdAt:</span> ${createdAt}</p>
        `;
}
