process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pgp = require("pg-promise")({
  connect(client) {
    console.log("Connected to database:", client.connectionParameters.database);
  },

  disconnect(client) {
    console.log(
      "Disconnected from database:",
      client.connectionParameters.database
    );
  },
});

let secrets = require('././secrets.json');
let username = secrets.username;
let password = secrets.password;

let url = `postgres://${username}:${password}@ec2-34-199-224-49.compute-1.amazonaws.com:5432/db98f1gop9514j?sslmode=require`;

const db = pgp(url);

async function connectAndRun(task) {
  let connection = null;

  try {
    connection = await db.connect();
    return await task(connection);
  } catch (e) {
    // eslint-disable-next-line no-useless-catch
    throw e;
  } finally {
    try {
      connection.done();
    } catch (ignored) {
      // eslint-disable-next-line no-empty
    }
  }
}

// Database functions for log in 
<<<<<<< Updated upstream
async function addUser(firstname, lastname, email, password, previousbookings, upcomingbookings) {
    return await connectAndRun((db) =>
      db.none(
        "INSERT INTO users (firstname, lastname, email, password, previousbookings, upcomingbookings) VALUES ($1, $2, $3, $4, $5, $6);",
        [firstname, lastname, email, password, previousbookings, upcomingbookings]
      )
    );
  }
=======
async function addUser(firstname, lastname, email, password) {
  return await connectAndRun((db) =>
    db.none(
      "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);",
      [firstname, lastname, email, password]
    )
  );
}

async function addBooking(building, date, email, time) {
  return await connectAndRun((db) =>
    db.none(
      "INSERT INTO bookings (building, date, email, time) VALUES ($1, $2, $3, $4);",
      [building, date, email, time]
    )
  );
}
>>>>>>> Stashed changes

async function delUser(email) {
  return await connectAndRun((db) =>
    db.none("DELETE FROM users where email = $1;", [email])
  );
}

<<<<<<< Updated upstream
async function getUserByEmail(email){
=======
async function updateDate(date, roomid) {
  return await connectAndRun((db) =>
    db.none("UPDATE rooms SET date = $1 where roomid = $2", [date, roomid])
  );
}

async function getDate(roomid) {
  return await connectAndRun((db) =>
    db.any(
      "SELECT date FROM rooms where roomid = $1;", [roomid])
  );
}

async function getUserByEmail(email) {
>>>>>>> Stashed changes
  return await connectAndRun((db) =>
    db.any(
      "SELECT * FROM users where email = $1;", [email])
  );
}

// Database functions for editing user info 
async function updateUserFirstName(firstname, password) {
  return await connectAndRun((db) =>
    db.any(
      "UPDATE users SET firstname = $1 where password = $2;", [firstname, password])
  );
}

async function updateUserLastName(lastname, password) {
  return await connectAndRun((db) =>
    db.any(
      "UPDATE users SET lastname = $1 where password = $2;", [lastname, password])
  );
}

async function updateUserEmail(email, password) {
  return await connectAndRun((db) =>
    db.any(
      "UPDATE users SET email = $1 where password = $2;", [email, password])
  );
}

// Database functions for getting room information 
<<<<<<< Updated upstream
async function getRoomID(building, room) { 
  return await connectAndRun((db) => 
    db.any(
      "SELECT roomid FROM rooms WHERE building = $1 AND room = $2;", [building, room])
    );
}

async function getBuildingName(roomid) { 
  return await connectAndRun((db) => 
    db.any(
      "SELECT building FROM rooms WHERE roomid = $1;", [roomid])
    );
}

async function getRoomName(roomid) { 
  return await connectAndRun((db) => 
    db.any(
      "SELECT room FROM rooms WHERE roomid = $1;", [roomid])
    );
}

async function getRoomRating(roomid) { 
  return await connectAndRun((db) => 
    db.any(
      "SELECT rating FROM rooms WHERE roomid = $1;", [roomid])
    );
}

async function getRoomCapacity(roomid) { 
  return await connectAndRun((db) => 
    db.any(
      "SELECT capacity FROM rooms WHERE roomid = $1;", [roomid])
    );
}

async function getRoomTech(roomid) { 
  return await connectAndRun((db) => 
    db.any(
      "SELECT tech FROM rooms WHERE roomid = $1;", [roomid])
    );
}

async function getRoomType(roomid) { 
  return await connectAndRun((db) => 
    db.any(
      "SELECT building FROM rooms WHERE roomid = $1;", [roomid])
    );
}

async function getRoomTags(roomid) { 
  return await connectAndRun((db) => 
    db.any(
      "SELECT tags FROM rooms WHERE roomid = $1;", [roomid])
    );
}

async function getRoomAddress(roomid) { 
  return await connectAndRun((db) => 
    db.any(
      "SELECT address FROM rooms WHERE roomid = $1;", [roomid])
    );
}

  module.exports = {
    addUser,
    getUserByEmail,
    updateUserFirstName,
    updateUserLastName,
    updateUserEmail,
    delUser, 
    getRoomID, 
    getBuildingName,
    getRoomName,
    getRoomRating,
    getRoomCapacity,
    getRoomTech,
    getRoomType, 
    getRoomTags,
    getRoomAddress
  };
=======
async function getRoomID(building) {
  return await connectAndRun((db) =>
    db.any(
      "SELECT roomid FROM rooms WHERE building = $1;", [building])
  );
}

async function getRoomInformation(roomid) {
  return await connectAndRun((db) =>
    db.any(
      "SELECT * FROM rooms WHERE roomid = $1;", [roomid])
  );
}

async function getBookingInformation(email) {
  return await connectAndRun((db) =>
    db.any(
      "SELECT * FROM bookings WHERE email = $1;", [email])
  );
}

async function getAllRooms() {
  return await connectAndRun((db) =>
    db.any(
      "SELECT * FROM rooms;")
  );
}

async function getAllUsers() {
  return await connectAndRun((db) =>
    db.any(
      "SELECT * FROM users;")
  );
}

async function getAbove3Stars() {
  return await connectAndRun((db) =>
    db.any(
      "SELECT * FROM rooms WHERE rating >= 4;")
  );
}

async function getLargeCapacity() {
  return await connectAndRun((db) =>
    db.any(
      "SELECT * FROM rooms WHERE capacity >= 100;")
  );
}

async function getMediumCapacity() {
  return await connectAndRun((db) =>
    db.any(
      "SELECT * FROM rooms WHERE capacity < 100;")
  );
}

async function getTechRooms() {
  return await connectAndRun((db) =>
    db.any(
      "SELECT * FROM rooms WHERE tech IS NOT NULL;")
  );
}

module.exports = {
  addUser,
  getUserByEmail,
  updateUserFirstName,
  updateUserLastName,
  updateUserEmail,
  delUser,
  getRoomID,
  getRoomInformation,
  getAllRooms,
  getAllUsers,
  updateDate,
  getDate,
  addBooking,
  getBookingInformation,
  getAbove3Stars,
  getLargeCapacity,
  getMediumCapacity,
  getTechRooms
};
>>>>>>> Stashed changes
