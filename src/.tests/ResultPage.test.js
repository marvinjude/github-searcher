import {
    fireEvent,
    render,
    screen,
    act,
    cleanup,
  } from "@testing-library/react";
  import { Router } from "react-router-dom";
  import { createMemoryHistory } from "history";
  import App from "../App";
  
  test("Navigating to Result page with a query should render a users list", async () => {
    const history = createMemoryHistory();
  
    await act(async () => {
      history.push("/result?q=Google");
  
      const { findByTestId } = render(
        <Router history={history}>
          <App />
        </Router>
      );
  
      const listNode = await findByTestId("user-list");
  
      expect(listNode).toBeInTheDocument();
    });
  });
  
  test("Navigating to Result page without a query should show `An error occured`", async () => {
    const history = createMemoryHistory();
  
    await act(async () => {
      history.push("/result");
  
      const { findByText } = render(
        <Router history={history}>
          <App />
        </Router>
      );
  
      const errorTextElem = await findByText(/An Error Occured/);
  
      expect(errorTextElem).toBeInTheDocument();
    });
  });
  
  test("Searching for bad user login should show `I can't find anything`", async () => {
    const history = createMemoryHistory();
    const inputValue = "buhdwbvayucvhsgduwyhaduyxhwuadgxwhaducxwsau";
  
    await act(async () => {
      history.push("/result");
  
      const { findByText } = render(
        <Router history={history}>
          <App />
        </Router>
      );
  
      const SubmitButton = await findByText(/Search/i, {
        selector: "button",
      });
  
      const input = screen.getByPlaceholderText("Search here");
  
      await fireEvent.change(input, {
        target: { value: inputValue },
      });
  
      await fireEvent.click(SubmitButton);
  
      const listNode = await findByText(/I can't find anything/);
  
      expect(listNode).toBeInTheDocument();
  
      expect(listNode).toBeInTheDocument();
  
      cleanup();
    });
  });
  