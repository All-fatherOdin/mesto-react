import { useEffect } from "react";

function PopupWithForm({ name, id, title, buttonName, 
   isOpen, onClose, onSubmit, children, isValid }) {
   const className = isOpen ? "layout layout_active" : "layout";

   const buttonStatus = isValid ? "popup__save-button" : 
   "popup__save-button popup__save-button_inactive";

   function closePopupOverlay(e) {
      if (e.target.classList.contains("layout")) {
         onClose()
      }
   }

   useEffect(() => {
      if(!isOpen) return;
      const handleEscClose = (e) => {
         if (e.key === "Escape") {
            onClose()
         }
      };
      document.addEventListener("keydown", handleEscClose);
      return () => {
         document.removeEventListener("keydown", handleEscClose);
      };
   }, [isOpen, onClose])

   return (
      <div className={className} id={id} onClick={closePopupOverlay}>
         <form name={name} className="popup" onSubmit={onSubmit} noValidate>
            <h2 className="popup__title">
               {title}
            </h2>
            <fieldset className="popup__text-container">
               {children}
            </fieldset>
            <button type="submit" className={buttonStatus}>
               {buttonName}
            </button>
            <button onClick={onClose} type="button" className="del-button"></button>
         </form>     
      </div>
   )
}

export default PopupWithForm;