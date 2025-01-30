const http = require('http');
const PORT = 3001;
const friends = [{
    id:0, 
    name: 'Sir Issac Newton',},
    {
        id:1, 
        name:'Alberto Einstein',
    },
    {
        id:3, 
        name: 'Teslu'
    }

]

const server = http.createServer((req, res)=>{
    const items = req.url.split('/');
    if(req.method === 'POST' && items[1] === 'friends'){
        req.on('data', (data)=>{
            const friend = data.toString();
            console.log('Request: ', friend);
            friends.push(JSON.parse(friend));
           
        });
        req.pipe(res);
    }else if(req.method==='GET' && items[1]==='friends'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if(items.length===3){
        const friendsIndex = Number(items[2]);
        res.end(JSON.stringify(friends[friendsIndex]));
    }
    else{
        res.end(JSON.stringify(friends));
    }

} else if (items[1]==='messages'){
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>Hello Issac! </li>');
    res.write('<li>What are your thoughts on astronomy?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
}else{
    res.statusCode = 404;
    res.end();
}


});

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
});
//127.0.0.1=>localhost