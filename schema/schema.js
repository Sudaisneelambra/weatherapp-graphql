const Users = require('../modals/user');

const bcrypt = require('bcrypt');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');

// Project Type
const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    }),
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        UserGet: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return Project.find();
            },
        },
        UserLogin: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                return Project.findOne({email: args.email});
            },
        },
    },
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Users.findOne({ email: args.email })
                .then (existingUser => {
                    if (existingUser) {
                        throw new Error('User with the same email already exists.');
                    } else {
                        const newUser = new Users({
                            name: args.name,
                            email: args.email,
                            password: args.password
                            // Add other fields as needed
                        });
        
                        return newUser.save()
                            .then(savedUser => {
                                return savedUser;
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                })
                .catch(error => {
                    throw error
                });
            },
        },
        loginuser: {
            type: UserType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Users.findOne({ email: args.email, password: args.password })
                .then (alredy => {
                    console.log(alredy);
                    if (alredy) {
                        // Navigate to the home page if the user already exists
                      return alredy
                    } else {
                        // Return a message if the user is not found
                        throw new Error('User not found please login.');

                    }
                })
                .catch(error => {
                    throw error
                });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});