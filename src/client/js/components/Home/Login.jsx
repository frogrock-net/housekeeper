import React from 'react';
import styled from 'styled-components';
import Form from '../Common/Form/Form';
import FormInput from '../Common/Form/FormInput';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginContainer>
                <LoginText>
                    Sign in to manage your house reservations.
                </LoginText>
                <Form>
                    <FormInput fieldName={'email'} />
                </Form>
            </LoginContainer>
        );
    }
}

const LoginContainer = styled.div`
    padding: 7.5px;
    background-color: #fff;
    width: 450px;
    text-align: center;
`;

const LoginText = styled.span`
    font-family: 'Raleway', sans-serif;
`;
