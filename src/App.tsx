import { createContext, useContext } from 'react'
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import ResultsPage from './pages/ResultsPage';
import Home from './pages/Home';

import { themes } from "./themes";
import { GlobalStyles } from './GlobalsStyles';
import useLocalStorage from './hooks/useLocalStorage';

import "./App.css";

type AppContextVales = {
  isDarkMode?: string;
  setIsDarkMode?: (value: boolean) => void;
}

export const AppContext = createContext<AppContextVales>({});

export const useAppContext = () => useContext(AppContext);


const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.foregroundColor};
  font-family: "Manrope", sans-serif;
  transition: all 0.2s linear;
`;


function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", true);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode
      }}>
      <ThemeProvider theme={isDarkMode ? themes.dark : themes.light}>
        <AppWrapper>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/result" component={ResultsPage}></Route>
            </Switch>
          </Router>
        </AppWrapper>
        <GlobalStyles />
      </ThemeProvider>
    </AppContext.Provider>

  )
}

export default App;
