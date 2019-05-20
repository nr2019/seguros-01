//************************************************
//  Puerto *
//************************************************
process.env.PORT = process.env.PORT || 3000;

//************************************************
//  Entorno
//************************************************
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//************************************************
//  Base de datos 
//************************************************
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/serguros';
} else {
    //   urlDB = 'mongodb+srv://basemdb:Base19!nuevo@cluster0-21tuj.mongodb.net/cafe';
}

// esta la invento yo
process.env.URLDB = urlDB;