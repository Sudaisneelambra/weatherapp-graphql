const { graphql } = require('graphql');
const schema = require("../schema/schema");

const fetchselectedplace = async () => {
    try {
      const response = await graphql({
        schema: schema,
        source: `query {
            getplaces {
                placename
          }
        }`
      });
      if(response){
        return response.data.getplaces
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  module.exports=fetchselectedplace