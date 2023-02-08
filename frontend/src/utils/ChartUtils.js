const getChartData = (parameters = {}, dates = []) => {
    let res = [];
    Object.entries(parameters).forEach((entry) => {
        const [parameter, values] = entry;
        if (!res.length) {
            values.forEach((value, index) => {
                res.push({
                    [parameter]: value,
                    date: Date.parse(dates[index])
                });
            });
        } else {
            values.forEach((value, index) => {
                res[index][parameter] = value;
            });
        }
    });
    return res;
};

const getWindRoseData = (speeds = [], speedsNormal = [], directions = [], directionsNormal = []) => {
    let res = [];
    for (let i = 1; i <= 360; i++) {
        res.push({ direction: i, windSpeed: 0, windSpeedNormal: 0 });
    }
    speeds.forEach((value, index) => {
        let speedIndex = res.findIndex((value) => value.direction === directions[index]);
        if (speedIndex === -1) {
            res.push({
                windSpeed: value,
                direction: directions[index]
            });
        } else {
            if (res[speedIndex].windSpeed < value) {
                res[speedIndex].windSpeed = value;
            }
        }
    });
    speedsNormal.forEach((value, index) => {
        let speedNormalIndex = res.findIndex((value) => value.direction === directionsNormal[index]);
        if (speedNormalIndex === -1) {
            res.push({
                windSpeedNormal: value,
                direction: directionsNormal[index]
            });
        } else {
            if (res[speedNormalIndex].windSpeedNormal < speedsNormal[index]) {
                res[speedNormalIndex].windSpeedNormal = speedsNormal[index];
            }
        }
    });
    res.sort((a, b) => a.direction - b.direction);
    return res;
};

const generateNormal = (normal = [], dates = []) => {
    let res = [];
    dates.forEach((value) => {
        res.push(
            normal.find((obj) => `${obj.date.split('-')[1]}-${obj.date.split('-')[2]}` === `${value.split('-')[1]}-${value.split('-')[2]}`)
        );
    });
    return res.map((value) => value.value);
};

export { getChartData, getWindRoseData, generateNormal };
