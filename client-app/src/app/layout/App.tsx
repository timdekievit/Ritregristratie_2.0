import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/Homepage';
import RideDashboard from '../../features/rides/dashboard/RideDashboard';
import RideDetails from '../../features/rides/details/RideDetails';
import RideForm from '../../features/rides/form/RideForm';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/rides' component={RideDashboard} />
                <Route path='/rides/:id' component={RideDetails} />
                <Route key={location.key} path={['/createRide', '/manage/:id']} component={RideForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
