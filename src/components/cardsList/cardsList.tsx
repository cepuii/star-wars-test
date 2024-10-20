import { useEffect, useState } from "react";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PEOPLE_URL } from "../../constants/urls";
import useFetch from "../../hooks/useFetch";
import CardItem from "./cardItem/cardItem";

import "swiper/css";
import useResponsiveWidth from "../../hooks/useResponsiveWidth";
import Loader from "../ui/loader/loader";
import "./CardsList.style.css";

interface PeopleApiData {
  results: Person[];
  previous?: string;
  next?: string;
}

const CardsList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const width = useResponsiveWidth();
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [fetchUrl, setFetchUrl] = useState(PEOPLE_URL);
  const { data, loading } = useFetch<PeopleApiData>(fetchUrl);

  useEffect(() => {
    if (data) {
      setPeople((previous) => {
        const uniquePersons = data.results.filter(
          (person) =>
            !previous.some((existingPerson) => existingPerson.id === person.id)
        );
        return [...previous, ...uniquePersons];
      });
      setNextPageUrl(data.next ?? "");
    }
  }, [data]);

  useEffect(() => {
    if (width < 600) {
      setSlidesPerView(1);
    } else if (width >= 600 && width < 1200) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(3);
    }
  }, [width, slidesPerView]);

  if (loading) return <Loader />;

  const handleSlideChange = (peopleLength: number, index: number) => {
    if (index >= peopleLength / slidesPerView - 2 && !!nextPageUrl) {
      setFetchUrl(nextPageUrl);
    }
  };

  return (
    <Swiper
      speed={1500}
      parallax={true}
      className="slider"
      slidesPerView={1}
      direction="vertical"
      spaceBetween={30}
      mousewheel={true}
      modules={[Mousewheel]}
      onSlideChange={(swiper) =>
        handleSlideChange(people.length, swiper.activeIndex)
      }
    >
      {people?.map((person, index) => (
        <SwiperSlide key={person.id} className="slider__item">
          <div className="slider__item__wrapper">
            <CardItem person={people[index * slidesPerView]} />
            {slidesPerView > 1 && people[index * slidesPerView + 1] && (
              <CardItem person={people[index * 3 + 1]} />
            )}
            {slidesPerView > 2 && people[index * slidesPerView + 2] && (
              <CardItem person={people[index * 3 + 2]} />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardsList;
