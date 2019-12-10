const express = require('express')
const app = express()
const morgan = require('morgan');
const port = 3000

morgan('short')

var request = require('request-promise');

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

var getWeatherbyCite = function() {
    return request({
        "method": "GET",
        "uri": "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22",
        "json": true
    }).catch((err) => {
        console.log(err)
    });
}
var getWeatherCountry = function() {
    return request({
        "method": "GET",
        "uri": "https://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=b6907d289e10d714a6e88b30761fae22",
        "json": true
    }).catch((err) => {
        console.log(err)
    });
}



app.get('/', async(req, res) => {

    let weatherdata = [];
    await getWeatherbyCite()
        .then(data => {
            console.log(data)
            weatherdata.push(data);
        }).catch((err) => {
            console.log("failed to get data")
            return res.statusCode(300)
        })
    await getWeatherCountry()
        .then(data => {
            console.log(data)
            weatherdata.push(data);
        }).catch((err) => {
            console.log("failed to get data")
            return res.statusCode(300)
        })
    return res.json(weatherdata)
})



app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
})