function formatDate(date) {
    return date.toString().split('T')[0].substring(0, 7);
}

export default formatDate;