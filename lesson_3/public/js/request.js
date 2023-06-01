const btn = document.querySelector('#buttonNode');

console.log(btn)

btn.addEventListener('click', async () => {
    const response = await fetch('/users/', { method: 'GET'});
    const data = await response.json();

    console.log(data);

})
btn.addEventListener('click', async () => {
    const response = await fetch('/markets/', { method: 'GET'});
    const {groups} = await response.json();

    console.log(groups);

})
let firstname = document.querySelector(`#firstname`)
let secondname = document.querySelector(`#secondname`)
btn.addEventListener('click', () => {
    let obj = JSON.stringify({first:`${firstname.value}`,second:`${secondname.value}`})
    fetch('/custom/', { method: 'POST'}, obj);
})