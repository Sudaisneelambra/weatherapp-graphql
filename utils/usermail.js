const { graphql } = require('graphql');
const schema = require("../schema/schema");

const fetchemails = async () => {
    try {
      const response = await graphql({
        schema: schema,
        source: `query {
            getemail {
                email
          }
        }`
      });
      if(response){
        return response.data.getemail
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  module.exports=fetchemails