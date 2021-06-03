function ImagePopup({card, onClose}) {
   const className = card.isOpen ? "layout layout_active" : "layout";

   function closePopupOverlay(e) {
      if (e.target.classList.contains("layout")) {
         onClose()
      }
   }
   return (
      <div className={className} id="image-popup" onClick={closePopupOverlay}>
         <div className="img-popup">
            <img src={card.src} alt={card.name} className="img-popup__image" />
            <button onClick={onClose} type="button" className="del-button"></button> 
            <h2 className="img-popup__title">{card.name}</h2>
         </div>  
      </div>
   )
}

export default ImagePopup;