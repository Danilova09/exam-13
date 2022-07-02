const path = require('path');
const rootPath = __dirname;

let dbUrl = 'mongodb://localhost/exam-13';
let port = 8000;

if (process.env.NODE_ENV === 'test') {
    dbUrl = 'mongodb://localhost/exam-13-test';
    port = 8010;
}

module.exports = {
    port,
    corsWhitelist: [
        'http://localhost:4200',
        'https://localhost:4200',
        'http://localhost:4210',
    ],
    rootPath,
    avatarsUploadPath: path.join(rootPath, 'public/uploads/images/avatars'),
    placesUploadPath: path.join(rootPath, 'public/uploads/images/places'),
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: dbUrl,
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '604062117590390',
        appSecret: '4b3ebfffaa9b12649084a85d69f648a5'
    }
};
