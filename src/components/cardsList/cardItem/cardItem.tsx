import { useState } from "react";
import CardInfoModal from "../../cardInfoModal/cardInfoModal";
import "./cardItem.style.css";

interface CardItemProps {
  person: Person;
}
const CardItem = ({ person }: CardItemProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={handleClick}>
        {person?.id && (
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${person?.id}.jpg`}
            alt={person?.name ?? "character"}
            className="card"
          />
        )}
        <h2 className="card__title">{person?.name}</h2>
      </div>
      {open && (
        <CardInfoModal
          person={person}
          open={open}
          handleClose={handleClose}
        ></CardInfoModal>
      )}
    </>
  );
};

export default CardItem;
