let form = document.getElementById('form1');
const addressInput = document.getElementById('address');


form.addEventListener("submit", (e) => {
    e.preventDefault();
    weatherFun();
    form.reset();
});

const errorF = document.getElementById('error');
const locationF = document.getElementById('location');
const forecastF = document.getElementById('forecast');
const iconF = document.getElementById('weather-icon');
const latF = document.getElementById('latitude');
const longF = document.getElementById('longitude');
const weatherResultF = document.getElementById('weather-result');

//  Debounce function to limit API calls while typing
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

//  Live Search
addressInput.addEventListener('input', debounce(() => {
    const value = addressInput.value.trim();
    if (value.length > 2) { 
        weatherFun();
    } else {
        
        errorF.innerText = "";
        weatherResultF.style.display = "none";
    }
}, 500)); 

let weatherFun = async () => {
    try {
        const address = addressInput.value;
        const res = await fetch('http://localhost:3000/weather?address=' + address);
        const data = await res.json();
        console.log(data);

        if (data.error) {
            errorF.innerText = data.error;
            weatherResultF.style.display = "none";
            locationF.innerText = "";
            forecastF.innerText = "";
            latF.innerText = "";
            longF.innerText = "";
            iconF.src = "";
        } else {
            errorF.innerText = "";
            weatherResultF.style.display = "block";
            locationF.innerText = data.location;
            forecastF.innerText = data.forecast;
            latF.innerText = data.latitude;
            longF.innerText = data.longitude;
            iconF.src = data.icon;
        }
    } catch (e) {
        console.log(e);
    }
};
