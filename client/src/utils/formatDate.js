function formatDate(date, splitEnd = 7) {
    return date.toString().split('T')[0].substring(0, splitEnd);
}

export default formatDate;