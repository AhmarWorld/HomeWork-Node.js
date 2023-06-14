const postDiv = document.querySelector(`#post`);

async function drawPosts() {
  postDiv.innerHTML = ``;
  let response = await fetch(`http://localhost:3000/json/parse`);
  let data = await response.json();
  console.log(data);
  for (let post of data) {
    if (post.userId == localStorage.getItem(`userId`)) {
      let div = document.createElement(`div`);
      let h1Title = document.createElement(`h1`);
      let pBody = document.createElement(`p`);
      let postDeleteBut = document.createElement(`button`);
      let editButton = document.createElement(`button`)
      let editInp = document.createElement("input")
      editInp.classList.add(`editInp`)
      h1Title.innerHTML = post.title;
      editButton.innerHTML = `Edit`
      pBody.innerHTML = post.body;
      postDeleteBut.setAttribute(`onclick`, `deletePost(${post.id})`);
      postDeleteBut.innerHTML = `Delete`;
      postDeleteBut.style.background = `red`;
      postDeleteBut.style.borderRadius = `15px`;
      postDeleteBut.style.border = `none`;
      postDeleteBut.style.width = `80px`;
      postDeleteBut.style.height = `30px`;
      postDeleteBut.style.color = `white`;
      editInp.setAttribute(`id`, `${post.id}`)
      editButton.style.background = `white`;
      editButton.style.borderRadius = `15px`;
      editButton.style.border = `1px black solid`;
      editButton.style.width = `80px`;
      editButton.style.height = `30px`;
      editButton.style.color = `red`;
      editButton.classList.add(`postEditBut`)
      editButton.setAttribute(`onclick`, `editingPost(${post.id})`)
      div.appendChild(h1Title);
      div.appendChild(pBody);
      div.appendChild(editInp);
      div.appendChild(editButton);
      div.appendChild(postDeleteBut);
      div.style.borderBottom = `3px solid black`;
      postDiv.appendChild(div);
    }
  }
}
drawPosts()

async function editingPost(id) {
  let text = document.getElementById(`${id}`).value
  console.log(text)
  let response = await fetch(`http://localhost:3000/json/edit`, {
    method: `put`,
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({
      id: id,
      body: text
    })
  })
  if (response.ok) {
    setTimeout(() => {
      drawPosts()
    }, 500)
  }
}

function deletePost(id) {
  fetch(`http://localhost:3000/json/delete/${id}`, {
    method: `DELETE`,
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
  });
  setTimeout(drawPosts, 500);
}

document.querySelector(`#button`).addEventListener(`click`, async () => {
  let form = document.querySelector(`form`);
  console.log(form);
  let userId = localStorage.getItem(`userId`);
  const body = Object.fromEntries(new FormData(form).entries());
  let response = await fetch(`http://localhost:3000/json/create`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({ userId, ...body }),
  });
  let data = await response.json();
  console.log(data);
  setTimeout(drawPosts, 500);
});
