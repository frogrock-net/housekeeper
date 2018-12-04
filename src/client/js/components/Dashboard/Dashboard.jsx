// @flow
import React, { Fragment } from 'react';
import Header from '../Common/Header';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import type { RouterProps } from '../../util/types';
import House from '../House/House';
import { ROUTE_HOUSE, ROUTE_HOUSEKEEPER } from '../../util/routes';
import { ListOwnedHouses } from '../../state/house';
import HouseHeader from '../House/HouseHeader';

/**
 * An extremely-WIP dashboard component.
 */
const Dashboard = (props: RouterProps) => (
    <Fragment>
        <Header />
        <DashboardRouter {...props} />
        <Footer />
    </Fragment>
);

const DashboardRouter = props => (
    <Fragment>
        <Route path={ROUTE_HOUSE} render={props => <House {...props} />} />
        <Route exact path={ROUTE_HOUSEKEEPER} render={props => <SIHP {...props} />} />
    </Fragment>
);

const SIHP = (props: RouterProps) => (
    <ContentContainer>
        <Content>
            <ListOwnedHouses>{(data, isLoading, error) => <HouseHeader data={data} isLoading={isLoading} error={error} />}</ListOwnedHouses>
        </Content>
    </ContentContainer>
);

export default Dashboard;

/**
 * The main 'content' div.
 */
const ContentContainer = styled.div`
    height: calc(100vh - 100px);
    background: linear-gradient(#444, #b3d3e2 35%, #b3d3e2 75%, #ffeab0 95%);
`;

/**
 * The main 'content' div.
 */
const Content = styled.div`
    height: calc(100vh - 100px);
    width: 100%
    margin: auto;
    background: #999;
`;

/**
 * A 50px footer.
 */
const Footer = styled.div`
    height: 50px;
    background: #ffeab0;
`;
