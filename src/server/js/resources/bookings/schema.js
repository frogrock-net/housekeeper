import BookingModel from './model';

import { BOOKING_STATUSES } from '../../../../common/constants';

const typeDefs = `
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

    extend type Query {
        getAllBookings: [Booking],
        bookingsByUser(userId: ID!): [Booking],
    }
`;

const resolvers = {
    Query: {
        getAllBookings: () => BookingModel.getAll(),
        bookingsByUser: (root, args, context, info) => BookingModel.getBookingsByUser({ booker: args.userId }),
    },
};

export { typeDefs, resolvers };
