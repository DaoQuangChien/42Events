import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./styles/styles.scss";
import HomePage from "./containers/HomePage";
import { EventContext } from "./event-context";
import RacesPage from "./containers/RacesPage";
import HeaderBar from "./components/HeaderBar";
import { BASE_WEB_URL } from "./constants";

function App() {
  const [eventType, setEventType] = useState("");
  const onSetEventType = (type) => {
    setEventType(type);
  };

  return (
    <Router>
      <EventContext.Provider
        value={{
          eventType,
          setEventType: onSetEventType,
        }}
      >
        <div className="App">
          <HeaderBar />
          <div className="container">
            <Switch>
              <Route path="/races">
                <RacesPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
          <footer className="page-footer">
            <a href={BASE_WEB_URL}>© 2021 42Race</a>
            <span>.</span>
            <a href="https://faq.42race.com/">Guide</a>
            <span>.</span>
            <a href={`${BASE_WEB_URL}/contact`}>Contact</a>
          </footer>
        </div>
      </EventContext.Provider>
    </Router>
  );
}

export default App;
