'use strict';
const bcrypt = require('bcrypt-nodejs')
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      role: "Admin",
      name: 'root',
      avatar: "",
      introduction: "hi,i'm a User",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user1@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      role: "User",
      name: 'user1',
      avatar: "",
      introduction: "hi,i'm a User",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user2@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      role: "User",
      name: 'user2',
      avatar: "",
      introduction: "hi,i'm a User",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    queryInterface.bulkInsert('Followships',
      Array.from({ length: 2 }).map((d, i) =>
        ({
          followerId: i + 1,
          followingId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ), {})

    queryInterface.bulkInsert('Tweets',
      Array.from({ length: 50 }).map(d =>
        ({
          UserId: Math.floor(Math.random() * 3) + 1,
          description: faker.lorem.text(),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ), {})

    queryInterface.bulkInsert('Likes',
      Array.from({ length: 30 }).map((d, i) =>
        ({
          UserId: Math.floor(Math.random() * 3) + 1,
          TweetId: i + 1,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ), {})

    return queryInterface.bulkInsert('Replies',
      Array.from({ length: 150 }).map(d =>
        ({
          UserId: Math.floor(Math.random() * 3) + 1,
          TweetId: Math.floor(Math.random() * 50) + 1,
          comment: faker.lorem.text(),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ), {})
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {})
    queryInterface.bulkDelete('Tweets', null, {})
    queryInterface.bulkDelete('Followships', null, {})
    queryInterface.bulkDelete('Likes', null, {})
    return queryInterface.bulkDelete('Replies', null, {})
  }
};