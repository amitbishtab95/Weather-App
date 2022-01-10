window.addEventListener("load", () => {
    let lon;
    let lat;
    let timeZone = document.querySelector(".location-timezone");
    let tempDegree = document.querySelector(".temprature-degree");
    let temp_description = document.querySelector(".temperature-description");
    let weather_icon = document.querySelector(".weatherIcon");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            // const proxy = "https://cors-anywhere.herokuapp.com/corsdemo";
            //  generally used for proxy server 
            let api = "";
            if (location.protocol == 'https:') {
                api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${100}&appid=2ae4119c29e9679309e9100706dc8671`;
            }
            else {
                api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${100}&appid=2ae4119c29e9679309e9100706dc8671`;
            }
            fetch(api)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { name } = data[0];
                    // console.log(name);

                    // this is to get api as per the current city name 
                    let api2 = "";
                    if (location.protocol == 'http') {
                        api2 = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2ae4119c29e9679309e9100706dc8671`;
                    }
                    else {
                        api2 = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2ae4119c29e9679309e9100706dc8671`;

                    }
                    fetch(api2)
                        .then(r => {
                            console.log(r);
                            return r.json();
                        })
                        .then(data2 => {
                            console.log(data2)
                            const { temp } = data2.main;
                            const { description, icon } = data2.weather[0];
                            const { name } = data2;

                            temp_description.textContent = description;
                            tempDegree.textContent = (temp - 273.15).toFixed(2);
                            timeZone.textContent = name;
                            var ic = "http://openweathermap.org/img/w/" + icon + ".png";
                            // console.log(ic);
                            weather_icon.src = ic;
                        });;
                });

        });
    }

});