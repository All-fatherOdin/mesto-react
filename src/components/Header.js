import logo from '../images/icons/header-logo.svg';

function Header(){
   return (
      <header className="header">
         <img src={logo} alt="логотип место." className="header__logo" />
      </header>
   )
}

export default Header; 