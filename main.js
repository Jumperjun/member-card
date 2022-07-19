const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const userList = [];
const cardContainer = document.querySelector("#user-container");

const show = [];

//const userContainer = document.querySelector("#user-container");

function renderList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    //name surname avatar
    console.log(item);
    rawHTML += `
    <div class="card m-2" data-bs-toggle="modal" data-bs-target="#user-modal" id="show-container">
    <img class="card-img-top" src="${item.avatar}" alt="Card image cap" data-id="${item.id}">
    <div class="card-body" data-id="${item.id}">
    <h5 class="card-title mb-0 mt-1" data-id="${item.id}">${item.name}${item.surname}</h5>
    </div>
    </div>
    `;
  });
  cardContainer.innerHTML = rawHTML;
}

function showDetail(id) {
  const modalTitleBox = document.querySelector(".modal-title");
  const modalAvatarBox = document.querySelector(".modal-avatar");
  const modalUserInfoBox = document.querySelector(".modal-user-info");

  axios
    .get(INDEX_URL + id)
    .then((response) => {
      const data = response.data;
      console.log(data);
      modalTitleBox.innerText = data.name + " " + data.surname;
      modalAvatarBox.src = data.avatar;
      modalUserInfoBox.innerHTML = `
        <P>email: ${data.email}</p>
        <P>gender: ${data.gender}</p>
        <P>age: ${data.age}</p>
        <P>region: ${data.region}</p>
        <P>birthday: ${data.birthday}</p>
      `;
    })
    .catch((error) => {
      console.log(error);
    });
}

cardContainer.addEventListener("click", function onPanelClick(event) {
  //if (event.target.matches("#show-container")) {
  //console.log(event.target.dataset);
  showDetail(Number(event.target.dataset.id));
  //}
});

axios.get(INDEX_URL).then((response) => {
  //Array(200)
  show.push(...response.data.results);
  renderList(show);
});
