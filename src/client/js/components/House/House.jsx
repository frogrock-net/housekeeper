// @flow
import * as React from 'react';
import { Fragment } from 'react';
import type { RouterProps } from '../../util/types';
import { Link, Route, Switch } from 'react-router-dom';
import ViewHouse from './ViewHouse';
import styled from 'styled-components';
import type { House as HouseType } from '../../state/house';
import { ListOwnedHouses } from '../../state/house';
import { HouseIcon } from '../Common/Icon';

const RouteContext: React.Context<any | RouterProps> = React.createContext();

/**
 * An extremely-WIP house component.
 */
const House = (props: RouterProps) => <HouseRouter {...props} />;

const HouseRouter = (props: RouterProps) => (
    <Fragment>
        <Switch>
            <Route
                exact
                path={`${props.match.url}/create`}
                render={props => (
                    <Fragment>
                        <HouseHeader {...props} />
                        <div>Create.</div>}
                    </Fragment>
                )}
            />
            <Route
                path={`${props.match.url}/:id`}
                render={props => (
                    <Fragment>
                        <RouteContext.Provider value={{ ...props }}>
                            <HouseHeader selected={props.match.params.id} />
                        </RouteContext.Provider>
                        <ViewHouse id={props.match.params.id} />
                    </Fragment>
                )}
            />
        </Switch>
    </Fragment>
);

export default House;

class HouseHeader extends React.Component<{ selected: string }> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <InnerContainer>
                    <ListOwnedHouses>
                        {(data, isLoading, error) => {
                            if (data) {
                                return (
                                    <Fragment>
                                        {data.map((h, i) => (
                                            <HouseCard selected={this.props.selected === h.id} house={h} key={i} />
                                        ))}
                                    </Fragment>
                                );
                            }

                            return <div>No data.</div>;
                        }}
                    </ListOwnedHouses>
                </InnerContainer>
            </Container>
        );
    }
}

/**
 * A 50px header.
 */
const Container = styled.div`
    height: 140px;
    background: #b3d3e2;
    display: flex;
`;

const HouseCard = ({ selected, house }: { selected: boolean, house: HouseType }) => (
    <RouteContext.Consumer>
        {match => (
            <Link to={`${match.url}/../${house.id}`}>
                <CardBorder color={'#666'} selected={selected}>
                    <CardContainer>
                        <CardImage house={house} />
                        <CardName>{house.name}</CardName>
                    </CardContainer>
                </CardBorder>
            </Link>
        )}
    </RouteContext.Consumer>
);

/*
const CardBorder = styled.div`
    margin: 0px 10px;
    width: 180px;
    height: 65px;
    cursor: pointer;
    flex-shrink: 0;
    background-color: ${props => props.selected ? '#666' : null};
`;

const CardContainer = styled.div`
    margin: auto;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardName = styled.div`
    padding-top: 6px;
    color: #999;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 16px;

    text-align: center;
    position: relative;
    top: -30px;
    user-select: none;
`;

const CardImage = props => (<CardImageContainer>
    <Placeholder/>
</CardImageContainer>);

const CardImageContainer = styled.div`
    background-color: ${props => props.color};
    height: 65px;
`;

const Placeholder = props => (<PlaceholderContainer>
    <HouseIcon size={35} color={'rgba(0,0,0,.25)'}/>
</PlaceholderContainer>);

const PlaceholderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
*/

const InnerContainer = styled.div`
    background-color: #b3d3e2;

    padding: 10px;
    display: flex;
    overflow-x: scroll;
`;

const CardBorder = styled.div`
    margin: 10px 10px;
    padding: 10px;
    height: 85px;
    width: 160px;
    background-color: ${props => props.color};
    cursor: pointer;
    flex-shrink: 0;
`;

const CardContainer = styled.div`
    margin: auto;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardName = styled.div`
    padding-top: 6px;
    color: white;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 16px;

    text-align: center;
`;

const CardImage = props => (
    <CardImageContainer color={'white'}>
        <Placeholder />
    </CardImageContainer>
);

const CardImageContainer = styled.div`
    background-color: ${props => props.color};
    height: calc(100% - 25px);
`;

const Placeholder = props => (
    <PlaceholderContainer>
        <HouseIcon size={65} color={'rgba(0,0,0,.25)'} />
    </PlaceholderContainer>
);

const PlaceholderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
