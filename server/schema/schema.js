const graphql = require("graphql"); //use graphql package

const _ = require("lodash");

const shoes = require("../models/shoe");
const owners = require("../models/owner");



const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;


const ShoeType = new GraphQLObjectType({
  name: "Shoe",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    model: { type: GraphQLInt },
    company: { type: GraphQLString },
    owner: {
      type: OwnerType,
      resolve(parent, args) {
        return owners.findById(parent.ownerId);
      }
    } //owner
  })
});


const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    shoes: {
      type: new GraphQLList(ShoeType),
      resolve(parent, args) {
        return shoes.find({ ownerId: parent.id });
      }
    }
  })
});

//Defining RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    
    shoe: {
      type: ShoeType, 
      args: { id: { type: GraphQLID } }, 
      resolve(parent, args) {
       
        return shoes.findById(args.id);
      } 
    }, 
    owner: {
      type: OwnerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return owners.findById(args.id);
      }
    }, 
    shoes: {
      type: new GraphQLList(ShoeType),
      resolve(parent, args) {
        return shoes.find({});
      }
    }, //shoes query
    owners: {
      type: new GraphQLList(OwnerType),
      resolve(parent, args) {
        return owners.find({});
      }
    }
  } 
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOwner: {
      type: OwnerType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString }
      },
      resolve(parent, args) {
        let owner = new owners({
          name: args.name,
          age: args.age,
          gender: args.gender
        });
        return owner.save();
      }
    }, 
    addShoe: {
      type: ShoeType,
      args: {
        name: { type: GraphQLString },
        model: { type: GraphQLInt },
        company: { type: GraphQLString },
        ownerId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let shoe = new shoes({
          name: args.name,
          model: args.model,
          company: args.company,
          ownerId: args.ownerId
        });

        return shoe.save();
      }
    } 
  } 
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
  