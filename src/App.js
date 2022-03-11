import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import { Form } from "./components";

function App() {
  const { token, isLoggedIn, logout } = useAuth();

  const route = (
    <div>
      <div>token value is: {token || "''"}</div>
      <div>isLoggedIn? {isLoggedIn.toString()}</div>
      <Form />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );

  return (
    <Router>
      <nav>
        {isLoggedIn && <Link to="/">logged in link</Link>}
        {!isLoggedIn && <Link to="/">logged out link</Link>}
      </nav>

      <Route path="/" component={() => route} />

      {/* this would be an example of an UNAUTHENTICATED ROUTE */}
      {!isLoggedIn && (
        <Route
          path="/pizza"
          component={() => <div>not logged in with pizza</div>}
        />
      )}
    </Router>
  );
}

export default App;
