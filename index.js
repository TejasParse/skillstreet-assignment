require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const noteRoutes = require("./routes/noteRoute");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected?");
    });

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes API',
            version: '1.0.0',
            description: 'Notes API Documentation',
        },
    },
    apis: ["./routes/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());

// Basic Authentication (Optional)
// const users = { 'admin': 'password' }; // Change to more secure credentials
// app.use(basicAuth({ users, challenge: true, unauthorizedResponse: 'Unauthorized' }));

app.use("/api/notes", noteRoutes)

app.use((err, req, res, next) => {
    // console.error(err.stack);
    // console.log(err.message);
    res.status(500).json({ error: err.message });
});

app.use("*", (req, res) => {
    res.status(404).json({
        error: "Route Not Found"
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app