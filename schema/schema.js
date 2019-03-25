const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;
const _ = require("lodash")

var books = [{ name: "thang", genre: "hocsinh", id: "1", authorId: "1", readerId: "1" },
{ name: "trang", genre: "hocsinh", id: "2", authorId: "2", readerId: "3" },
{ name: "thao", genre: "hocsinh", id: "3", authorId: "2", readerId: "2" },
{ name: "thao", genre: "hocsinh", id: "3", authorId: "3", readerId: "2" },
{ name: "thao", genre: "hocsinh", id: "3", authorId: "3", readerId: "2" }];

var authors = [{ name: "jhon", age: 20, id: "1", readerId: "1" },
{ name: "jenny", age: 23, id: "2", readerId: "1" },
{ name: "tommy", age: 27, id: "3", readerId: "2" }];

var readers = [{ studen: "A", genger: "male", id: "1" },
{ studen: "B", genger: "female", id: "2" },
{ studen: "C", genger: "male", id: "3" },
{ studen: "D", genger: "male", id: "4" }];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        id: { type: GraphQLString },
        author:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        name:{type:GraphQLString},
        age:{type:GraphQLString},
        id:{type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }

        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery
})

