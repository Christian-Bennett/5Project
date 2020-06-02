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
    private MongoClient client { get; set; }
    private IMongoDatabase db { get; set; }
    public List<T> Get<T>()
    {
      string collName = typeof(T).ToString();
      var collection = db.GetCollection<T>(collName);
      return collection.Find(new BsonDocument()).ToList();
    }

    public List<T> Get<T>(T model)
    {
      string collName = typeof(T).ToString();
      var uId = model.GetType().GetProperty("id").GetValue(model);
      var collection = db.GetCollection<T>(collName);
      return collection.Find(Builders<T>.Filter.Eq("id", uId)).ToList();
    }

    public void Post<T>(T model) 
    {
      string collName = typeof(T).ToString();
      IMongoCollection<T> collection = db.GetCollection<T>(collName);
      collection.InsertOne(model);
    }

    public void Put<T>(T model)
    {
      string collName = typeof(T).ToString();
      var uId = model.GetType().GetProperty("id").GetValue(model);
      var dbFilter = Builders<T>.Filter.Eq("id", uId);
      db.GetCollection<T>(collName).ReplaceOne(dbFilter, model);
    }

    public void Delete<T>(T model)
    {
      string collName = typeof(T).ToString();
      var uId = model.GetType().GetProperty("id").GetValue(model);
      db.GetCollection<T>(collName).DeleteOne(Builders<T>.Filter.Eq("id", uId));
    }

    public MongoDb()
    {
      client = new MongoClient("mongodb://127.0.0.1:27017");
      db = client.GetDatabase("5Project");
    }
  }
}