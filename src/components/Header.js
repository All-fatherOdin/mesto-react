import { Link } from 'react-router-dom';
import logo from '../images/icons/header-logo.svg';

function Header({link, changeLink, handleLogout, userEmail}){
   function checkUrl() {
      return link === '/sign-in' ? 
      <Link to="/sign-up" className="header__link" onClick={()=>{changeLink('/sign-up')}}>Регистрация</Link> :
      link === '/sign-up' ? <Link to="/sign-in" className="header__link" onClick={()=>{changeLink('/sign-in')}}>Вход</Link> : link === '/main' ?
      (<div className="header__link-container">
         {console.log(userEmail)}
         <p className="header__text">{userEmail}</p>
         <Link to="/sign-in" className="header__link" onClick={()=>{
            changeLink('/sign-in');
            handleLogout();
         }}>Выход</Link> 
      </div>) : null;
   }

   return (
      <header className="header">
         <img src={logo} alt="логотип место." className="header__logo" />
         {checkUrl()}
      </header>
   )
}

export default Header; 