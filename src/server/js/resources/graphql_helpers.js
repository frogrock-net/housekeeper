import gql from 'graphql-tag';

export const GQL_TYPE_QUERY = 'query';
export const GQL_TYPE_TYPEDEF = 'typedef';
export const GQL_TYPE_MUTATION = 'mutation';

/**
 * Format a GraphQL query resolver.
 *
 * @param strings
 * @returns {function(*=): {name: string, func: *, def: *, type: string}}
 * @constructor
 */
export const GQLQuery = strings => {
    return obj => {
        if (typeof obj === 'function') {
            return {
                func: obj,
                def: strings[0].trim(),
                type: GQL_TYPE_QUERY,
            };
        } else if (typeof obj === 'object') {
            const name = Object.keys(obj)[0];

            return {
                name,
                func: obj[name],
                def: strings[0].trim(),
                type: GQL_TYPE_QUERY,
            };
        } else {
            throw 'Misconfigured GQLQuery - must provide an object or a function.';
        }
    };
};

/**
 * Format a GraphQL mutation resolver.
 *
 * @param strings
 * @returns {function(*=): {name: string, func: *, def: *, type: string}}
 * @constructor
 */
export const GQLMutation = strings => {
    return obj => {
        if (typeof obj === 'function') {
            return {
                func: obj,
                def: strings[0].trim(),
                type: GQL_TYPE_MUTATION,
            };
        } else if (typeof obj === 'object') {
            const name = Object.keys(obj)[0];

            return {
                name,
                func: obj[name],
                def: strings[0].trim(),
                type: GQL_TYPE_MUTATION,
            };
        } else {
            throw 'Misconfigured GQLMutation - must provide an object or a function.';
        }
    };
};

/**
 * Format a GraphQL type string.
 *
 * @param strings
 * @returns {function(*=): {name: string, func: *, def: *, type: string}}
 * @constructor
 */
export const GQLType = strings => {
    return {
        type: GQL_TYPE_TYPEDEF,
        defs: gql`
            ${strings}
        `,
    };
};
