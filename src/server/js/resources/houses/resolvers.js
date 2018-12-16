import HouseResource from './db';

class GQLHelper {
    types(types) {
        return this;
    }

    queries(query) {
        return this;
    }

    mutations(mutations) {
        return this;
    }
}

/**
 * Resolve the 'get house' query.
 *
 * @param root the root resolver
 * @param args the arguments for this query
 * @returns {Promise} a promise that resolves into the found house.
 */
const getHouse = (root, args) => HouseResource.get(args.houseId);

/**
 * Resolve the 'get all' query.
 *
 * @returns {*} a promise that resolves into the found houses.
 */
const allHouses = () => HouseResource.getAll();

/**
 * Resolve the 'get houses by administrator id' query.
 *
 * @param root the root resolver
 * @param args the arguments for this query
 * @returns {*} a promise that resolves into the found houses.
 */
const housesByAdministrator = (root, args) => HouseResource.getByAdministrator(args.administratorId);

/**
 * Resolve the 'get houses by member id' query.
 *
 * @param root the root resolver
 * @param args the arguments for this query
 * @returns {*} a promise that resolves into the found houses.
 */
const housesByMember = (root, args) => HouseResource.getHousesByMember(args.memberId);

export default {
    typeDefs: {},
    resolvers: {
        Query: {
            getHouse,
            allHouses,
            housesByAdministrator,
            housesByMember,
        },
    },
};
