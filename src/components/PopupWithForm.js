function PopupWithForm({name, id, title, buttonName, isOpen, onClose, onSubmit, children}) {
   const className = isOpen ? "layout layout_active" : "layout";

   function closePopupOverlay(e) {
      if (e.target.classList.contains("layout")) {
         onClose()
      }
   }

   return (
      <div className={className} id={id} onClick={closePopupOverlay}>
         <form name={name} className="popup" onSubmit={onSubmit} noValidate>
            <h2 className="popup__title">{title}</h2>
            <fieldset className="popup__text-container">
               {children}
            </fieldset>
            <button type="submit" className="popup__save-button">{buttonName}</button>
            <button onClick={onClose} type="button" className="del-button"></button>
         </form>     
      </div>
   )
}

export default PopupWithForm;