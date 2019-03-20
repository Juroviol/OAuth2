const express = require('express')
const Client = require('node-rest-client').Client
const path = require('path')

const client_id = 'swissre'
const client_secret = 'abcd'

let app = express()

let client = new Client()

app.get('/openid-signin', (req, res) => {
    let code = req.query.code
    let args = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
        },
        data: {
            grant_type: 'authorization_code',
            code,
            request_uri: 'http://localhost:3000'
        }
    }
    client.post('http://localhost:4000/token', args, (data, response) => {
        res.redirect("http://localhost:3000/index.html")
    })
})

app.use(express.static(__dirname + '/public'))

app.listen(3000)

