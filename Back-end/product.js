require('dotenv').config();
let request = require('request');

let apikey = process.env.API_KEY;
let pass = process.env.PASSWORD;
let endpoint = 'products';

let options = {
    'method': 'GET',
    'url': `https://${apikey}:${pass}@e0dc50-40.myshopify.com/admin/api/2024-04/${endpoint}.json`,
    'headers': {
        'Content-Type': 'application/json'
    }
};

app.get("/getdata", (req, res) => {
    request(options, function (error, res) {
        if (error) {
            throw new Error(error);
        }
        console.log(res.body)

    })
})