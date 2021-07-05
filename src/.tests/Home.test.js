import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";

test("Renders `Search Across Github`", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const h1Element = screen.getByText(/Search Across Github/i);
  expect(h1Element).toBeInTheDocument();
});

test("Link Clicks Lead to new route with query passed", async () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const h1Element = screen.getByText(/Search Across Github/i);
  expect(h1Element).toBeInTheDocument();

  const GoogleButton = screen.getByText(/Google/i);
  await fireEvent.click(GoogleButton);

  const hasNavigatedToNewWindow =
    window.location.href.includes("/result?q=Google");

  expect(hasNavigatedToNewWindow).toBe(true);

  cleanup();
});
