const FIELD_CLIMATE_API = {
    // Urls
    fieldClimateUrl: 'https://api.fieldclimate.com/v2',
    calculationUrl: '/calculation/',
    forecastUrl: '/forecast/',
    // Api tokens
    publicKey: 'ba9c8f7415885c20da4ab8e7cd46bf2de6a49b8c1e320dea',
    privateKey: '9e9f3139bbe88c1a47475225b5991713bb1c4e8fc7a49c8f'
};

const ROBOLIFE2_BACKEND_API = {
    base_url: 'http://localhost:8080/api',
    weather_metrics_url: '/metrics/v1/weather_metrics/',
    comments_url: '/comments/v1/comments/',
    notification_url: '/notifications/v1/notification/'
};

const CHART_PARAMETERS_ENUM = {
    countPrecipitation: 'Количество осадков',
    averageTemperature: 'Средняя температура воздуха',
    maxTemperature: 'Максимальная температура',
    minTemperature: 'Минимальная температура',
    averageWindSpeed: 'Средння скорость ветра',
    maxWindSpeed: 'Максимальная скорость ветра',
    increaseCountPrecipitation: 'Нарастающее количество осадков',
    degreesHours: 'Градусо-часы',
    degreesDays: 'Градусо-дни',
    degreesDaysUsa: 'Градусо-дни (мин+макс)/2',
    battery: 'Заряд АКБ',
    solarRadiation: 'Солнечная радиация',
    humidity: 'Влажность листа',

    historyTemperatureMax: 'Максимальная температура',
    historyTemperatureMin: 'Минимальная температура',
    precipitationSum: 'Сумма осадков',
    windRose: 'Роза ветров'
};

const PARAMS_CONVERT = {
    'Precipitation Sum': 'Сумма осадков'
};

const DATA_FREQUENCY_CONVERT = {
    hourly: 'hour',
    daily: 'day',
    monthly: 'month'
};

export { FIELD_CLIMATE_API, ROBOLIFE2_BACKEND_API, CHART_PARAMETERS_ENUM, DATA_FREQUENCY_CONVERT, PARAMS_CONVERT };
