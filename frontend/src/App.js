import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RestaurantList from "./components/restaurantsList";
import Restaurant from "./components/restaurant";
import Login from "./components/login";
import AddReview from "./components/addRewiew";

function App() {

  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Restaurant Review</a>

        <div className="mr-auto navbar-nav" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/restaurants"} className="nav-link">Restaurants</Link>
            </li>
            <li className="nav-item">
              {
                user ? (
                  <a onClick={logout} className="nav-link">Logout</a>
                ) : (
                  <Link to={"/login"} className="nav-link" >Login</Link>
                )
              }
            </li>
          </ul>
        </div>

      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" component={RestaurantList} />
          <Route path="/restaurants" component={RestaurantList} />

          <Route path="/restaurants/:id/review"
            render={(props) => {
              <AddReview {...props} user={user} />
            }}
          />

          <Route path="/restaurants/:id"
            render={(props) => {
              <Restaurant {...props} user={user} />
            }}
          />

          <Route path="/login"
            render={(props) => {
              <Login {...props} login={login} />
            }}
          />

        </Routes>
      </div>

    </div>
  );
}

export default App;
