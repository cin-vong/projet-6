const express = require('express');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/users')

const app = express();

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());
  
  mongoose.connect('mongodb+srv://so-pekocko:NgBL0rDrFf7jE4rO@cluster0.z8zqc.mongodb.net/so-pekocko-sauces?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  mongoose.set('useCreateIndex', true);

//debug mod of mongoose//
mongoose.set('debug', true);


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

  app.use('/images', express.static(path.join(__dirname, 'images')))

  app.use(limiter);

  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  
module.exports = app;