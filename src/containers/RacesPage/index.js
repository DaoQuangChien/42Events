import React, { useState, useEffect } from "react";
import Spin from "antd/lib/spin";
import notification from "antd/lib/notification";
import Switch from "antd/lib/switch";
import SelectComponent from "../../components/SelectComponent";
import {
  SORT_OPTIONS,
  SPORT_TYPE_FILTERS,
  DATE_FILTERS,
  EVENT_TYPE_FILTERS,
  PRICE_FILTERS,
  LIMIT,
  RACE_FILTERS_ENDPOINT,
} from "../../constants";
import { EventContext } from "../../event-context";
import RaceEvent from "../../components/RaceEvent";
import useFetch from "../../hooks/useFetch";
import useDetetcScrollBottomPage from "../../hooks/useDetetcScrollBottomPage";
import "./style.scss";

const RacesPageEventConsumer = ({ eventType }) => {
  const [queryParamsObj, setQueryParamsObj] = useState({
    skipCount: 0,
    limit: LIMIT,
  });
  const [isMedalView, setIsMedalView] = useState(false);
  const [requestUrl, setRequestUrl] = useState("");
  const { data, loading, error } = useFetch(requestUrl);
  const [isBottom] = useDetetcScrollBottomPage(1000);
  const { totalData } = data || {};
  const [events, setEvents] = useState([]);
  const [canLoadmore, setCanLoadmore] = useState(false);
  const handleOptionSelect = (key) => (selectedOption) => {
    setCanLoadmore(false);
    setQueryParamsObj({
      ...queryParamsObj,
      skipCount: 0,
      [key]: selectedOption,
    });
  };
  const handleLoadmore = () => {
    const { skipCount } = queryParamsObj;

    if (events.length < totalData) {
      setCanLoadmore(true);
      setQueryParamsObj({
        ...queryParamsObj,
        skipCount: skipCount + LIMIT,
      });
    }
  };
  const filters = [
    {
      title: "Sort by",
      options: SORT_OPTIONS,
      renderSelected: (
        <p className="sort-title">Sort: {queryParamsObj?.sort?.title}</p>
      ),
      value: queryParamsObj.sort,
      onSelect: handleOptionSelect("sort"),
    },
    {
      title: "Sports",
      options: SPORT_TYPE_FILTERS,
      value: queryParamsObj.sportType,
      onSelect: handleOptionSelect("sportType"),
    },
    {
      title: "Dates",
      options: DATE_FILTERS,
      value: queryParamsObj.dates,
      onSelect: handleOptionSelect("dates"),
    },
    {
      title: "Event type",
      options: EVENT_TYPE_FILTERS,
      style: {
        width: "400px",
      },
      value: queryParamsObj.eventType,
      onSelect: handleOptionSelect("eventType"),
    },
    {
      title: "Price",
      options: PRICE_FILTERS,
      value: queryParamsObj.price,
      onSelect: handleOptionSelect("price"),
    },
  ];
  const handleSetMedalView = (checked) => setIsMedalView(checked);

  useEffect(() => {
    setQueryParamsObj({
      ...queryParamsObj,
      sort: SORT_OPTIONS[0],
      sportType: SPORT_TYPE_FILTERS.find((type) => type.value === eventType),
      dates: DATE_FILTERS[0],
      eventType: EVENT_TYPE_FILTERS[0],
      price: PRICE_FILTERS[0],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventType]);
  useEffect(() => {
    const queryParams = Object.entries(queryParamsObj)
      .filter(([_, data]) => {
        if (data.value !== undefined && data.value !== null) {
          return data.value;
        } else {
          return data !== undefined && data !== null;
        }
      })
      .map(([key, data]) => `${key}=${data.value || data}`)
      .join("&");

    setRequestUrl(`${RACE_FILTERS_ENDPOINT}?${queryParams}`);
  }, [queryParamsObj]);
  useEffect(() => {
    if (canLoadmore) {
      setEvents((curEvents) => [...curEvents, ...(data?.data || [])]);
    } else {
      setEvents(data?.data || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    if (isBottom) {
      handleLoadmore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);
  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong!!",
      });
    }
  }, [error]);
  return (
    <div className="races-page">
      <div className="filter">
        {filters.map((filter, i) => (
          <div className="filter-wrapper" key={i}>
            <SelectComponent className="filter" {...filter} />
          </div>
        ))}
      </div>
      <div className="events">
        <div className="events-header">
          <p className="events-count">
            {totalData || 0} {totalData > 1 ? "events" : "event"}
          </p>
          <div className="switch-mode">
            <p>Medal View</p>
            <Switch onChange={handleSetMedalView} />
          </div>
        </div>
        <div className="events-container">
          {events.length > 0 &&
            events.map((event) => (
              <RaceEvent
                horizontal
                raceEvent={event}
                key={event._id}
                isMedalView={isMedalView}
              />
            ))}
        </div>
        {loading && (
          <div className="events-loading">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};
const RacesPage = () => (
  <EventContext.Consumer>
    {({ eventType }) => <RacesPageEventConsumer eventType={eventType} />}
  </EventContext.Consumer>
);

export default RacesPage;
