const formatNum = (num) => {
    if (num <= 0) {
        return '-';
    } else if (num > 0 && num < 10) {
        return `0${num}`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    } else {
        return num;
    }
};

export { formatNum };