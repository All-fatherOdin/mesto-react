import { useFormWithValidation } from '../hooks/useForm';

function Login({ handleLogin }) {
   const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(".login__form");
   const buttonStatus = isValid ? "login__button" : 
   "login__button login__button_inactive";

   function handleSubmit(e) {
      e.preventDefault();
      const { email, password } = values; 
      handleLogin({ email, password });
      resetForm();
   }

   return(
      <div className="login">
         <form className="login__form" onSubmit={handleSubmit} noValidate>
            <h2 className="login__title">Вход</h2>

            <input 
               name="email" 
               type="email" 
               className="login__input"
               value={values["email"]} 
               placeholder="Email" 
               onChange={handleChange}
               required
            />
            <span className="form-text-error form-text-error_login">
               { errors["email"] || "" }
            </span>

            <input 
               name="password" 
               type="password" 
               className="login__input"
               minLength="4"
               maxLength="10"
               value={values["password"]} 
               placeholder="Пароль" 
               onChange={handleChange}
            />
            <span className="form-text-error form-text-error_login">
               { errors["password"] || "" }
            </span>

            <button className={buttonStatus}>Войти</button>
         </form>
      </div>
   ) 
}

export default Login;