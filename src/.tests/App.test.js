import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

test("Renders `Search Across Github`", () => {
  render(<App />);
  const h1Element = screen.getByText(/Search Across Github/i);
  expect(h1Element).toBeInTheDocument();
});


test("Link Clicks Lead to new route with query passed", async () => {
  render(<App />);
  const h1Element = screen.getByText(/Search Across Github/i);
  expect(h1Element).toBeInTheDocument();

  const GoogleButton = screen.getByText(/Google/i);
  await fireEvent.click(GoogleButton);

  const hasNavigatedToNewWindow =
    window.location.href.includes("/result?q=Google");

  expect(hasNavigatedToNewWindow).toBe(true);

  window.history.back();
});
