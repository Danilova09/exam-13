const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
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
    })

    await mongoose.connection.close();
};

run().catch(e => console.error(e));
