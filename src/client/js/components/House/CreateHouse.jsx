import * as React from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';

/**
 * I'm not really sure what's going on here yet.
 */
const CreateHouse = props => (
    <Container>
        <InnerContainer>create</InnerContainer>
    </Container>
);

/**
 * A 50px header.
 */
const Container = styled.div`
    background: #65727b;
    display: flex;
    padding: 15px;
`;

/**
 * A 50px header.
 */
const InnerContainer = styled.div`
    background: white;
    padding: 10px;
    width: 100%;
`;

export default CreateHouse;
