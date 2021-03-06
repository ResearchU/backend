import express from 'express';
import { routes } from './routes';
import { initializeDbConnection } from "./db";
//const mongoose = require('mongoose');
import path from 'path';

// const app = express(),
//     port = 8000;
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });

