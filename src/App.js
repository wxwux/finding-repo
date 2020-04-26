import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
const RepoPage = lazy(() => import("./pages/RepoPage"));

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Suspense fallback="loading">
        <Router>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/:owner/:title" exact component={RepoPage} />
            <Route path="/auth" component={AuthPage} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </Suspense>
    </SnackbarProvider>
  );
};

export default App;
