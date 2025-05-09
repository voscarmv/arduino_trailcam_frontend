import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../components/login';
import { login } from '../actions';

const Login = () => {
    const dispatch = useDispatch();
    const handleSubmit = form => {
        console.log(form.formData);
        dispatch(login({ data: { user: { email_address: form.formData.user, password: form.formData.pass } } }));
    };
    return (
        <LoginForm handleLogin={handleSubmit} />
    );
};

export default Login;