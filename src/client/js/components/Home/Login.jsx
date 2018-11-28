import React, { Fragment } from 'react';
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
                        if (isSuccess) return <Redirect to={'/dashboard'} />;
                        if (error) console.log(error);
                        return (
                            <Fragment>
                                <LoginError>{error ? `Please check your username and password.` : null}</LoginError>
                                <Form onSubmit={loginUser}>
                                    <FormInput error={!!error} fieldName={'email'} icon={Email} />
                                    <FormInput error={!!error} fieldName={'password'} icon={Lock} type={'password'} />
                                    <SubmitButton disabled={isLoading}>{!isLoading ? `Sign in` : `Loading`}</SubmitButton>
                                </Form>
                            </Fragment>
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

const LoginText = styled.div`
    font-family: 'Raleway', sans-serif;
    font-size: 18px;

    color: #555;
`;

const LoginError = styled.div`
    margin-top: 5px;
    margin-bottom: -5px;
    height: 5px;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;

    color: #a74343;
`;
