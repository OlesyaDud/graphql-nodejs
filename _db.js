let games = [
  { id: "1", title: "game 1", platform: ["platform1"] },
  { id: "2", title: "game 2", platform: ["platform1, platform2"] },
  { id: "3", title: "game 3", platform: ["platform3, platform1"] },
  { id: "4", title: "game 4", platform: ["platform1"] },
];

let authors = [
  { id: "1", name: "Jane", verified: true },
  { id: "2", name: "Joe", verified: false },
  { id: "3", name: "Mark", verified: true },
];

let reviews = [
  { id: "1", rating: 5, content: "good", author_id: "1", game_id: "2" },
  { id: "2", rating: 10, content: "excelent", author_id: "1", game_id: "3" },
  { id: "3", rating: 3, content: "bad", author_id: "2", game_id: "4" },
  { id: "4", rating: 6, content: "good", author_id: "3", game_id: "2" },
];

const db = { games, authors, reviews };

export default db;
