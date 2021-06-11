export const getRaceEvents = () =>
  fetch("https://api-v2-sg-staging.42race.com/api/v1/race-events").then((res) =>
    res.json()
  );
