let host = "https://wedev-api.sky.pro/api/v2/gazim-akbutin/comments";
let userURL = "https://wedev-api.sky.pro/api/user/login";
let regURL = "https://wedev-api.sky.pro/api/user";


export let token;
export const setToken = (newToken)=>{
  token = newToken;
}

const managementEl = document.getElementById('management');
export const getfunction = () => {
    managementEl.textContent = 'Коментарии загружаютя...';
  return fetch (host, { method: "GET",
  headers:{
    Authorization: `Bearer ${token}`
  },
  })
  .then((res) =>{
      return  res.json()})
      .then((res)=>{
    managementEl.textContent ='';
    return res
      })
    }


export const postFunction = ({text})=>{
  return fetch(host,
  {
    method: "POST",
    headers:{
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
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

export const login = ({login, password})=>{
  return fetch(userURL,
  {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
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

export const register = ({nameReg, loginReg, passwordReg})=>{
  return fetch(regURL,
  {
    method: "POST",
    body: JSON.stringify({
      nameReg,
      loginReg,
      passwordReg,
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

 
    
