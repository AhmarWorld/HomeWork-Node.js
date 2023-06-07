const ws = new WebSocket(`ws://localhost:3000`);

ws.onopen = function (e) {
  console.log("[open] Соединение установлено");
  console.log("Отправляем данные на сервер");
  ws.send(JSON.stringify({type:`new_message`, data:{text:`Добро пожаловать!`}}));
};

ws.onmessage = function (event) {
  console.log(`[message] Данные получены с сервера: ${event.data}`);
  const mes = JSON.parse(event.data)
  if(mes.type === `new_message`){
      console.log(`new`)
      const divDialog = document.querySelector(`#dialog`)
      divDialog.innerHTML += `<p>User:${mes.data.user.slice(0,5)}</p>
      <p>Message: ${mes.data.text}`
  }else if(mes.type === `new_room`){
    // location.replace(`http://localhost:3000/room`)
    
    const divDialog = document.querySelector(`#dialog`)
    divDialog.innerHTML = ``

    const h = document.querySelector(`h1`)
    h.innerHTML = `Hello room ${mes.data.roomId}`
  }
};

ws.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
    );
  } else {
    console.log("[close] Соединение прервано");
  }
};

ws.onerror = function (error) {
  console.log(`[error]`);
};

const btn = document.querySelector(`#sendBtn`)
btn.addEventListener(`click`, ()=>{
    let lol = document.querySelector(`#nameInp`).value
    ws.send(JSON.stringify({type:`new_message`, data:{text:lol}}))
})

const createRoom = document.querySelector(`#create`)

createRoom.addEventListener(`click`, ()=>{
 ws.send(JSON.stringify({type:`new_room`, data:{}}))
})

const joinBut = document.querySelector(`#joinbut`)

let usersDiv = document.querySelector(`#users`)
async function getUsers(){
  let response = await fetch(`http://localhost:3000/users`)
  let data = await response.json()
  return data
}
getUsers().then(async data => {
  usersDiv.innerHTML += `Active users: <br>`
  data.forEach(item => {
    usersDiv.innerHTML += `<b>${item.split(`-`)[1]}</b> <br>`
  });
})
