const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const [day, month, year] = currentDate.split(' ');

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;


function formatDeadlineDate(date) {
    const deadlineDate = new Date(date);
    const deadlineMonth = deadlineDate.toLocaleDateString('en-US', { month: 'short' });
    const deadlineDay = deadlineDate.getDate();
    const suffix = getOrdinalSuffix(deadlineDay);
    return `${deadlineMonth}, ${deadlineDay}${suffix}`;
}

export { formattedDate, formatDeadlineDate }