import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots";
import SpotShow from "./components/Spots/SpotShow";
import CreateNewSpot from "./components/Spots/SpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path='/' >
          <SpotList />
        </Route>
        <Route path={'/spots/new'}>
          <CreateNewSpot />
        </Route>
        <Route path='/spots/:spotId'>
          <SpotShow />
        </Route>
        <Route>
          Page Not Found
        </Route>
        </Switch>}
    </>
  );
}

export default App;
