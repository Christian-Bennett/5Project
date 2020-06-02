using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Storage.Database
{
  public class MongoDb
  {
    public List<T> Get<T>()
    {
      var client = new MongoClient("mongodb://127.0.0.1:27017");
      var db = client.GetDatabase("People");
      
      var collection = db.GetCollection<T>("Person");
      
      return collection.Find(new BsonDocument()).ToList();

    }

    public void Post<T>(T pm)
    {
      var client = new MongoClient("mongodb://127.0.0.1:27017");
      var db = client.GetDatabase("People");

      IMongoCollection<T> collection = db.GetCollection<T>("Person");
      collection.InsertOne(pm);

    }

    

    public MongoDb()
    {

      // var client = new MongoClient();
      // db = client.GetDatabase(database);
      // var client = new MongoClient("mongodb://127.0.0.1:27017");
      // var db = client.GetDatabase("foo");

    }
  }
}