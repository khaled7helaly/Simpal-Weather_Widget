const express = require('express');
const request = require('request');

const app = express()

const port = process.env.PORT || 3000
const path = require ("path")
 var hbs = require('hbs');

app.set('view engine', 'hbs');


app.get ('/' , (req,res) => {
    res.render('index' , {
        title : "Weather Result ",
        desc : "This is a simple weather application ."
    })
})





 const viewsDirectory = path.join (__dirname , '../views')
 app.set('views', viewsDirectory);
 


const partialsPath = path.join(__dirname , "../partials")
hbs.registerPartials(partialsPath);



const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))
console.log(publicDirectory)



// geocode( address , (error , data) => {
//     console.log("ERROR : " , error)
//     console.log("DATA : "  , data)

// forecast( data.latitude , data.longitude , (error , forecastData) => {
//         console.log("ERROR : " , error)
//         console.log("DATA : " , forecastData)
//      } )
//  })

const forecast = require('./Tools/forecast')
const geocode = require('./Tools/geocode');
const address = process.argv[2]

app.get( '/weather' , (req, res) =>{

    if(!req.query.address){
        return res.send({
            error : "You must provide an address"
        })
    }
    geocode( req.query.address , (error , data)=>{
        if(error){
            return res.send({ error })
        }
        forecast( data.latitude , data.longitude , (error , forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                    forecast: forecastData,
                    location: data.location,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    icon: data.icon
            })

        })

    })
}
) 










//   app.get('*' , (req , res)=> {
//      res.send('404 Page Not Founded')
//   })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
    