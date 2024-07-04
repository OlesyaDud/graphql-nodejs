import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    // parent is not needed here so putting "_"
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      // we want every game id associated with the review game_id - the match
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  //   query myQuery($id: ID!) {
  //     game(id: $id){
  //       title,
  //       reviews {
  //         rating
  //         content
  //       }
  //     }
  //   }

  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  //   query myQuery($id: ID!) {
  //     author(id: $id){
  //       name,
  //       reviews {
  //         rating
  //         content
  //       }
  //     }
  //   }

  Review: {
    author(parent) {
      // return author associated with a single review
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  // query myQuery($id: ID!) {
  //     review(id: $id){
  //       rating,
  //       game {
  //         title
  //         platform
  //       }
  //     }
  //   }

  // query myQuery($id: ID!) {
  //     review(id: $id){
  //       rating,
  //       game {
  //         title
  //         platform
  //       },
  //       author {
  //         name,
  //         verified
  //       }
  //     }
  //   }

  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },

    // mutation DeleteGame($id: ID!) {
    //     deleteGame(id: $id) {
    //       id,
    //       title,
    //       platform
    //     }
    //   }

    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);
      return game;
    },

    // mutation addGame($game: AddGameInput!) {
    //     addGame(game: $game) {
    //       id,
    //       title,
    //       platform
    //     }
    //   }

    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game;
      });
      return db.games.find((game) => game.id === args.id);
    },
    // mutation Mutation($id: ID!, $edits: EditGameInput!) {
    //     updateGame(id: $id, edits: $edits) {
    //       title,
    //       platform
    //     }
    //   }
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 2000 },
});

console.log("Server started at port", 2000);
