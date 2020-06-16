import React from "react";
import { render } from "@testing-library/react";
import App from './App';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
      // Arrange
  const { getByText } = render(<App />);

  // Act
  getByText(/cart/i);
  // test passes if ^ is truthy

  // Assert
});

test("form shows success message on submit with form details", () => {
      // Arrange
  const { getByTestId } = render(<App />);

  // Act
  getByTestId(/successMessage/i);
  // test passes if ^ is truthy

  // Assert

});
