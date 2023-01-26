import  { useCallback} from 'react'


export const useHttp = () => {
  const request = useCallback( async (url, method="GET", body=null, headers={"Content-type":"application/json"}) => {
    try{
      const response = await fetch(url, {method, body, headers})
      if(!response.ok) {
        throw new Error(`Could not fetch ${url}, status ${response.status}`)
      }
      const data = await response.json()
      return data;
    } catch(e) {
      console.log(e)
    }
  }, []);
  return {request};
}

// const login = () => {
//   const url = 'http://utaganov.uz/api/v1/auth/login';
//   const headers = {
//     "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDU0YWMxYy1kZjA5LTRlYzktODlmYS1iNDQzN2Q1MjVlNDIiLCJpYXQiOjE2NjMzMDQwNDMsImV4cCI6MTY2MzkwODg0M30.Ip0sUtb91zlWzLwnOAsxLJjsvREPX1beAjR3itHYx1iYYixCAxfoDsRnUxHcVROYECKeq0oKyg6M2snX9PhtdQ",
//       "Content-type":"application/json"
//   }
//   const data = {
//     "username" : username,
//     "password" : password
//   }

//   axios.post(url,data).then(response => {
//     console.log(response)
//   })
// }
