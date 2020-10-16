const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.port}/${DB_NAME}?retryWrites=true$w=majority`;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

// Libreria de Mongo
class MongoLib {

  constructor(){
    this.client = new MongoClient(MONGO_URI, {useNewUrlParser: true })
    this.dbName = DB_NAME;
  }

  // Método para conectarnos a la BD 
  connect(){

    // Consultamos si ya hay una conexión abierta
    if (!MongoLib.connection){
      MongoLib.connection = new Promise((resolve, reject) => {

        // Invocamos al cliente de Mongo 
        this.client.connect(err => {
          if (err){
            reject(err);
          }

          console.log("Connected succesfully to Mongo")
          // Conectamos correctamente 
          resolve(this.client.db(this.dbName));
        })
      })
    }
    
  // Retornamos la conexión
  return MongoLib.connection;
  }

  //Obtener todos los elementos
  getAll(collection, query){

    return this.connect().then(db => {
      return db.collection(collection).find(query).toArray();
    })

  }
  //Obtener un elemento especifico
  get(collection, id){
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id)});
    })

  }
  //Crear un elemento
  create(collection, data){

    return this.connect().then(db => {
      return db.collection(collection).insertOne(data);
    }).then( result => result.insertId)
  }
  //Actualizar un elemento
  update(collection, id, data){
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: ObjectId(id)}, {$set: data}, {upsert: true});
    }).then( result => result.upsertedId || id )

  }
  //Eliminar un elemento
  delete(collection, id){
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: ObjectId(id)});
    }).then(()=> id )

  }

};

module.exports = MongoLib;