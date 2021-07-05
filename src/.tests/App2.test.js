import { fireEvent, render } from "@testing-library/react";
import App from "../App";

test("Submit button click leads to new route with query passed", async () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  const SubmitButton = getByText(/Search/i, { selector: "button" });
  const input = getByPlaceholderText("Search here");

  fireEvent.change(input, { target: { value: "Google" } });
  fireEvent.click(SubmitButton);

  const hasNavigatedToNewWindow =
    window.location.href.includes("/result?q=Google");

  expect(hasNavigatedToNewWindow).toBe(true);
});
