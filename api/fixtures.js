const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const Place = require("./models/Place");
const Review = require("./models/Review");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [GROGU, ADMIN] = await User.create({
        avatar: 'grogu.png',
        displayName: 'Grogu',
        email: 'grogu@gmail.com',
        password: '123',
        token: 'Grogu',
        role: 'user',
    }, {
        avatar: 'cat.jpg',
        displayName: 'Admin',
        email: 'admin@gmail.com',
        password: '123',
        token: 'admin',
        role: 'admin'
    });


    const [AMELA, COFFEE_SHOP, KANEL, MY_COFFEE_1, AMELA_2, COFFEE_SHOP_2, KANEL_2, MY_COFFEE_2] = await Place.create({
        owner: GROGU,
        title: 'Amela',
        description: 'We offer more than a great cup of coffee, we offer ' +
            'a warm and welcoming spot to meet old friends and make new ones.' +
            ' That\'s why folks often say "I\'ll meet you at the coffee shop" when planning' +
            ' a get together with friends, colleagues or business associates.' +
            ' It\'s been that way since Amelia Island Coffee opened 18 years ago.',
        mainPhoto: 'amela.jpg',
        ratings: [],
        images: [],
        reviews: [],
    }, {
        owner: GROGU,
        title: 'Coffee Shop',
        description: 'We offer more than a great cup of coffee, we offer ' +
            'a warm and welcoming spot to meet old friends and make new ones.' +
            ' That\'s why folks often say "I\'ll meet you at the coffee shop" when planning' +
            ' a get together with friends, colleagues or business associates.' +
            ' It\'s been that way since Amelia Island Coffee opened 18 years ago.',
        mainPhoto: 'coffeeshop.jpg',
        ratings: [],
        images: [],
        reviews: [],
    }, {
        owner: ADMIN,
        title: 'Kanel',
        description: 'We offer more than a great cup of coffee, we offer ' +
            'a warm and welcoming spot to meet old friends and make new ones.' +
            ' That\'s why folks often say "I\'ll meet you at the coffee shop" when planning' +
            ' a get together with friends, colleagues or business associates.' +
            ' It\'s been that way since Amelia Island Coffee opened 18 years ago.',
        mainPhoto: 'kanel.jpg',
        ratings: [],
        images: [],
        reviews: [],
    }, {
        owner: GROGU,
        title: 'My Coffee',
        description: 'We offer more than a great cup of coffee, we offer ' +
            'a warm and welcoming spot to meet old friends and make new ones.' +
            ' That\'s why folks often say "I\'ll meet you at the coffee shop" when planning' +
            ' a get together with friends, colleagues or business associates.' +
            ' It\'s been that way since Amelia Island Coffee opened 18 years ago.',
        mainPhoto: 'mycoffee.jpg',
        ratings: [],
        images: [],
        reviews: [],
    }, {
        owner: ADMIN,
        title: 'Kanel',
        description: 'We offer more than a great cup of coffee, we offer ' +
            'a warm and welcoming spot to meet old friends and make new ones.' +
            ' That\'s why folks often say "I\'ll meet you at the coffee shop" when planning' +
            ' a get together with friends, colleagues or business associates.' +
            ' It\'s been that way since Amelia Island Coffee opened 18 years ago.',
        mainPhoto: 'kanel.jpg',
        ratings: [],
        images: [],
        reviews: [],
    }, {
        owner: GROGU,
        title: 'My Coffee',
        description: 'We offer more than a great cup of coffee, we offer ' +
            'a warm and welcoming spot to meet old friends and make new ones.' +
            ' That\'s why folks often say "I\'ll meet you at the coffee shop" when planning' +
            ' a get together with friends, colleagues or business associates.' +
            ' It\'s been that way since Amelia Island Coffee opened 18 years ago.',
        mainPhoto: 'mycoffee.jpg',
        ratings: [],
        images: [],
        reviews: [],
    }, {
        owner: ADMIN,
        title: 'Kanel',
        description: 'We offer more than a great cup of coffee, we offer ' +
            'a warm and welcoming spot to meet old friends and make new ones.' +
            ' That\'s why folks often say "I\'ll meet you at the coffee shop" when planning' +
            ' a get together with friends, colleagues or business associates.' +
            ' It\'s been that way since Amelia Island Coffee opened 18 years ago.',
        mainPhoto: 'kanel.jpg',
        ratings: [],
        images: [],
        reviews: [],
    }, {
        owner: GROGU,
        title: 'My Coffee',
        description: 'We offer more than a great cup of coffee, we offer ' +
            'a warm and welcoming spot to meet old friends and make new ones.' +
            ' That\'s why folks often say "I\'ll meet you at the coffee shop" when planning' +
            ' a get together with friends, colleagues or business associates.' +
            ' It\'s been that way since Amelia Island Coffee opened 18 years ago.',
        mainPhoto: 'mycoffee.jpg',
        ratings: [],
        images: [],
        reviews: [],
    });


    const [review1, review2, review3,
        review4, review5, review6,
        review7, review8, review9,
        review10, review11, review12,
    ] = await Review.create({
        author: GROGU,
        place: AMELA,
        description: 'Really good place',
        ratings: {
            overAll: 5,
            food: 5,
            service: 5,
            interior: 5,
        }
    }, {
        author: GROGU,
        place: AMELA,
        description: 'Really good place',
        ratings: {
            overAll: 5,
            food: 5,
            service: 5,
            interior: 5,
        }
    }, {
        author: GROGU,
        place: AMELA,
        description: 'Really good place',
        ratings: {
            overAll: 5,
            food: 5,
            service: 5,
            interior: 5,
        }
    }, {
        author: GROGU,
        place: KANEL,
        description: 'Really good place',
        ratings: {
            overAll: 5,
            food: 5,
            service: 5,
            interior: 5,
        }
    }, {
        author: GROGU,
        place: KANEL,
        description: 'Really good place',
        ratings: {
            overAll: 5,
            food: 5,
            service: 5,
            interior: 5,
        }
    }, {
        author: GROGU,
        place: COFFEE_SHOP,
        description: 'Really good place',
        ratings: {
            overAll: 5,
            food: 5,
            service: 5,
            interior: 5,
        }
    }, {
        author: GROGU,
        place: COFFEE_SHOP,
        description: 'Really good place',
        ratings: {
            overAll: 5,
            food: 5,
            service: 5,
            interior: 5,
        }
    }, {
        author: GROGU,
        place: COFFEE_SHOP,
        description: 'Really good place',
        ratings: {
            overAll: 5,
            food: 5,
            service: 5,
            interior: 5,
        }
    },)

    AMELA.reviews = [
        review1,
        review2,
        review4,
        review5,
        review6,
    ];
  const reviews = [
        review1,
        review2,
        review4,
        review5,
        review6,
    ];

    AMELA.set('reviews', reviews);

    AMELA.update({reviews});

    await mongoose.connection.close();
};

run().catch(e => console.error(e));
