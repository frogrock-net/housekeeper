import React, { Fragment } from 'react';
import styled from 'styled-components';
import Form from '../Common/Form/Form';
import FormInput from '../Common/Form/FormInput';
import SubmitButton from '../Common/Form/SubmitButton';
import { Email, Lock } from '../Common/Icon';
import { Authenticate } from '../../state/auth';
import { Redirect } from 'react-router-dom';
import { ROUTE_HOUSEKEEPER } from '../../util/routes';

/**
 * The login component.
 *
 * It's a form where a user can enter their login credentials in order to log in to the application.
 */
const Login = () => (
    <LoginContainer>
        <LoginText>Sign in to manage your house reservations.</LoginText>
        <Authenticate>
            {(loginUser, isLoading, isSuccess, error) => {
                if (isSuccess) return <Redirect to={ROUTE_HOUSEKEEPER} />;
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

export default Login;

/**
 * A styled container div for the login component.
 */
const LoginContainer = styled.div`
    padding: 35px 7.5px 7.5px;
    background-color: #fff;
    width: 450px;
    text-align: center;

    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
`;

/**
 * A div that contains an instructional message for the user.
 */
const LoginText = styled.div`
    font-family: 'Raleway', sans-serif;
    font-size: 18px;

    color: #555;
`;

/**
 * A div that can contain an error message if the user enters invalid credentials.
 *
 * It has a fixed size so that the login form doesn't change sizes depending on whether there's an error or not.
 */
const LoginError = styled.div`
    margin-top: 5px;
    margin-bottom: -5px;
    height: 5px;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;

    color: #a74343;
`;
