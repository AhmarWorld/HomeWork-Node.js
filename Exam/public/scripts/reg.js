let userInp = document.querySelector(`.user-input`);
let passInp = document.querySelector(`.passwordInp`);
let usersBtn = document.querySelector(`#usersBtn`)

async function getUsers() {
  let response = await fetch(`http://localhost:3000/reg/users`);
  let data = await response.json();
  return data;
}
getUsers().then(console.log);

usersBtn.addEventListener(`click`, async () =>{
  let response = await fetch(`http://localhost:3000/reg/users/create`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body:JSON.stringify({
        name:userInp.value,
        password:passInp.value
    }),
  });
  let data = await response.json()
  console.log(data)
  location.replace(`http://localhost:3000/authorization`)
  return data
})

document.querySelector(`#relocateAuth`).addEventListener(`click`,()=>{
  location.replace(`http://localhost:3000/authorization`)
})