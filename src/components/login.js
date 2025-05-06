import Form from '@rjsf/core';
// import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
// import { useDispatch } from 'react-redux';
// import { fetchLogin } from '../actions';

export const Login = () => {
    const form = {
        title: 'Log in',
        description: 'Type your email and password',
        type: 'object',
        required: ['user', 'pass'],
        properties: {
            user: {
                type: 'string',
                title: 'Email'
            },
            pass: {
                type: 'string',
                title: 'Password'
            }
        }
    };
    const ui = {
        user: {
            'ui:options': {
                inputType: 'email'
            }
        },
        pass: {
            'ui:widget': 'password'
        }
    };
    // const dispatch = useDispatch();
    const handleLogin = FormData => {
        // dispatch(fetchLogin(FormData.formData.user, FormData.formData.pass));
        console.log('nada');
        console.log(FormData);
    };
    return(
        <Form schema={form} uiSchema={ui} validator={validator} onSubmit={handleLogin} />
    )
};