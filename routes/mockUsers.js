// These are mock users, normally, these would be stored in a database:

// This is for demo purposes only;
// You would **NEVER** hardcode a password
// in the clear in your app!

const mockUsers = [
  {
    id: 1,
    username: "ben",
    email: "ben@wbs.com",
    password: "chicken",
    admin: true,
  },
  {
    id: 2,
    username: "dan",
    email: "dan@wbs.com",
    password: "pollo",
    admin: false,
  },
  {
    id: 3,
    username: "jack",
    email: "jack@wbs.com",
    password: "poulet",
    admin: false,
  },
  {
    id: 4,
    username: "matilda",
    email: "matilda@wbs.com",
    password: "duck",
    admin: false,
  },
  {
    id: 5,
    username: "elena",
    email: "elena@wbs.com",
    password: "goose",
    admin: true,
  },
  {
    id: 6,
    username: "marie",
    email: "marie@wbs.com",
    password: "rooster",
    admin: false,
  },
];

module.exports = mockUsers;
