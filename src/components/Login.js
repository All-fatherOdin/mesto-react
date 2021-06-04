import {useState} from 'react'


function Login({ handleLogin, setUserData, userData }) {
   function handleChange(e){
      e.preventDefault();
      const {name, value} = e.target;
      setUserData({
         ...userData,
         [name]: value
      })
   }

   function handleSubmit(e){
      e.preventDefault();
      const { email, password } = userData 
      handleLogin({ email, password })
   }
   return(
      <div className="login">
         <form className="login__form" onSubmit={handleSubmit}>
            <h2 className="login__title">Вход</h2>
            <input name="email" type="email" className="login__input" placeholder="Email" onChange={handleChange}/>
            <input name="password" type="password" className="login__input" placeholder="Пароль" onChange={handleChange}/>
            <button className="login__button">Войти</button>
         </form>
      </div>
   ) 
}

export default Login