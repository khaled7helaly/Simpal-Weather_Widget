
const { response } = require('express');
const request = require('request');

const geocode = (address , callback) => {
const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) + '&access_token=pk.eyJ1Ijoia2hhbGVkaGVsYWx5IiwiYSI6ImNtbWI3NnUwZzBncjgycXIzaGNveWhheHkifQ.GsLp-3zmmo3H63AwlAP9Yw';  
    
    request({url, json:true} , (error, response) => {
        // console.log(response.body);
        if(error){
            callback('Unable to connect geocde service', undefined)
        } else if(response.body.message){
            callback (response.body.message , undefined)
        } else if(response.body.features.length === 0){
        callback('Unable to find location. Try another search', undefined)
    } else {
        callback (undefined, 
            {  latitude: response.body.features[0].geometry.coordinates[1],
               longitude: response.body.features[0].geometry.coordinates[0],
               location: response.body.features[0].properties.full_address}
        )
    }

 })

}

module.exports = geocode;
