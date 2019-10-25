const  mongoose = require('mongoose');
const {node_env} = process.env;
const MONGO_URL = 'mongodb+srv://sojung:sojung@cluster1-oxtuz.mongodb.net/test?retryWrites=true&w=majority';

module.exports = () => {
    const connect = () => {
        if (node_env !== 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect(MONGO_URL, {
            dbName: 'reactdb',
        }, (error) => {
            if (error) {
                console.log('mongodb connection error', error);
            } else {
                console.log('mongodb connection success');
            }
        });
    };
    connect();

    mongoose.connection.on('error', (error) => {
        console.error('mongodb connection error', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.error('mongodb connected fail');
    });
    require('./user');
};