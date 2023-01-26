import { useState } from 'react'
//import { useHistory} from "react-router-dom"
import './login.css'
import { useHttp } from '../AsyncURL/useHttp'
import { requestLogin, successLogin, errorLogin } from './loginSlice'
import { useDispatch } from 'react-redux'
import { UniversalURL } from '../AsyncURL/BaseUrl'

export default function Login() {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')

  const { request } = useHttp()
  const dispatch = useDispatch()

  //const history=useHistory()

  const onSubmitHandler = e => {
    e.preventDefault()

    if (!username || !password) {
      return
    }

    const login = { username, password }

    dispatch(requestLogin())

    request(
      `${UniversalURL}auth/login`,
      'POST',
      JSON.stringify(login)
    )
      .then(data => {
        dispatch(successLogin(data.data.accessToken))
      })
      .catch(error => {
        alert('Error')
        console.log(error.message)
        dispatch(errorLogin())
      })
  }

  return (
    <div className="container-login">
      <div className="login-left-section">
        <div className="login-left-section-bg"></div>
        <div className="logo-warapper text-center">
          <img
            src={require('../images/icon2_png.png')}
            alt={'logo'}
            width={'105px'}
            height={'80px'}
          />
        </div>
        <h1 className="login-left-section-title text-center">
          Tezkor Telegraf
        </h1>
        <p className="login-left-section-paragraph text-center">
          "O'ZBEKISTON TEMIR YO'LLARI" AJ
        </p>
        <p className="login-left-section-paragraph text-center">
          "QARSHI MINTAQAVIY TEMIR YO'L UZELI" UK
        </p>
      </div>
      <form className="login-box">
        <h1 className="login-title">TIZIMGA KIRISH</h1>
        <div>
          <label for="exampleInputEmail1">Login</label>
          <input
            value={username}
            onChange={e => setName(e.target.value)}
            type="text"
            name="login"
            placeholder="Username"
            id="exampleInputEmail1"
          />
        </div>
        <div>
          <label for="exampleInputPassword">Parol</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
            id="exampleInputPassword"
          />
        </div>
        <button onClick={onSubmitHandler}>KIRISH</button>
      </form>
    </div>
  )
}
