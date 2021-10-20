import React, { useEffect } from 'react';
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
import { useStore } from '../stores/store';
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <></>
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
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
                <Route path='/login' component={LoginForm} />
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
