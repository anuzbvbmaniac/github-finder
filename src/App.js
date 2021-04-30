import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/about";
import User from "./components/users/User";

import axios from "axios";
import './app.css';

class App extends Component {

    state = {
        users: [],
        user: {},
        loading: false,
        alert: null
    }

    searchUsers = async (text) => {
        this.setState({ loading: true });

        const response = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({
            users: response.data.items,
            loading: false,
        });
    }

    /**
     * Get Single Github User
     */
    getUserDetails = async (username) => {
        this.setState({ loading: true });

        const response = await axios.get(`http://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({
            user: response.data,
            loading: false,
        });
    }

    clearUsers = () => {
        this.setState({
            users: [],
            loading: false
        });
    }

    setAlert = (msg, type) => {
        this.setState({
            alert: { msg, type }
        });
        setTimeout(() => {
            this.setState({ alert: null })
        }, 5000)
    }

    render() {
        return (
            <Router>
                <div className={'App'}>
                    <Navbar title={'Github Finder'} icon={'fab fa-github'}/>
                    <div className="container">
                        <Alert alert={this.state.alert}/>
                        <Switch>
                            <Route path='/' exact
                                   render={props => (
                                       <>
                                           <Search
                                               searchUsers={this.searchUsers}
                                               clearUsers={this.clearUsers}
                                               showClear={this.state.users.length > 0}
                                               setAlert={this.setAlert}
                                           />
                                           <Users loading={this.state.loading} users={this.state.users}/>
                                       </>
                                   )}
                            />
                            <Route exact path={'/about'} component={About}/>
                            <Route
                                exact
                                path={'/user/:login'}
                                render={props => (
                                    <User {...props} getUserDetails={this.getUserDetails} user={this.state.user} loading={this.state.loading}/>
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }

}

export default App;
