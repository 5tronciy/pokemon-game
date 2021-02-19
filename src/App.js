import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import FirebaseService from "./services/firebase";

import { DatabaseContext } from "./context/databaseContext";
import MenuHeader from "./components/MenuHeader";
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import NotFound from "./routes/NotFound";

const App = () => {
  return (
    <DatabaseContext.Provider value={new FirebaseService()}>
      <Router>
        <MenuHeader />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/game" component={GamePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </DatabaseContext.Provider>
  );
};

export default App;
