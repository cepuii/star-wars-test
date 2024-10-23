import { useState } from "react";
import { PEOPLE_IMG_URL } from "../../../constants/urls";
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
      <div onClick={handleClick} className="card">
        {person?.id && (
          <img
            src={`${PEOPLE_IMG_URL}${person?.id}.jpg`}
            alt={person?.name ?? "character"}
            className="card__img"
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
