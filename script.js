function MinSec() {
    let currentDate = new Date();
    let options = {hour: '2-digit', minute:'2-digit'};
    return (currentDate.toLocaleTimeString('ru-RU', options)); 
}

function Year() {
    const months = [1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12];
        let myDate = new Date();
        
        let fullDate =  myDate.getDate() +
        "." + months[myDate.getMonth()] +
        "." + myDate.getFullYear() ;
        
        return (fullDate);

}
