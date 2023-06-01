const fs = require(`fs`)
function open(path){
    fs.open(path, 'w', (err) => {
        if(err) throw err;
        console.log('File created/emptied');
    });
}
function append(path, argu){
    fs.appendFile(path, JSON.stringify(argu), `utf8`, (err)=>{
        if(err) throw Error(err)
        // console.log(err)
    })
}
function read(path){
    fs.readFile(path,{encoding:`utf8`}, (err, data)=>{
        if(err) throw Error(err)
        let goal = JSON.parse(data)
        if(goal.count < goal.target){
            open(path)
            goal.count++
            append(path,goal)
            console.log(`Count upped`)
        }else if(goal.count >= goal.target){
            alert(`Счётчик уже максимальный`)
            open(path)
            goal.count = 0
            append(path,goal)
            console.log(`Count reseted`)
        }
    })
}
read(`./book.json`)