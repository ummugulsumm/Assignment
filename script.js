const usersContainer = document.querySelector(".users-container");



function getData() {
usersContainer.innerHTML = "";
fetch(`https://reqres.in/api/users?page=1`)
  .then((result) => result.json())
  .then((data) => {
    displayData(data);
    total_pages = data.total_pages;
    pagination(total_pages)
  });

}

function displayData(data) {
  users = data.data;
  users.forEach((user) => {
    user_id = user.id;
    user_image = user.avatar;
    user_first_name = user.first_name;
    user_last_name = user.last_name;

    const userCard = document.createElement("a");
    userCard.classList.add("user-card");
    userCard.id = user_id;
    userCard.innerHTML = `
              <div class="image">
                  <img src=" ${user_image}" alt="Flag Image">
              </div>
              <div class="card-text">
                  <h3 class="card-title"> ${user_first_name}   ${user_last_name}</h3>
              </div>
          `;

    userCard.addEventListener("click", function () {
      getUser(userCard.id);
    });

    usersContainer.append(userCard);

  });
}


function getUser(id) {
  fetch(`https://reqres.in/api/users/${id}`)
    .then((result) => result.json())
    .then((data) => {
      user = data.data;
      user_id = user.id;
      user_image = user.avatar;
      user_first_name = user.first_name;
      user_last_name = user.last_name;

      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      const popup = document.createElement("div");
      popup.classList.add("popup");
      overlay.append(popup)
      const closeButton = document.createElement("span")
      closeButton.classList.add("icon-close-popup")
      closeButton.innerHTML = `
        <ion-icon name="close"></ion-icon>
      `
      const details = document.createElement("div")
      details.classList.add("details")
      details.innerHTML = ` <div class="image">
                            <img src=" ${user_image}" alt="Flag Image">
                        </div>
                         <div class="card-text">
                            <h3 class="card-title"> ${user_first_name}   ${user_last_name}</h3>
                        </div>
                        `;
      popup.append(closeButton)  
      popup.append(details)
    
      

        closeButton.addEventListener('click', function() {
            overlay.style.display = 'none';
        })

        usersContainer.append(overlay);
    });
}

const paginationList = document.querySelector(".pagination-list")

function pagination(total_page) {
  paginationList.innerHTML = ""
  for(let i = 1 ; i <= total_page; i++) {
    const number = document.createElement('li')
    number.classList.add("link")
    number.value = i;
    number.textContent = i;
    number.addEventListener('click', () => getData());
    paginationList.append(number) 
  }
};

getData()