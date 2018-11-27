import React from 'react';
import styled from 'styled-components';
import Form from '../Common/Form/Form';
import FormInput from '../Common/Form/FormInput';
import SubmitButton from '../Common/Form/SubmitButton';
import { Email, Lock } from '../Common/Icon';
import { Authenticate } from '../../state/auth';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginContainer>
                <LoginText>Sign in to manage your house reservations.</LoginText>
                <Authenticate>
                    {(loginUser, isLoading, isSuccess, error) => {
                        console.log(isSuccess);
                        if (isSuccess) return <Redirect to={'/dashboard'} />;
                        return (
                            <Form onSubmit={loginUser}>
                                <FormInput fieldName={'email'} icon={Email} />
                                <FormInput fieldName={'password'} icon={Lock} type={'password'} />
                                <SubmitButton>Sign in</SubmitButton>
                            </Form>
                        );
                    }}
                </Authenticate>
            </LoginContainer>
        );
    }
}

const LoginContainer = styled.div`
    padding: 35px 7.5px 7.5px;
    background-color: #fff;
    width: 450px;
    text-align: center;

    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
`;

const LoginText = styled.span`
    font-family: 'Raleway', sans-serif;
    font-size: 18px;

    color: #555;
`;
