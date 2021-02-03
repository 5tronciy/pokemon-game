import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import MenuHeader from "./components/MenuHeader";
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import NotFound from "./routes/NotFound";

const App = () => {
  return (
    <Router>
      <MenuHeader />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/game" component={GamePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
