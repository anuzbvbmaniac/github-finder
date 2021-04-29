import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import axios from "axios";
import './app.css';
import Users from "./components/users/Users";

class App extends Component {

    state = {
        users: [],
        loading: false,
    }

    async componentDidMount() {
        this.setState({ loading: true });

        // axios.get('https://api.github.com/users').then(response => console.log(response.data));
        const response = await axios.get(`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({
            users: response.data,
            loading: false,
        });
    }

    render() {
        return (
            <div className={'App'}>
                <Navbar title={'Github Finder'} icon={'fab fa-github'}/>
                <Users loading={this.state.loading} users={this.state.users}/>
            </div>
        )
    }

}

export default App;
