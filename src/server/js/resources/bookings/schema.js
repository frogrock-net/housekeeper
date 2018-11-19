import BookingModel from './model';

import { BOOKING_STATUSES } from '../../../../common/constants';

const typeDefs = `
    type Booking {
        id: ID!
        booker: User
        endDate: String
        room: Room
        startDate: String
        status: String
    }

    extend type Query {
        bookingsByUser(userId: ID!): [Booking],
    }
`;

const resolvers = {
    Query: {
        bookingsByUser: (root, args, context, info) =>
            BookingModel.find({ booker: args.userId }).populate('booker'),
    },
};

// TODO: status should be one of the three statuses only

export { typeDefs, resolvers };
