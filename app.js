let express = require('express')
var fetch = require('node-fetch');

const app = express()

app.get('/', (req,res)=>{
    let response = {
        ip_adress: null,
        language: null,
        software: null,
        city: null,
        country: null
    }

    
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    response.ip_adress = ip.substring(ip.lastIndexOf(':'));

    let ua = req.headers['user-agent']; 
    response.software = ua.substring(ua.indexOf('(') + 1,ua.indexOf(')'));


    response.language = req.headers["accept-language"].split(';')[0];

    console.log(req.headers);

    fetch("http://ip-api.com/json/" + response.ip_adress)
	.then(res => res.json())
	.then((json) => {
        response.city = json.city;
        response.contry = json.country;
        res.send(response);
    });

});

app.listen(process.env.PORT || 3004);