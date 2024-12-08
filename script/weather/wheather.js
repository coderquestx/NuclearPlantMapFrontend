const fetch = require('node-fetch');

function wind_speed_map(lat, lng) {
    return new Promise((resolve, reject) => {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + api_key;
        fetch(url).then(response => response.json()).then(data => {
            var wind_speed_kmph = null;
            if ("wind" in data) {
                var wind_speed_mps = data["wind"]["speed"];
                wind_speed_kmph = (wind_speed_mps * 3.6).toFixed(2);
                resolve(wind_speed_kmph);
            } else {
                resolve(null);
            }
        }).catch(error => {
            console.error("Error:", error);
            reject(error);
        });
    });
}

function get_wind_direction(lat, lng) {
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + api_key;
    return fetch(url).then(response => response.json()).then(data => {
        var wind_direction = null;
        if ("wind" in data) {
            wind_direction = Math.abs(data["wind"]["deg"] - 180);
        }
        return wind_direction;
    }).catch(error => {
        console.error("Error:", error);
        return null;
    });
}

module.exports = { wind_speed_map, get_wind_direction };
