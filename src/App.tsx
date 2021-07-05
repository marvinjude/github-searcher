import { createContext, useContext, useEffect } from 'react'
import styled from "styled-components";
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import ResultsPage from './pages/ResultsPage';
import Home from './pages/Home';

import { themes } from "./themes";
import { GlobalStyles } from './GlobalsStyles';
import useLocalStorage from './hooks/useLocalStorage';


type AppContextVales = {
  isDarkMode?: string;
  setIsDarkMode?: (value: boolean) => void;
}

export const AppContext = createContext<AppContextVales>({});

export const useAppContext = () => useContext(AppContext);


const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.foregroundColor};
  font-family: "Manrope", sans-serif;
  transition: all 0.2s linear;
`;


function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", true);

  useEffect(() => {
    const appHeight = () => {
      const innerHeight = window.innerHeight;
      const doc = document.documentElement;

      console.log(innerHeight)

      doc.style.setProperty('--app-height', `${innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)

    appHeight()

    return () => {
      window.removeEventListener('resize', appHeight)
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode
      }}>
      <ThemeProvider theme={isDarkMode ? themes.dark : themes.light}>
        <AppWrapper>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/result" component={ResultsPage}></Route>
          </Switch>
        </AppWrapper>
        <GlobalStyles />
      </ThemeProvider>
    </AppContext.Provider>

  )
}

export default App;
