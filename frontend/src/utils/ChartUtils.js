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

export { getChartData };
