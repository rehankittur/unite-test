import React from "react";
import styled from 'styled-components';
import { AppThemeProvider } from './theme';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import config from './config';
import { backgroundColor, globalTransition } from './theme/theme';
import UsefulTabs from 'Unite/Components/usefulTabs/index'
import News from 'Unite/Components/news';
import AppBar from 'Unite/Components/appBar';
import NavMenu from 'Unite/Components/navMenu';
import './App.css';
import { Breakpoints } from 'Unite/Utils/mediaqueries';
import useWindowSize from 'Unite/Utils/getWindowSize';
import { isSafari } from 'Unite/Utils/browserUtils';

const Container = styled.div`
  background-color: ${backgroundColor};
  transition: ${globalTransition};
  min-height: 100%;
`;

const Content = styled.div`
  min-height: 100vh;
  position: relative;
`;

const SwitchWrapper = () => {
  if (isSafari()) {
    return (
      <Switch>
        <Route exact path="/">
          <UsefulTabs />
        </Route>
        <Route >
          <UsefulTabs />
        </Route>
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/">
          <News />
        </Route>
        <Route path="/useful-links">
          <UsefulTabs />
        </Route>
        <Route >
          <News />
        </Route>
      </Switch>
    )
  }
}

function App() {
  console.log('//----------');
  console.log('versions - ' + process.env.REACT_APP_VERSION);
  console.log('redirectUri - ' + config.redirectUri);
  console.log('//----------');

  const { width } = useWindowSize();

  return (
    <AppThemeProvider>
      <Router>
        <AppBar />
        <Content>
          <Container>
            <SwitchWrapper />
          </Container>
        </Content>
        {!isSafari() && width < Breakpoints.large && <NavMenu />}
      </Router>
    </AppThemeProvider>
  );
}

export default App;
