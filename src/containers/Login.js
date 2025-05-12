import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../components/login';
import { login } from '../actions';

const Login = () => {
    const dispatch = useDispatch();
    const handleLogin = form => {
        dispatch(
            login({
                data: {
                    body: {
                        user: {
                            email_address: form.formData.user,
                            password: form.formData.pass
                        }
                    }
                }
            })
        );
    };
    return (
        <LoginForm handleLogin={handleLogin} />
    );
};

export default Login;