import React, { Fragment } from "react";
import { BASE_WEB_URL, TAG_MAP } from "../../constants";
import "./style.scss";

const renderTag = (content, displayCondition = true) =>
  displayCondition && content && <div className="tag">{content}</div>;
const RaceEvent = ({ raceEvent, href = "#", horizontal, isMedalView }) => {
  const {
    banner_card,
    // brandRaceSlug,
    categories,
    // end_date,
    eventType,
    isBundle,
    isFreeEngraving,
    // is_brand_race,
    // is_new,
    // joined,
    // launch_date,
    medalViewImage,
    // medal_engraving_end_date,
    // raceIDs,
    racePeriod,
    racePrice,
    raceRunners,
    race_name,
    // race_name_lang,
    // race_type,
    slug,
    sportType,
    // start_date,
    // _id,
  } = raceEvent;
  const sportTypeTag = renderTag(
    <>
      <img src={TAG_MAP.sportType[sportType]?.icon} alt="sport_type" />
      <span>{TAG_MAP.sportType[sportType]?.title}</span>
    </>,
    sportType
  );
  const raceRunnersTag = renderTag(`${raceRunners} joined`, raceRunners);
  const racePriceTag = renderTag(racePrice);
  const categoryTags =
    categories?.map((category, i) => (
      <Fragment key={i}>{renderTag(category)}</Fragment>
    )) || [];
  const eventTypeTag = renderTag(TAG_MAP.eventType[eventType], eventType);
  const tags = [
    sportTypeTag,
    raceRunnersTag,
    racePriceTag,
    ...categoryTags,
    eventTypeTag,
  ];

  return (
    <div className={isMedalView ? "race-event medal" : "race-event"}>
      <a
        className={
          horizontal ? "race-event-link horizontal" : "race-event-link"
        }
        href={`${BASE_WEB_URL}/${isBundle ? "race-bundle" : "race"}/${slug}`}
      >
        <div className="race-event-banner">
          {isMedalView ? (
            <img src={medalViewImage} alt={slug} />
          ) : (
            <img src={banner_card} alt={slug} />
          )}
          {isFreeEngraving && (
            <p className="race-event-medal">free medal engraving</p>
          )}
        </div>
        <div className="race-event-info">
          <div className="race-event-title">{race_name}</div>
          <div className="race-event-date">{racePeriod}</div>
          <div className="tags">
            {tags.map((tag, i) => (
              <Fragment key={i}>{tag}</Fragment>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
};

export default RaceEvent;
