    const express = require('express')
    const {graphqlHTTP} = require('express-graphql')
    const userschema = require('./modals/user')
    const cors = require('cors'); 
    const schema = require('./schema/schema')
    const { connectDB } = require('./database/confiq')


    connectDB()

    const app = express()
    const port = process.env.PORT || 2000

    app.use(cors());

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.listen(port, ()=>{
        console.log('listening on port', port);
    })