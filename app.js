const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const http = require('http')
const parser = require('./parser')

const app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');


app.get('/', (req, res)=>{
    let answer = {
        ipadress: parser.getIp(req),
        language: parser.getLanguage(req),
        software: parser.getSoftware(req),
        country: 'not available',
        city: 'not available'
    }

    http.get('http://ip-api.com/json/' + answer.ip_adress , (response)=>{
        response.on('data',(data)=>{
            let json = JSON.parse(data);

            if(json.country){
                answer.country = json.country; 
            }
            if(json.city){
                answer.city = json.city;
            }
            
            console.log(answer);
            res.send(answer);
        })
    })
    
    res.render('index', {answer})
})


app.get('/api', (req,res)=>{
    let answer = {
        ipadress: parser.getIp(req),
        language: parser.getLanguage(req),
        software: parser.getSoftware(req),
        country: 'not available',
        city: 'not available'
    }

    http.get('http://ip-api.com/json/' + answer.ip_adress , (response)=>{
        response.on('data',(data)=>{
            let json = JSON.parse(data);

            if(json.country){
                answer.country = json.country; 
            }
            if(json.city){
                answer.city = json.city;
            }
            
            console.log(answer);
            res.send(answer);
        })
    })

})



app.listen(process.env.PORT || 3004);
console.log('listening on port: ' + 3004);