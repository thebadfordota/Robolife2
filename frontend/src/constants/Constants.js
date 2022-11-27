const API_INFO = {
    // Urls
    fieldClimateUrl: 'https://api.fieldclimate.com/v2',
    calculationUrl: '/calculation/',
    forecastUrl: '/forecast/',
    // Api tokens
    publicKey: '92f910fe220f8595dc4ee84deae1ab3925b7422e2396e78f',
    privateKey: 'cf6820ad409b72c796ce088634bd6ac06ba633966a9b3356'
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
    solarRadiation: 'Солнечная радиация'
};

const DATA_FREQUENCY_CONVERT = {
    hourly: 'hour',
    daily: 'day',
    monthly: 'month'
};

export { API_INFO, CHART_PARAMETERS_ENUM, DATA_FREQUENCY_CONVERT };
