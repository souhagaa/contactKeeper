const express = require('express');
const connectDB = require('./config/db');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;
// Connect Database
connectDB()

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Swagger UI creates a docs page from a set of OpenAPI definitions
// swaggerDefinition defines the root information for your API.
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
     description:
      'This is a REST API application made with Express.',
    },
    servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

//set up Swagger UI with the swaggerSpec definitions and serve it to the /docs endpoint.
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define our routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

// Serve static assests in production
if(process.env.NODE_ENV === 'production') {
  // Serve static folder
  app.use(express.static('client/build'))
  
  // If we hit the home page it's going to load the index.html inside the build folder
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))