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
        bookingsByUser(userId: ID!): [Booking],
    }
`;

const resolvers = {
    Query: {
        bookingsByUser: (root, args, context, info) => BookingModel.find({ booker: args.userId }).populate('booker'),
    },
};

export { typeDefs, resolvers };
