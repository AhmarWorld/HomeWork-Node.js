let form = document.querySelector(`.guruweba_example_form`)
let sendBtn = document.querySelector(`#sendBtn`)
sendBtn.addEventListener(`click`, async ()=>{
    let formData = Object.fromEntries(new FormData(form).entries())
    formData.id = `${new Date().getTime()}`
    let formDataJSON = JSON.stringify(formData)
    let response = await fetch(`/json/save`,{
        method:`POST`,
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: formDataJSON
    })
    let data = await response.json()
    return data
})