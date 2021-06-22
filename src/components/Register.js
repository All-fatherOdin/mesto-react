import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../hooks/useForm';

function Register({handleRegister, changeLink}){
   const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(".register__form");
   const buttonStatus = isValid ? "register__button" : 
   "register__button register__button_inactive";

   function handleSubmit(e){
      e.preventDefault();
      let { email, password } = values;
      handleRegister({ email, password })
      resetForm()
   }

   function changeHeaderLink() {
      changeLink('/sign-in')
   }

   return(
      <div className="register">
         <form className="register__form" onSubmit={handleSubmit}>
            <h2 className="register__title">Регистрация</h2>
            <input 
               name="email" 
               type="email" 
               className="register__input"
               value={values["email"] || ""} 
               placeholder="Email" 
               onChange={handleChange}
               required
            />
            <span className="form-text-error form-text-error_login">
               {errors["email"] || ""}
            </span>

            <input 
               name="password" 
               type="password" 
               className="register__input" 
               minLength="4"
               maxLength="10"
               value={values["password"] || ""} 
               placeholder="Пароль" 
               onChange={handleChange}
            />
            <span className="form-text-error form-text-error_login">
               {errors["password"] || ""}
            </span>

            <button className={buttonStatus}>Зарегистрироваться</button>
         </form>
         <div className="register__signin">
            <p className="register__signin-text">Уже зарегистрировались?</p>
            <Link 
               to="/sign-in" 
               className="register__login-link" 
               onClick={changeHeaderLink}
            >
               Войти
            </Link>
         </div>
      </div>
   )
}

export default Register