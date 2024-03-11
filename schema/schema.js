const Users = require('../modals/user');
const places = require('../modals/places');


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

// user Type
const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    }),
});

const selectedcity = new GraphQLObjectType({
    name: 'city',
    fields: () => ({
        placename: { type: GraphQLString },
    }),
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getplaces: {
            type: new GraphQLList(selectedcity),
            resolve(parent, args) {
                return places.find()
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
        deleteplace: {
            type: new GraphQLList(selectedcity),
            resolve(parent, args) {
                return places.deleteMany({})
                    .then(deletedUser => {
                        if (!deletedUser) {
                            throw new Error(' places not found.');
                        }
                        return deletedUser;
                    })
                    .catch(error => {
                        console.log(error);
                        throw error; 
                    });
            }
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
                    if (alredy) {
                        // Navigate to the home page if the user already exists
                      return alredy
                    } else {
                        // Return a message if the user is not found
                        throw new Error('User not found please signup.');

                    }
                })
                .catch(error => {
                    throw error
                });
            },
        },
        addcity: {
            type: selectedcity,
            args: {
                placename: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return places.findOne({ placename: args.placename})
                .then (alredy => {
                    if (alredy) {
                        throw new Error('User already added this place');
                    } else {
                        const place= new places({
                            placename:args.placename
                        })
                        return place.save()
                        .then(savedplace => {
                            return savedplace;
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
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});