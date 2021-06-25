import { useEffect } from 'react';

function ImagePopup({ card, onClose }) {
   const { isOpen, name, src } = card;
   const className = isOpen ? "layout layout_active" : "layout";

   function closePopupOverlay(e) {
      if (e.target.classList.contains("layout")) onClose();
   }

   useEffect(() => {
      if (!isOpen) return;
      const handleEscClose = (e) => {
         if (e.key === "Escape") onClose()
      };
      document.addEventListener("keydown", handleEscClose);
      return () => {
         document.removeEventListener("keydown", handleEscClose);
      };
   }, [isOpen, onClose])

   return (
      <div className={className} id="image-popup" onClick={closePopupOverlay}>
         <div className="img-popup">
            <img src={src} alt={name} className="img-popup__image" />
            <button onClick={onClose} type="button" className="del-button"></button> 
            <h2 className="img-popup__title">{name}</h2>
         </div>  
      </div>
   )
}

export default ImagePopup;