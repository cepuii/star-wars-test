import "./cardItem.style.css";

interface CardItemProps {
  person: Person;
}
const CardItem = ({ person }: CardItemProps) => {
  return (
    <div onClick={() => {}}>
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${person?.id}.jpg`}
        alt={person?.name ?? "character"}
        className="card"
      />
      <h2 className="card__title">{person?.name}</h2>
    </div>
  );
};

export default CardItem;
