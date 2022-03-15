import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { UseAuth } from "./custom-hooks";

import {
  Posts,
  Me,
  LoginOrRegister,
  Nav,
  NewPost,
  Message,
} from "./components";

const App = () => {
  const { token, isLoggedIn, logout } = UseAuth();

  return (
    <Router>
      <Nav />
      <Switch>
        {isLoggedIn && (
          <>
            <Route exact path="/posts" component={Posts} />
            <Route path="/posts/new" component={NewPost} />
            <Route exact path="/me" component={Me} />
            <Route path="/posts/:postId/messages/new" component={Message} />
          </>
        )}

        {!isLoggedIn && (
          <>
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/login" component={LoginOrRegister} />
            <Route exact path="/register" component={LoginOrRegister} />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
