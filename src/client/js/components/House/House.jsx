import gql from 'graphql-tag';
import * as React from 'react';
import { Fragment } from 'react';

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

const GetHouses = () => {};
