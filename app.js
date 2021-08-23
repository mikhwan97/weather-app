window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription= document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let locationTimezone= document.querySelector('.location-timezone');
    let temperatureSection= document.querySelector('.temperature');
    const temperatureSpan= document.querySelector('.temperature span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat=position.coords.latitude;

            //if got problem regarding CORS, use proxy
            //const proxy="https://cors-anywhere.herokuapp.com/";
            //const api= `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            const key=`b90a7e886d6d034d48e3a900d73d5337`;
            const api= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp}= data.main;
                const {main}=data.weather[0];
                //set DOM Elements from the API
                temperatureDegree.textContent=temp;
                temperatureDescription.textContent=main;
                locationTimezone.textContent= data.sys.country +"-"+data.name;

                //formula for celcius
                let Faranheit= (temp*(9/5))+32;
                
                //set icons
                setIcons(main,document.querySelector('.icon'));

                //change temperature to celcius/Faranheit
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent="C";
                        temperatureDegree.textContent=temp;
                    }else {
                        temperatureSpan.textContent="F";
                        temperatureDegree.textContent=Math.floor(Faranheit);
                    }
                });
            });

        });
    }

    function setIcons(icon, iconID) {
        const skycons=new Skycons({color: "white"});
        const currentIcon=icon.toUpperCase();
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});