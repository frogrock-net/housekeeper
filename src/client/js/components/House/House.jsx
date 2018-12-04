// @flow
import * as React from 'react';
import { Fragment } from 'react';
import type { RouterProps } from '../../util/types';
import { Link, Route, Switch } from 'react-router-dom';
import ViewHouse from './ViewHouse';
import styled from 'styled-components';
import type { House as HouseType } from '../../state/house';
import { ListOwnedHouses } from '../../state/house';
import { AddIcon, HouseIcon } from '../Common/Icon';
import { ROUTE_HOUSE, ROUTE_HOUSE_CREATE, ROUTE_HOUSE_VIEW } from '../../util/routes';
import HouseHeader from './HouseHeader';

/**
 * An extremely-WIP house component.
 */
const House = (props: RouterProps) => <HouseRouter {...props} />;

const HouseRouter = (props: RouterProps) => (
    <Fragment>
        <Switch>
            <Route
                exact
                path={ROUTE_HOUSE_CREATE}
                render={props => (
                    <Fragment>
                        <ListOwnedHouses>
                            {(data, isLoading, error) => (
                                <HouseHeader data={data} isLoading={isLoading} error={error} selected={'create'} />
                            )}
                        </ListOwnedHouses>
                        <div>Create.</div>
                    </Fragment>
                )}
            />
            <Route
                path={ROUTE_HOUSE_VIEW}
                render={props => (
                    <Fragment>
                        <ListOwnedHouses>
                            {(data, isLoading, error) => (
                                <HouseHeader data={data} isLoading={isLoading} error={error} selected={props.match.params.id} />
                            )}
                        </ListOwnedHouses>
                        <ViewHouse id={props.match.params.id} />
                    </Fragment>
                )}
            />
        </Switch>
    </Fragment>
);

export default House;
