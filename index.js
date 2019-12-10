const express = require('express')
const app = express()
const port = 3000

var request = require('request-promise');


var getWeather = function() {
    return request({
        "method": "GET",
        "uri": "https://openweathermap.org/data/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22",
        "json": true
    }).catch((err) => {
        console.log(err.error)
    });


}


app.get('/', async(req, res) => {

    await getWeather()
        .then(data => {
            console.log(data)
            return res.json(data)
        }).catch((err) => {
            console.log("failed to get data")
            return res.statusCode(300)
        })
})







app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
})