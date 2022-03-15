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
  // two sets of routes here
  // isLoggedIn > these are protected routes for privileged user actions like creating/updating/deleting, all these routes require token access from the useAuth() hook
  // !isLoggedIn > these are available to users who aren't authenticated yet, includes login/signup, posts, and optionally some sort of home/splash page (but that can just be redirect to /posts)
  // put this last, will catch any route we didn't define: <Redirect to="/posts"/>

  // authenticated routes include: create a new post, edit an existing post, create a new message, see my "stuff" at some sort of /me route fetching the "me" object from /api/<cohort-name>/users/me

  // <Route path="/posts/new" component={() => <div>hi im posts/new</div>}/>
  //   const { token, isLoggedIn, logout } = UseAuth();
  //   const route = (
  //     <div>
  //       <div>token value is: {token || "''"}</div>
  //       <div>isLoggedIn? {isLoggedIn.toString()}</div>
  //       <Form />
  //       <button onClick={() => logout()}>Logout</button>
  //     </div>
  //   );

  //   return (
  //     <Router>
  //       <nav>
  //         {isLoggedIn && <Link to="/">logged in link</Link>}
  //         {!isLoggedIn && <Link to="/">logged out link</Link>}
  //       </nav>

  //       <Route path="/" component={() => route} />

  //       {/* this would be an example of an UNAUTHENTICATED ROUTE */}
  //       {!isLoggedIn && <Route path="/posts" component={<Posts />} />}
  //     </Router>
  //   );
  // };

  // const Login = () => <div>I'll be the login page</div>;

  const { token, isLoggedIn, logout } = UseAuth();
  const IndividualPost = () => <div>I'll be an individual post</div>;
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

        <Route exact path="/posts/:post_id" component={IndividualPost} />
      </Switch>
    </Router>
  );
};

export default App;
