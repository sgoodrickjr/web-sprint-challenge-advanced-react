import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import  {useDarkMode} from "./components/useDarkMode"

import PlantList from "./components/PlantList";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";

import Navbar from "./components/Navbar";

import "./App.css";



function App() {

  // array of plants that have been added to the cart
  const [cart, setCart] = useState([]);

  // add a plant to the cart
  const addToCart = (plant) => {
    setCart([...cart, plant]);
  };

  // remove a plant from the cart
  const removeFromCart = (plant) => {
    setCart(cart.filter((p) => p.id !== plant.id));
  };

  // const [theme, themeToggler, mountedComponent] = useDarkMode();

  // const themeMode = theme === 'light' ? lightTheme : darkTheme;
  
  // if(!mountedComponent) return <div/>
  
  return (
    // <ThemeProvider theme={themeMode}>
    //   <>
    //   <GlobalStyles/>
    //    <Toggle theme={theme} toggleTheme={themeToggler} />
    <div>
      <Router>
        <nav className="container">
          <h1>
            React Plants <span role="img">🌿</span>
          </h1>
          {/* <button onClick={themeToggler}>Switch Theme</button> */}
          <ul className="steps">
            <li>
              <NavLink exact to="/">
                Plants
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                Cart
                <span className="cart-badge">
                  {cart.length > 0 && cart.length}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Route
          exact
          path="/"
          render={() => <PlantList addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          render={(props) => (
            <ShoppingCart
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
            />
          )}
        />
        <Route path="/checkout" component={CheckoutForm} />
      </Router>
    </div>
    // </>
    // </ThemeProvider>
  );
}

export default App;
