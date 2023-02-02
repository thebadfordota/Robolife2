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
    base_url: 'http://localhost', // При локальном запуске - http://localhost:8000/, docker - http://localhost
    weather_metrics_url: '/api/metrics/v1/weather_metrics/',
    soil_moisture_url: '/api/metrics/v1/soil_moisture/',
    comments_url: '/api/comments/v1/comments/',
    notification_url: '/api/notifications/v1/notification/',
    admin_panel_url: '/admin'
};

const CHART_PARAMETERS_ENUM = {
    countPrecipitation: 'Количество осадков',
    averageTemperature: 'Средняя температура воздуха',
    maxTemperature: 'Максимальная температура воздуха',
    minTemperature: 'Минимальная температура воздуха',
    averageWindSpeed: 'Средння скорость ветра',
    maxWindSpeed: 'Максимальная скорость ветра',
    increaseCountPrecipitation: 'Нарастающее количество осадков',
    degreesHours: 'Градусо-часы',
    degreesDays: 'Градусо-дни',
    degreesDaysUsa: 'Градусо-дни (мин+макс)/2',
    battery: 'Заряд АКБ',
    solarRadiation: 'Солнечная радиация',
    humidity: 'Влажность листа',

    historyTemperatureMax: 'Максимальная температура воздуха',
    historyTemperatureMin: 'Минимальная температура воздуха',
    historyTemperatureMaxNormal: 'Норма максимальной температуры',
    historyTemperatureMinNormal: 'Норма минимальной температуры',
    precipitationSum: 'Сумма осадков',
    precipitationSumNormal: 'Норма суммы осадков',
    windRose: 'Роза ветров',
    soilMoisture10cm: 'Влажность почвы(h=10сm)',
    soilMoisture20cm: 'Влажность почвы(h=20сm)',
    soilMoisture100cm: 'Влажность почвы(h=100сm)'
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
