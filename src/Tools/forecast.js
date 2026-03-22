
const request = require('request');

const forecast = (latitude, longitude, callback) => {

   const forecasturl ="http://api.weatherapi.com/v1/current.json?key=5672d1a1d0df45c2870214142262002&q= " + latitude + "," + longitude
    request({url: forecasturl, json:true }, (error , response ) => {

        if (error){
             callback('Unable to connect geocde service', undefined)
        } else if (response.body.message){
            callback( response.body.message , undefined)
        } else {
            callback ( undefined , response.body.location.name + " it is : " + response.body.current.condition.text 
            + "and temp is : "  + response.body.current.temp_c ,

            // response.body.current.condition.icon
         )
        }
        
    } )
}


module.exports = forecast;