export default function toDateTime(secs) {
    var t = Number(secs);
    let dateObj = new Date(t);
    var month = dateObj.toLocaleString('default', { month: 'long' });
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return  month + " " + day + ", " + year
}