const {QueryResolver}= require('./queries')
const {mutationResolver} =require('./muters')

const resolvers={
    Query:Object.assign({},QueryResolver.Query),
    Mutation:Object.assign({},mutationResolver.Mutation)
}

module.exports={resolvers}