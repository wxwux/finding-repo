import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ErrorBoundary from "./boundary";
import LinearProgress from "@material-ui/core/LinearProgress";

const MainPage = lazy(() => import("./pages/MainPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const RepoPage = lazy(() => import("./pages/RepoPage"));

const App = () => {
  return (
    <ErrorBoundary>
      <SnackbarProvider maxSnack={3}>
        <Suspense
          fallback={
            <LinearProgress color="secondary" style={{ width: "100%" }} />
          }
        >
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
    </ErrorBoundary>
  );
};

export default App;
