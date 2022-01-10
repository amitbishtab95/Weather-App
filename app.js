window.addEventListener("load", () => {
    let lon;
    let lat;
    let timeZone = document.getElementsByClassName('location - timezone');
    let tempDegree = document.getElementsByClassName('temprature-degree');
    let description = document.getElementsByClassName('temperature-description');
    // let temp = document.getElementsByClassName('');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/corsdemo";
            const api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${100}&appid=2ae4119c29e9679309e9100706dc8671`;
            fetch(api)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { name } = data[0];
                    // console.log(name);

                    const api2 = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2ae4119c29e9679309e9100706dc8671`;
                    fetch(api2)
                        .then(r => {
                            console.log(r);
                            return r.json();
                        })
                        .then(data2 => {
                            return console.log(data2)
                        });
                });

        });
    }
});