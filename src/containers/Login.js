import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Form from '@rjsf/core';
// import { read } from '../actions';
// import { useMatch } from "react-router-dom";
import LoginForm from '../components/login';

const Login = () => {
    // const route = useMatch('/read/:table/:id');
    // const form = require('./forms/empty.json');
    // const dispatch = useDispatch();
    // const response = useSelector(state => state.response)
    const handleSubmit = () => {
        // dispatch(read({table: route.params.table, id: route.params.id}));
    };
    return (
        <LoginForm handleSubmit={handleSubmit} />
    );
};

export default Login;