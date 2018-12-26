// @flow
import * as React from 'react';
import { Fragment } from 'react';
import type { RouterProps } from '../../util/types';
import { Route, Switch } from 'react-router-dom';
import ViewHouse from './ViewHouse';
import { ListOwnedHouses } from '../../state/house';
import { ROUTE_HOUSE_CREATE, ROUTE_HOUSE_VIEW } from '../../util/routes';
import HouseHeader from './HouseHeader';
import CreateHouse from './CreateHouse';
import CreateHouse2 from './CreateHouse2';

/**
 * Router for 'house' pages (hk/house).
 *
 * Currently supports two routes:
 * - /create - the CreateHouse component
 * - /:id - the ViewHouse component for the provided id
 */
const House = () => (
    <Switch>
        <Route exact path={ROUTE_HOUSE_CREATE} render={renderCreate2} />
        <Route exact path={ROUTE_HOUSE_CREATE + 'old'} render={renderCreate} />
        <Route path={ROUTE_HOUSE_VIEW} render={renderView} />
    </Switch>
);

/**
 * A render function for the CreateHouse page.
 */
const renderCreate = () => (
    <Fragment>
        <Header selected={'create'} />
        <CreateHouse />
    </Fragment>
);

/**
 * A render function for the WIP CreateHouse page.
 */
const renderCreate2 = () => (
    <Fragment>
        <Header selected={'create'} />
        <CreateHouse2 />
    </Fragment>
);

/**
 * A render function for the ViewHouse page.
 */
const renderView = (props: RouterProps) => (
    <Fragment>
        <Header selected={props.match.params.id} />
        <ViewHouse id={props.match.params.id} />
    </Fragment>
);

/**
 * The header for the house pages.
 *
 * @param selected the currently selected header element
 */
const Header = ({ selected }) => (
    <ListOwnedHouses>
        {(data, isLoading, error) => <HouseHeader data={data} isLoading={isLoading} error={error} selected={selected} />}
    </ListOwnedHouses>
);

export default House;
