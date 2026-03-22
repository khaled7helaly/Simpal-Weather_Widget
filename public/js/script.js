
let form = document.getElementById('form1');

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    weatherFun(); // Call the weather function
    form.reset(); // Reset the form fields
});


const errorF = document.getElementById('error');
const locationF = document.getElementById('location');
const forecastF = document.getElementById('forecast');
const iconF = document.getElementById('weather-icon');
const latF = document.getElementById('latitude');
const longF = document.getElementById('longitude');

const weatherResultF = document.getElementById('weather-result');

let weatherFun = async () => {

    try {

        const address = document.getElementById('address').value;
        const res = await fetch('http://localhost:3000/weather?address=' + address);
        const data = await res.json();
        console.log(data); // For debugging

        if (data.error) {
            errorF.innerText = data.error;
             weatherResultF.style.display = "none";
            locationF.innerText =  "";
            forecastF.innerText = "";
            latF.innerText = "";
            longF.innerText = "";
            iconF.src = "";
          

        }
        else {
            errorF.innerText = "";
            weatherResultF.style.display = "block";
            locationF.innerText = data.location;
            forecastF.innerText = data.forecast;
            latF.innerText = data.latitude;
            longF.innerText = data.longitude;
            iconF.src = data.icon;
        }
    }
    catch (e) {
        console.log(e);
    }
    

}
