document.querySelector(`#button`).addEventListener(`click`, async () => {
    let name = document.querySelector(`#name`).value
    let password = document.querySelector(`#pasword`).value
    let info = {
        email: name,
        name: password
    }
    let response = await fetch(`http://localhost:3000/reg/user`, { method: `post`, headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(info) })
    let data = await response.json()
    console.log(data)
})

document.querySelector(`#get`).addEventListener(`click`, async () => {
    let response = await fetch(`http://localhost:3000/reg/take`)
    let data = await response.json()
    let table = document.querySelector(`table`)
    table.innerHTML = `<tr>
    <td>Email</td>
    <td>Password</td>
</tr>`
    data.forEach(i => {
        let tr = document.createElement(`tr`)
        let tdEmail = document.createElement(`td`)
        let tdPass = document.createElement(`td`)
        tdEmail.innerHTML = `${i.email}`
        tdPass.innerHTML = `${i.name}`
        tr.appendChild(tdEmail)
        tr.appendChild(tdPass)
        table.appendChild(tr)
    });
    console.log(data)
})

document.querySelector(`#check`).addEventListener(`click`, async()=>{
    let formCheck = document.querySelector(`#formCheck`)
    const body = JSON.stringify(Object.fromEntries(new FormData(formCheck).entries()))
    let response = await fetch(`http://localhost:3000/reg/check`,{method:`post`, headers:{ "Content-Type": "application/json", "Accept": "application/json" },body})
    let data = await response.json()
    return data
})
