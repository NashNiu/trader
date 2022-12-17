export function getUserInfo() {
  const obj = window.sessionStorage.getItem('username');
  console.log(obj);
  return obj;
}
