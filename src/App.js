import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/about";
import User from "./components/users/User";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

import './app.css';

const App = () => {

    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className={'App'}>
                        <Navbar title={'Github Finder'} icon={'fab fa-github'}/>
                        <div className="container">
                            <Alert/>
                            <Switch>
                                <Route path='/' exact
                                       render={props => (
                                           <>
                                               <Search/>
                                               <Users/>
                                           </>
                                       )}
                                />
                                <Route exact path={'/about'} component={About}/>
                                <Route
                                    exact
                                    path={'/user/:login'}
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    )

}

export default App;
