$(document).ready(function() {
    $.ajax({
        url: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-373C6328-6BF2-41B3-BB3B-147802B82875&format=JSON&locationName=&elementName=&sort=time',
        method: 'GET',
        dataType: 'json',
        success: function(res) {
            const data = res.records.locations[0];
            const citySelect = $('#citySelect');

            data.location.forEach(function(city, index) {
                const cityName = city.locationName;
                citySelect.append($('<option></option>').attr('value', index).text(cityName));
            });

            citySelect.change(function() {
                const cityNum = $(this).val();
                if (cityNum !== '') {
                    todayWeather(data, cityNum);
                } else {
                    $('#weatherNow').html('');
                }
            });
        }
    });
});

function todayWeather(data, cityNum) {
    const selectedCity = data.location[cityNum];
    const chooseCity = selectedCity.locationName;
    const todayDate = new Date().toString().split('GMT')[0];
    const weatherElement = selectedCity.weatherElement;
    const weatherDescription = weatherElement[6].time[0].elementValue[0].value;
    const weatherTemp = weatherElement[1].time[0].elementValue[0].value;
    const weatherImg = changeImg(weatherDescription);

    const weatherNowHtml = `
        <h1>${chooseCity}</h1>
        <h2>${todayDate}</h2>
        ${weatherImg}
        <div class="now-description">${weatherDescription}</div>
        <p>氣溫: ${weatherTemp} °C</p>
    `;

    $('#weatherNow').html(weatherNowHtml);
}

function changeImg(weatherDescription) {
    if (weatherDescription === '多雲時晴' || weatherDescription === '晴時多雲') {
        return '<img src="sun.png" alt="sun-cloudy">';
    } else if (weatherDescription === '多雲' || weatherDescription === '陰時多雲' || weatherDescription === '多雲時陰') {
        return '<img src="clouds.png" alt="clouds">';
    } else {
        return '<img src="raining.png" alt="rainy">';
    }
}
