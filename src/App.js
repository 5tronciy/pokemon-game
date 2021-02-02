import { Route, BrowserRouter as Router } from "react-router-dom";

import MenuHeader from "./components/MenuHeader";
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";

const App = () => {
  return (
    <Router>
      <MenuHeader />

      <Route exact path="/" component={HomePage} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/game" component={GamePage} />
    </Router>
  );
};

export default App;
