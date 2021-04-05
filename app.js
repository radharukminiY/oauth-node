var express = require('express');
var app = express();
var port =5200;
var superagent = require('superagent');
var request = require('request');

app.get('/',(req,res) => {
    res.send("<a href='https://github.com/login/oauth/authorize?client_id=a53ead3dd0f216320130'>Login With Git</a>")
})

app.get('/auth',(req,res) => {
    const code = req.query.code;
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'a53ead3dd0f216320130',
            client_secret:'0d7a422f2e26efef97666f896f0144ef251c71cd',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            var acctoken = result.body.access_token;
            const option = {
                url:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':'token '+acctoken,
                    'User-Agent':'mycode'
                }
            }
            request(option,(err,response,body)=>{
                return res.send(body)
            })
        })
})

app.listen(port)
