import React, { useReducer } from 'react';
import axios from "axios";

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER
} from "../types";

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search User
    const searchUsers = async (text) => {
        setLoading();

        const response = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items
        });
    }

    // Get User
    const getUserDetails = async (username) => {
        setLoading();

        const response = await axios.get(`http://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: GET_USER,
            payload: response.data,
        })
    }

    // Get Repos
    const getUserReposDetails = async (username) => {
        setLoading();

        const response = await axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: GET_REPOS,
            payload: response.data
        });
    }

    // Clear Users
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS
        })
    }

    // Set Loading
    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return (
        <GithubContext.Provider value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUserDetails,
            getUserReposDetails,
        }}
        >
            {props.children}
        </GithubContext.Provider>
    );
}

export default GithubState;

