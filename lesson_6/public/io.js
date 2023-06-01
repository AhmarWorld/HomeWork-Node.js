const ws = new WebSocket(`ws://localhost:3000`);

ws.onopen = function (e) {
  console.log("[open] Соединение установлено");
  console.log("Отправляем данные на сервер");
  ws.send(JSON.stringify({type:`new_message`, data:{}}));
};

ws.onmessage = function (event) {
  console.log(`[message] Данные получены с сервера: ${event.data}`);
  const mes = JSON.parse(event.data)
  if(mes.type === `new_message`){
      console.log(`new`)
      const divDialog = document.querySelector(`#dialog`)
      divDialog.innerHTML += `<p>User:${mes.data.user.slice(0,5)}</p>
      <p>Message: ${mes.data.text}`
  }
};

ws.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
    );
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
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