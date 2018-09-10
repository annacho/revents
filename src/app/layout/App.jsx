import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard.jsx';
import NavBar from '../../features/nav/NavBar/NavBar.jsx';
import EventForm from '../../features/events/EventForm/EventForm.jsx';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard.jsx';
import UserDetailPage from '../../features/user/UserDetail/UserDetailPage.jsx';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard.jsx';
import EventDetailPage from '../../features/events/EventDetail/EventDetailPage.jsx';
import HomePage from '../../features/home/HomePage.jsx';
import TestComponent from '../../features/testarea/TestComponent.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomePage}/>
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar/>
              <Container className="main">
                <Switch>
                  <Route path='/events' component={EventDashboard}/>
                  <Route path='/event/:id' component={EventDetailPage}/>
                  <Route path='/people' component={PeopleDashboard}/>
                  <Route path='/profile/:id' component={UserDetailPage}/>
                  <Route path='/settings' component={SettingsDashboard}/>
                  <Route path='/createEvent' component={EventForm}/>
                  <Route path='/manage/:id' component={EventForm}/>
                  <Route path='/test' component={TestComponent}/>
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
