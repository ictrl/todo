//jshint esversion : 6

exports.getDate = function () {
    let today = new Date();

    let options = {
        weekday: 'long',
        // year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    day = today.toLocaleDateString("en-US", options);
    return day;
};