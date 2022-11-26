import hmacSHA256 from 'crypto-js/hmac-sha256';
import { API_INFO } from '../constants/Constants';

const fieldClimateAPI = {
    async getFetch(params) {
        const method = params.method;
        const body = params.body;
        const public_key = API_INFO.publicKey;
        const private_key = API_INFO.privateKey;
        const baseurl = API_INFO.fieldClimateUrl;
        const timestamp = new Date().toUTCString();
        const content_to_sign = params.method + params.request + timestamp + public_key;
        const signature = hmacSHA256(content_to_sign, private_key);
        const hmac_str = 'hmac ' + public_key + ':' + signature;
        const url = baseurl + params.request;
        const parameters = {
            headers: {
                Accept: 'application/json',
                Authorization: hmac_str,
                'Request-Date': timestamp
            },
            method,
            body
        };

        return await fetch(url, parameters)
            .then((data) => {
                return data.json();
            })
            .then((resp) => {
                return resp;
            })
            .catch((error) => console.log(error));
    },
    getStations() {
        let params = {
            method: 'GET',
            request: '/user/stations'
        };
        return fieldClimateAPI.getFetch(params);
    },
    getForecast(stationId = '00001F76', firstDate = 1666937600, secondDate = 1668103813, intervalTimeUnit = 'daily') {
        let params = {
            method: 'POST',
            request: API_INFO.forecastUrl + stationId + '/' + intervalTimeUnit + '/from/' + firstDate + '/to/' + secondDate
        };
        return fieldClimateAPI.getFetch(params);
    },
    getCalculationTemperature(
        stationId = '00001F76',
        type = 'temp',
        ch = 22,
        date_from = '1640995200',
        date_to = '1668124740',
        tmin = 10,
        tmax = 24
    ) {
        let params = {
            method: 'POST',
            request: API_INFO.calculationUrl + stationId,
            body: JSON.stringify({ type: type, ch: ch, date_from: date_from, date_to: date_to, tmin: tmin, tmax: tmax })
        };
        return fieldClimateAPI.getFetch(params);
    },
    getCalculationRain(stationId = '00001F76', ch = 5, date_from = '1640995200', date_to = '1668124740') {
        let params = {
            method: 'POST',
            request: API_INFO.calculationUrl + stationId + '/rain',
            body: JSON.stringify({ type: 'rain', ch: ch, date_from: date_from, date_to: date_to })
        };
        return fieldClimateAPI.getFetch(params);
    }
};

export default fieldClimateAPI;
