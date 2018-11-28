import React, { Fragment } from 'react';
import Header from '../Common/Header';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div>Hello.</div>
            </Fragment>
        );
    }
}
