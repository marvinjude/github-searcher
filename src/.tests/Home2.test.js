import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";

test("Clicking the submit button leads to new route with query passed", async () => {
  const { getByText, getByPlaceholderText } = render(
    <Router>
      <App />
    </Router>
  );

  const SubmitButton = getByText(/Search/i, { selector: "button" });
  const input = getByPlaceholderText("Search here");

  fireEvent.change(input, { target: { value: "Google" } });
  fireEvent.click(SubmitButton);

  const hasNavigatedToNewWindow =
    window.location.href.includes("/result?q=Google");

  expect(hasNavigatedToNewWindow).toBe(true);
});
