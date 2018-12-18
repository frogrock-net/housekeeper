// @flow
import { GQLQuery, GQLType } from '../gql';
import { BOOKING_STATUSES } from '../../../../common/constants';
import BookingResource from './database';
// --------------------------
// typeDefs
// --------------------------
/**
 * Export the 'Booking' graphql type.
 */
export const Booking = GQLType`
    enum BookingStatus {
        ${BOOKING_STATUSES.APPROVED}
        ${BOOKING_STATUSES.DENIED}
        ${BOOKING_STATUSES.PENDING}
    }
    
    type Booking {
        id: ID!
            booker: User
        endDate: DateTime
        room: Room
        startDate: DateTime
        status: String
    }
`;

// --------------------------
// Queries
// --------------------------
/**
 * Resolve the 'get bookings by user' query.
 *
 * @param root the root resolver
 * @param args the arguments for this query
 * @returns {Promise} a promise that resolves into the found bookings.
 */
export const bookingsByUser = GQLQuery`
    """
    Get all bookings made by the currently authenticated user.
    """
    bookingsByUser(userId: ID!): [Booking]
`((root, { userId }, { jwt }) => {
    if (jwt || jwt.id != userId) {
        throw new Error('Cannot find the user!');
    }
    return BookingResource.getByUser(userId);
});
