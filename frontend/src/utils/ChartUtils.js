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

const getWindRoseData = (speeds = [], directions = []) => {
    let res = [];
    for (let i = 1; i <= 360; i++) {
        res.push({ direction: i, windSpeed: 0 });
    }
    speeds.forEach((value, index) => {
        let foundIndex = res.findIndex((value) => value.direction === directions[index]);
        if (foundIndex === -1) {
            res.push({
                windSpeed: value,
                direction: directions[index]
            });
        } else {
            if (res[foundIndex].windSpeed < value) {
                res[foundIndex].windSpeed = value;
            }
        }
    });
    res.sort((a, b) => a.direction - b.direction);
    return res;
};

export { getChartData, getWindRoseData };
