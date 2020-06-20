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

    public T Get<T>(string uId)
    {
      string collName = typeof(T).ToString();
      var collection = db.GetCollection<T>(collName);
      var users = collection.Find(Builders<T>.Filter.Eq("id", uId)).ToList();
      return users[0];
    }

    public T Login<T>(string username)
    {
      string collName = typeof(T).ToString();
      var collection = db.GetCollection<T>(collName);
      var users = collection.Find(Builders<T>.Filter.Eq("Username", username)).ToList();
      //System.Console.WriteLine(users[0].GetType().GetProperty("Password").GetValue(users[0]));      
      return users[0];
    }

    public bool Post<T>(T model) 
    {
      model.GetType().GetProperty("id").SetValue(model, Guid.NewGuid());
      string collName = typeof(T).ToString();
      IMongoCollection<T> collection = db.GetCollection<T>(collName);
      if(model.GetType().ToString() == "Domain.Models.EventModel")
      {
        return true;
      }
      var username = model.GetType().GetProperty("Username").GetValue(model);
      var nameCheck = collection.Find(Builders<T>.Filter.Eq("Username", username)).ToList();
      if(nameCheck.Count == 0){
        collection.InsertOne(model);
        return true;
      }
      return false;
    }

    public void Put<T>(T model)
    {
      string collName = typeof(T).ToString();
      var uId = model.GetType().GetProperty("id").GetValue(model);
      db.GetCollection<T>(collName).ReplaceOne(Builders<T>.Filter.Eq("id", uId), model);
    }

    public void Delete<T>(string uId)
    {
      string collName = typeof(T).ToString();
      db.GetCollection<T>(collName).DeleteOne(Builders<T>.Filter.Eq("id", uId));
    }

    public MongoDb()
    {
      client = new MongoClient("mongodb://127.0.0.1:27017");
      db = client.GetDatabase("5Project");
    }
  }
}