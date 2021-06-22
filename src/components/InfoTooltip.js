import successIcon from '../images/icons/success.svg'
import failIcon from '../images/icons/fail.svg'

function InfoTooltip({onClose, tooltipData, history, changeLink}) {
   const {isOpen, registration} = tooltipData
   const className = isOpen ? "layout layout_active" : "layout";
   const icon = registration ? successIcon : failIcon;
   const text = registration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
   function closePopupOverlay(e) {
      if (e.target.classList.contains("layout")) {
         onClose()
      }
   }
   function handelClick() {
      onClose();
      if(registration){
         history.push("/sign-in");
         changeLink('/sign-in')
      }
   }
   return(
      <div className={className} onClick={closePopupOverlay}>
         <div className="popup popup_position">
            <img className="popup__tooltip-icon" src={icon} />
            <h2 className="popup__title popup__title_position">{text}</h2>
            <button onClick={handelClick} 
               type="button" className="del-button"></button>
         </div>
      </div>
   )
}

export default InfoTooltip;