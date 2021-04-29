import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import axios from "axios";
import './app.css';
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";

class App extends Component {

    state = {
        users: [],
        loading: false,
        alert: null
    }

    // async componentDidMount() {
    //     this.setState({ loading: true });
    //
    //     // axios.get('https://api.github.com/users').then(response => console.log(response.data));
    //     const response = await axios.get(`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //
    //     this.setState({
    //         users: response.data,
    //         loading: false,
    //     });
    // }
    const

    searchUsers = async (text) => {
        this.setState({ loading: true });

        const response = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({
            users: response.data.items,
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
            this.setState({alert: null})
        }, 5000)
    }

    render() {
        return (
            <div className={'App'}>
                <Navbar title={'Github Finder'} icon={'fab fa-github'}/>
                <div className="container">
                    <Alert alert={this.state.alert} />
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={this.state.users.length > 0}
                        setAlert={this.setAlert}
                    />
                    <Users loading={this.state.loading} users={this.state.users}/>
                </div>
            </div>
        )
    }

}

export default App;
