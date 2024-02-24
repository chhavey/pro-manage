const priorityColor = (priority) => {
    switch (priority) {
        case 'LOW':
            return 'var(--priority-low)';
        case 'MODERATE':
            return 'var(--priority-moderate)';
        case 'HIGH':
            return 'var(--priority-high)';
        default:
            return 'black';
    }
};

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

export { formatNum, priorityColor };