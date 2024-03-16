export function clock(time) {
    let fullDate = time.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "2-digit",}) + " " + time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return fullDate;
  }
  