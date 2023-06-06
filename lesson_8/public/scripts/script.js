const postDiv = document.querySelector(`#post`);

async function drawPosts() {
  postDiv.innerHTML = ``;
  let response = await fetch(`http://localhost:3000/json/parse`);
  let data = await response.json();
  console.log(data);
  for (let post of data) {
    let div = document.createElement(`div`);
    let h1Title = document.createElement(`h1`);
    let pBody = document.createElement(`p`);
    let postDeleteBut = document.createElement(`button`);
    h1Title.innerHTML = post.title;
    pBody.innerHTML = post.body;
    postDeleteBut.setAttribute(`onclick`, `deletePost(${post.id})`);
    postDeleteBut.innerHTML = `Delete`;
    postDeleteBut.style.background = `red`;
    postDeleteBut.style.borderRadius = `15px`;
    postDeleteBut.style.border = `none`;
    postDeleteBut.style.width = `80px`;
    postDeleteBut.style.height = `30px`;
    postDeleteBut.style.color = `white`;
    div.appendChild(h1Title);
    div.appendChild(pBody);
    div.appendChild(postDeleteBut);
    div.style.borderBottom = `3px solid black`;
    postDiv.appendChild(div);
  }
}
drawPosts();
function deletePost(id) {
  fetch(`http://localhost:3000/json/delete/${id}`, {
    method: `DELETE`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  setTimeout(drawPosts, 500);
}

document.querySelector(`#button`).addEventListener(`click`, async () => {
    let form = document.querySelector(`form`)
    console.log(form)
  const body = JSON.stringify(
    Object.fromEntries(new FormData(form).entries())
  );
  let response = await fetch(`http://localhost:3000/json/create`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body,
  });
  let data = await response.json();
  console.log(data);
  setTimeout(drawPosts, 500);
});
