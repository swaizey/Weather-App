const wrapper = document.querySelector('.wrapper'),
inputPart = wrapper.querySelector('.input-part'),
uiInfo = inputPart.querySelector('.ui-info'),
infoPart = wrapper.querySelector('.info-part')
input = inputPart.querySelector('.input'),
celcius = '°c'

const submitBtn = document.querySelector('.search')
const locationBtn = document.querySelector('.locate')
const cityName2 = document.querySelector('.city-name')
const temp = document.querySelector('.temp')
const feels = document.querySelector('.feels')
const num1 = document.querySelector('.num1')
const num2 = document.querySelector('.num2')

let api;
input.addEventListener('keyup', e =>{
    if(e.key === 'Enter' && input.value != ''){
         cityName(input.value)
    }
})

submitBtn.addEventListener('click', () =>{
    cityName(input.value)
})

locationBtn.addEventListener('click', ()=>{
    uiInfo.classList.add('pending')
    uiInfo.textContent = 'Searching your coordinate'
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        alert('This device does\'nt support Geolocation')
    }
})
function onSuccess(position){
    console.log(position)
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    console.log(latitude)
    console.log(longitude)
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`

    fetch(api).then(res => res.json()).then(result => weather(result))
    
}

function onError(msg){
console.log(msg)
uiInfo.classList.add('error')
uiInfo.textContent = msg.message
}

function cityName(city){
    uiInfo.classList.add('pending')
    uiInfo.textContent = 'Searching....'
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
     fetch(api).then(res => res.json()).then(result => weather(result))
}

function weather(info){
    if(info.cod === '404'){
        uiInfo.textContent = `${input.value} is not a valid city`
        uiInfo.classList.replace('pending', 'error')
    }else{
        input.value= ''
        uiInfo.textContent = 'Found search'
        infoPart.classList.add('active')
        cityName2.textContent = info.name
        temp.textContent = `${Math.floor(info.main.feels_like)}${celcius}`
        feels.textContent = info.weather[0].main
        num1.innerHTML = `${Math.floor(info.main.temp)}${celcius}`
        num2.innerHTML = `${Math.floor(info.main.humidity)}${celcius}`
    }

}