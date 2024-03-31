String.prototype.sterilize = function () {
    return this
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('/', '&sol;')
}

Date.prototype.print = function () {
    return this.toLocaleString("ru-RU", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).replace(",", "")
}
