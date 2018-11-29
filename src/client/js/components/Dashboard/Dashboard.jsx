import React, { Fragment } from 'react';
import Header from '../Common/Header';
import styled from 'styled-components';

/**
 * An extremely-WIP dashboard component.
 */
const Dashboard = () => (
    <Fragment>
        <Header />
        <Content />
        <Footer />
    </Fragment>
);

export default Dashboard;

/**
 * The main 'content' div.
 */
const Content = styled.div`
    height: calc(100vh - 100px);
    background: linear-gradient(#444, #b3d3e2 35%, #b3d3e2 75%, #ffeab0 95%);
`;

/**
 * A 50px footer.
 */
const Footer = styled.div`
    height: 50px;
    background: #ffeab0;
`;
