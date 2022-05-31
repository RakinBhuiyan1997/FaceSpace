import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./Homepage";
import ProfilePage from "./ProfilePage";
import SignIn from "./SignIn";

import HeaderBar from "./Header";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <HeaderBar />
        <GlobalStyles />
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/api/users/:userId" component={ProfilePage} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
