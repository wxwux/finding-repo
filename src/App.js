import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import MainPage from "./pages/MainPage";
import RepoPage from "./pages/RepoPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/:owner/:title" exact component={RepoPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
