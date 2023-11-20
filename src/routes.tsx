import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import MainLanding from './containers/MainLanding';
import CommitFunds from './containers/CommitFunds';
import CommitAssets from './containers/CommitAssets';

import WelcomeToke from './components/WelcomeToke';
import WelcomeToke2 from './components/WelcomeToke2';

const MainContainer = styled.div`
  margin-top: 5rem;
`;

function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/welcome">
        <MainContainer className="w-full flex flex-col justify-center items-center">
          <WelcomeToke width={800} height={500} />
        </MainContainer>
      </Route>
      <Route path="/welcome2">
        <MainContainer className="w-full flex flex-col justify-center items-center">
          <WelcomeToke2 width={800} height={500} />
        </MainContainer>
      </Route>
      <Route path="/commitfunds">
        <CommitFunds />
      </Route>
      <Route path="/commitassets">
        <CommitAssets />
      </Route>
      <Route path="/">
        <MainLanding />
      </Route>
    </Switch>
  );
}

export default Routes;
