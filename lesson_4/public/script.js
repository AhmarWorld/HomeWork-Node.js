document.querySelector(`#button`).addEventListener(`click`,async ()=>{
    let name = document.querySelector(`#name`).value
    let surname = document.querySelector(`#surname`).value
    let password = document.querySelector(`#pasword`).value
    let info = {
        name,
        surname,
        password
    }
    let response = await fetch(`http://localhost:3000/reg/user`,{method:`post`, headers:{"Content-Type": "application/json","Accept":"application/json"}, body:JSON.stringify(info)})
    let data = await response.json()
    console.log(data)
})