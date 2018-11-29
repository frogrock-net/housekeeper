import gql from 'graphql-tag';
import * as React from 'react';
import { Fragment } from 'react';

/**
 * Get all houses for a given administratorId.
 */
const GET_HOUSES = gql`
    {
        query GetHouses($administratorId: String) {
            housesByAdministrator(administratorId: $$administratorId) {
                id
                name
            }
        }
    }
`;

/**
 * I'm not really sure what's going on here yet.
 */
const GetHouses = () => {};
