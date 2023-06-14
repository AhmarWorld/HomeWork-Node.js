let userInp = document.querySelector(`.user-input`);
let passInp = document.querySelector(`.passwordInp`);
let usersBtn = document.querySelector(`#usersBtn`);

let data

async function getUsers() {
  let response = await fetch(`http://localhost:3000/reg/users`);
  let data = await response.json();
  console.log(data)
  return data;
}
getUsers().then(item =>{
    data = item
});

usersBtn.addEventListener(`click`,async()=>{
    for(let user of data){
        if(user.name == userInp.value && user.password == passInp.value){
            localStorage.setItem(`userId`, `${user.id}`)
            alert(`Replacing!`)
            return location.replace(`http://localhost:3000/post`)
        }else{
            alert(`Не правильный логин или пароль!`)
        }
    }
})
