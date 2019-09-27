import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";

import { createStore, combineReducers } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

import firebase from "./firebase";

import App from "./App";
import Register from "./components/Register";
import Login from "./components/Login";

import * as serviceWorker from "./serviceWorker";
import * as userActions from "./store/actions/user";
import * as channelsActions from "./store/actions/channels";

import userReducer from "./store/reducers/user";
import channelsReducer from "./store/reducers/channels";
import Spinnner from "./components/Spinner";

const rootReducer = combineReducers({
  user: userReducer,
  channels: channelsReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Root = props => {
  const isLoading = useSelector(state => state.user.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const channelsRef = firebase
      .database()
      .ref("channels")
      .on("value", snap => {
        const snapshot = snap.val();
        let availableChannels = [];
        for (let key in snapshot) {
          availableChannels.push(snapshot[key]);
        }
        dispatch(channelsActions.setAvailableChannels(availableChannels));
      });
    return () => {
      channelsRef.off();
    };
  }, [dispatch]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(userActions.setUser(user));
        props.history.push("/");
      } else {
        dispatch(userActions.unsetUser());
        props.history.push("/login");
      }
    });
  }, [dispatch, props.history]);
  return isLoading ? (
    <Spinnner />
  ) : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

const RootWithRouter = withRouter(Root);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
