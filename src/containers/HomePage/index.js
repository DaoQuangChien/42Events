import React, { useEffect } from "react";
import Card from "antd/lib/card";
import notification from "antd/lib/notification";
import Slider from "react-slick";
import EventLink from "../../components/EventLink";
import RaceEvent from "../../components/RaceEvent";
import useWindowSize from "../../hooks/useWindowSize";
import useFetch from "../../hooks/useFetch";
import { EventContext } from "../../event-context";
import { useHistory } from "react-router";
import { EVENTS, RACE_EVENTS_ENDPOINT } from "../../constants";
import "./style.scss";

const SlickArrowLeft = ({ currentSlide, slideCount, image, ...props }) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <img src={image} alt="nav-btn" />
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, image, ...props }) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    <img src={image} alt="nav-btn" />
  </button>
);
const HomePageEventConsumer = ({ setEventType }) => {
  const history = useHistory();
  const { loading, data, error } = useFetch(RACE_EVENTS_ENDPOINT);
  const [windowSize] = useWindowSize();
  const { featured, startingSoon, popular, newRelease, free, past } =
    data.data || {};
  const featuredEventsSetting = {
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const commonEventSetting = {
    infinite: false,
    slidesToShow: windowSize.isDesktopSize ? 2 : 1,
    slidesToScroll: windowSize.isDesktopSize ? 2 : 1,
    adaptiveHeight: true,
    nextArrow: (
      <SlickArrowRight image="https://s3-ap-southeast-1.amazonaws.com/web42-assets/images/icons/forward@2x.png" />
    ),
    prevArrow: (
      <SlickArrowLeft image="https://s3-ap-southeast-1.amazonaws.com/web42-assets/images/icons/back@2x.png" />
    ),
  };
  const commonEventSections = [
    {
      title: "Starting soon",
      events: startingSoon,
    },
    {
      title: "Popular",
      events: popular,
    },
    {
      title: "New releases",
      events: newRelease,
    },
    {
      title: "Free",
      events: free,
    },
    {
      title: "Past events",
      events: past,
    },
  ];
  const handleEventLinkClick = (type) => () => {
    setEventType(type);
    history.push("/races");
  };

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong!!",
      });
    }
  }, [error]);
  return (
    <div className="home-page">
      <section className="section-featured-events">
        {loading ? (
          <Card loading />
        ) : (
          <Slider {...featuredEventsSetting}>
            {featured?.map((featuredEvent) => (
              <div key={featuredEvent._id}>
                <img src={featuredEvent.banner_card} alt={featuredEvent.slug} />
              </div>
            ))}
          </Slider>
        )}
      </section>
      <section className="section-event">
        <h1 className="section-event-title large">Events</h1>
        <div className="section-event-content">
          {EVENTS.map((event, i) => (
            <EventLink
              {...event}
              key={i}
              onClick={handleEventLinkClick(event.value)}
            />
          ))}
        </div>
      </section>
      {commonEventSections.map((eventSection, i) => (
        <section className="section-event" key={i}>
          <h3 className="section-event-title">{eventSection.title}</h3>
          <div className="section-event-slider">
            <Slider {...commonEventSetting}>
              {eventSection.events?.map((event) => (
                <RaceEvent raceEvent={event} key={event._id} />
              ))}
            </Slider>
          </div>
        </section>
      ))}
    </div>
  );
};
const HomePage = () => (
  <EventContext.Consumer>
    {({ setEventType }) => (
      <HomePageEventConsumer setEventType={setEventType} />
    )}
  </EventContext.Consumer>
);

export default HomePage;
