// @flow

/**
 * A type describing the data provided by React Router.
 */
export type RouterProps = {
    location: {
        hash: string,
        key: string,
        pathname: string,
        search: string,
    },
    match: {
        isExact: boolean,
        params: {
            [string]: string,
        },
        path: string,
        url: string,
    },
};
