// @flow
import { GQLQuery, GQLType } from '../gql';
import { BOOKING_STATUSES } from '../../../../common/constants';
import BookingResource from './model';
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
        status: BookingStatus
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
export const myBookings = GQLQuery`
    """
    Get all bookings made by the currently authenticated user
    """
    myBookings: [Booking]
`((root, args, { requester }) => BookingResource.getByUser(requester));
