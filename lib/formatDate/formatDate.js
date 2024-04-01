export function formatDateToRu(time) {
    let fullDate = time.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "2-digit",}) + " " + time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return fullDate;
  }
  
  export const formatDateToUs = (date) => {
    return `${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}-${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  };