export{getfunction}
const managementEl = document.getElementById('management');
const getfunction = () => {
    managementEl.textContent = 'Коментарии загружаютя...';
  return fetch ("https://wedev-api.sky.pro/api/v1/gazim-akbutin/comments", { method: "GET"})
  .then((res) =>{
      return  res.json()})
      .then((res)=>{
    managementEl.textContent ='';
    return res
      })
    }

export{postFunction}
const postFunction = ({name, text})=>{
  return fetch("https://wedev-api.sky.pro/api/v1/gazim-akbutin/comments/",
  {
    method: "POST",
    body: JSON.stringify({
      name:name
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;"),
      text:text
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;"),
        })
})
.then((res)=>{
if (res.status === 500) {
  return Promise.reject(new Error("Сервер упал"));
  }
  if (res.status === 400) {
  return Promise.reject(new Error("Ошибка в запросе"));
  }
  return  res.json()})
}




 
    
