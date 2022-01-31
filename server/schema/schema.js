const graphql = require("graphql"); //use graphql package

const _ = require("lodash");

/*Getting GraphQLObjectType function from 'graphql' to define the (dataType) 
 structure of our queries and their model type.
*/
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList

} = graphql;

const ShoesArray = [
    { id: "1", name: "Nike Air Force 1", model: "2019", company: "Nike", ownerId: "1" },
    { id: "2", name: "Loafers", model: "2019", company: "Cole Haan", ownerId: "2" },
    { id: "3", name: "Yeezy", model: "2019", company: "Adidas", ownerId: "2" },
    { id: "4", name: "990", model: "2019", company: "New Balanace", ownerId: "1" },
    { id: "5", name: "Chain Reactions", model: "2019", company: "Versace", ownerId: "1" },
    { id: "6", name: "Chucks", model: "2019", company: "Converse", ownerId: "3" }
];

var OwnersArray = [
    { id: "1", name: "Vinod Chauhan", age: 27, gender: "male" },
    { id: "2", name: "John Dow", age: 46, gender: "male" },
    { id: "3", name: "Kristen", age: 30, gender: "female" },
    { id: "4", name: "Paris", age: 44, gender: "female" },
    { id: "5", name: "Sylvestor", age: 26, gender: "male" }
];

//Defining ShoeType with its fields.
const ShoeType = new GraphQLObjectType({
    name: "Shoe",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        model: { type: GraphQLInt },
        company: { type: GraphQLString },
        owner: { //Supporting pwner query in ShoeType
            type: OwnerType,
            resolve(parent, args) {
                return _.find(OwnersArray, { id: parent.ownerId });
            }
        }//owner 
    })
});

//Defining CarType with its fields.
const OwnerType = new GraphQLObjectType({
    name: "Owner",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
        shoes: {  // Supporting list of cars query in Owner type
            type: new GraphQLList(ShoeType),
            resolve(parent, args) {
                return _.filter(ShoesArray, { ownerId: parent.id });
            }
        }
    })
});

//Defining RootQuery
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Fields here will be the query for frontends
        //We are defining a 'car' query which can take (car ID ) to search in DB.
        Shoe: {
            type: ShoeType, //Defining model for car Query
            args: { id: { type: GraphQLID } },
            //args field to extract argument came with car query, e.g : Id of the car object to extract its details.
            resolve(parent, args) {
                //code to get value  from DB
                /**
                 * With the help of lodash library(_), we are trying to find car with id from 'CarsArray'
                 * and returning its required data to calling tool.
                 */
                return _.find(ShoesArray, { id: args.id });
            } //resolve function
        }, //car query ends here
        owner: {
            type: OwnerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(OwnersArray, { id: args.id });
            }
        },
        shoes: {
            type: new GraphQLList(ShoeType),
            resolve(parent, args) {
                return CarsArray;
            }
        },//cars query
        owners: {
            type: new GraphQLList(OwnerType),
            resolve(parent, args) {
                return OwnersArray;
            }
        }
    } //fields end here
});

//exporting 'GraphQLSchema with RootQuery' for GraphqlHTTP middleware.
module.exports = new GraphQLSchema({
    query: RootQuery
});