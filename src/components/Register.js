import { useState } from 'react'
import { Link } from 'react-router-dom';

function Register({handleRegister, changeLink}){
   const [data, setData] = useState({
      email: '',
      password: ''
   })

   function handleChange(e){
      const {name, value} = e.target;
      setData({
         ...data,
         [name]: value
      })
   }

   function handleSubmit(e){
      e.preventDefault();
      let { email, password } = data 
      handleRegister({ email, password })
   }

   return(
      <div className="register">
         <form className="register__form" onSubmit={handleSubmit}>
            <h2 className="register__title">Регистрация</h2>
            <input name="email" type="email" className="register__input" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" className="register__input" placeholder="Пароль" onChange={handleChange} />
            <button className="register__button">Зарегистрироваться</button>
         </form>
         <div className="register__signin">
            <p className="register__signin-text">Уже зарегистрировались?</p>
            <Link to="/sign-in" className="register__login-link" onClick={()=>{changeLink('/sign-in')}}>Войти</Link>
         </div>
      </div>
   )
}

export default Register