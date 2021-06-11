export const SCROLL_UP = "up";
export const SCROLL_DOWN = "down";
export const TAG_MAP = {
  eventType: {
    multiple: "Multiple submission",
    single: "Single submission",
  },
  sportType: {
    walking: {
      title: "Walking",
      icon: "https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/Vector-png-ei215102019-164429",
    },
    running: {
      title: "Running",
      icon: "https://s3-ap-southeast-1.amazonaws.com/web42-assets/images/events/run-icon.png",
    },
    cycling: {
      title: "Cycling",
      icon: "https://s3-ap-southeast-1.amazonaws.com/web42-assets/images/events/cycling-icon.png",
    },
  },
};
export const DESKTOP_MIN_WIDTH = 768;
export const EVENTS = [
  {
    title: "Running",
    style: {
      backgroundColor: "rgb(8, 191, 169)",
      backgroundImage:
        "url(https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/category-run-png-nwn10102019-104426",
    },
    value: "running",
  },
  {
    title: "Cycling",
    style: {
      backgroundColor: "rgb(58, 183, 240)",
      backgroundImage:
        "url(https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/category-bike-png-udy10102019-110227)",
      backgroundSize: "49%",
    },
    value: "cycling",
  },
  {
    title: "Walking",
    style: {
      backgroundColor: "rgb(255, 112, 67)",
      backgroundImage:
        "url(https://virtual-race-submissions.s3-ap-southeast-1.amazonaws.com/images/category-walk-png-67w10102019-110311",
    },
    value: "walking",
  },
];
export const SORT_OPTIONS = [
  {
    title: "Start date",
    value: "",
  },
  {
    title: "End date",
    value: "end_date",
  },
  {
    title: "Most popular",
    value: "popular",
  },
  {
    title: "New release",
    value: "new_release",
  },
];
export const SPORT_TYPE_FILTERS = [
  {
    title: "All sport",
    value: "",
  },
  ...EVENTS,
];
export const DATE_FILTERS = [
  {
    title: "All dates",
    value: "",
  },
  {
    title: "Past events",
    value: "past",
  },
  {
    title: "This week",
    value: "week",
  },
  {
    title: "This month",
    value: "month",
  },
  {
    title: "July",
    value: "July",
  },
  {
    title: "August",
    value: "August",
  },
  {
    title: "September",
    value: "September",
  },
  {
    title: "October",
    value: "October",
  },
];
export const EVENT_TYPE_FILTERS = [
  {
    title: "All event type",
    value: "",
  },
  {
    title: "Single submission",
    customEle: (
      <>
        <p className="select-option-title">Single submission</p>
        <p className="select-option-subtitle">
          Complete the event in one submission within the event period.
        </p>
      </>
    ),
    value: "single",
  },
  {
    title: "Multiple submission",
    customEle: (
      <>
        <p className="select-option-title">Multiple submission</p>
        <p className="select-option-subtitle">
          Complete the event in one or multiple submission within the event
          period. (e.g. 1 or more, no limits)
        </p>
      </>
    ),
    value: "multiple",
  },
];
export const PRICE_FILTERS = [
  {
    title: "All price",
    value: "",
  },
  {
    title: "Free",
    value: "free",
  },
  {
    title: "Paid",
    value: "paid",
  },
];
export const LIMIT = 20;
export const RACE_EVENTS_ENDPOINT =
  "https://api-v2-sg-staging.42race.com/api/v1/race-events";
export const RACE_FILTERS_ENDPOINT =
  "https://api-v2-sg-staging.42race.com/api/v1/race-filters";
export const BASE_WEB_URL = "https://d3iafmipte35xo.cloudfront.net";
