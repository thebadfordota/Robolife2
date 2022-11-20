const API_INFO = {
    fieldClimateUrl: 'https://api.fieldclimate.com/v2',
    calculationUrl: '/calculation/',
    forecastUrl: '/forecast/',

    publicKey: '92f910fe220f8595dc4ee84deae1ab3925b7422e2396e78f',
    privateKey: 'cf6820ad409b72c796ce088634bd6ac06ba633966a9b3356'
};

const CHART_PARAMETERS_ENUM = {
    countPrecipitation: 'Количество осадков',
    averageTemperature: 'Средняя температура воздуха',
    maxTemperature: 'Максимальная температура',
    minTemperature: 'Минимальная температура',
    windSpeed: 'Скорость ветра'
};

export { API_INFO, CHART_PARAMETERS_ENUM };
