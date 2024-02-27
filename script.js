document.getElementById('location').focus()
function location_value(){
    const location_value = document.getElementById('location').value
    getFromApi(location_value)
    foreCast(location_value)
}

async function getFromApi(location_value){
    let fetchUrl = await fetch(`https://api.weatherapi.com/v1/current.json?key=253bbcc79f1b41a4ba065849242302&q=${location_value}&aqi=no`, {mode : 'cors'})
    if(fetchUrl.status == 200){
        let fetchJson = await fetchUrl.json()
        
        createCard(fetchJson)
    } else{
    throw new Error(console.log('Not Have Data'))
}
}
function createCard(place){
    let date = new Date(`${(place.location.localtime).slice(0,10)}`);
    let day = date.toLocaleString('en-us', {weekday: 'long'});
    const body = document.getElementById('body')
    const container = document.createElement('div')
    container.id ='container'
    body.innerHTML =""
    container.innerHTML += `
    <div id="board">
    <div id='board_date'>
    <p id="" >${(place.location.localtime).slice(0,10)}</p>
    <p id="">${(place.location.localtime).slice(11,16)}</p>
    <p id="day">${day}</p>
    </div>
    <div>
    <img src="${place.current.condition.icon}" alt="">
    <p id="">${place.current.condition.text}</p>
    </div>
    <div id="board_temp">
    <h1 style="margin-bottom: 0;">${place.current.temp_c}<span>&#176;</span>C</h1>
    <p style="margin-top: 0;">${place.current.temp_f}<span>&#176;</span>F</p>
    </div>
    <div>
    <p id="">${place.location.name}</p>
    <p id="">${place.location.region}</p>
    <p id="">${place.location.country}</p>
    
    </div>
    </div>
    `
    body.appendChild(container)
    backgroundChange(place.current.condition.text)
}

async function foreCast(location_value){
    let fetchUrl = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=253bbcc79f1b41a4ba065849242302&q=${location_value}&days=7&aqi=no&alerts=no`, {mode: 'cors'})
    if(fetchUrl.status == 200){
        let fetchJson = await fetchUrl.json()
        console.log(fetchJson)
        createForeCast(fetchJson)
        
    } else{
    throw new Error(alert('Not Have Data'))
}
}

function createForeCast(place){
    const body2 = document.getElementById('body2')
    const foreCastConatiner = document.createElement('div')
    foreCastConatiner.id ='foreCastConatiner'
    const allDay =place.forecast.forecastday
    body2.innerHTML =""
    for(day of allDay){
        let date = new Date(`${(day.date).slice(0,10)}`);
        let converted_day = date.toLocaleString('en-us', {weekday: 'long'})
        const container = document.createElement('div')
        container.id ='foreCastCards'
        console.log(day.date)
        container.innerHTML += `
        <p>${day.date}</p>
        <p>${converted_day}</p>
        <p>${day.day.avgtemp_c}<span>&#176;</span>C / ${day.day.avgtemp_f}<span>&#176;</span>F</p>
        <img id="daily_icon" src="${day.day.condition.icon}" alt="">
        <p>${day.day.condition.text}</p>
        `
        foreCastConatiner.appendChild(container)
    }
    body2.appendChild(foreCastConatiner)
}

function backgroundChange(value){
    //const body= document.querySelector('body')
    console.log(value)
    //if (value =='Mist'){
    //    document.body.style.backgroundImage = "url('mist.jpg')";
    //}
    switch(value){
        case 'Mist':
            document.body.style.backgroundImage = "url('images/mist.jpg')";
            break;
        case 'Sunny':
            document.body.style.backgroundImage = "url('images/sunny.jpg')";
            break;
        case 'Partly cloudy':
            document.body.style.backgroundImage = "url('images/cloudy.jpg')";
            break;
        case 'Patchy rain nearby':
            document.body.style.backgroundImage = "url('images/rainy.jpg')";
            break;
        case 'Moderate Snow':
            document.body.style.backgroundImage = "url('images/snow.jpg')";
            break;
        default:
            document.body.style.backgroundImage = "url('images/bg.jpg')";

    }
}