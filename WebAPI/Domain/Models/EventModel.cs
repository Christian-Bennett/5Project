using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Models
{
  public class EventModel{
    
    [BsonId]
    public Guid id { get; set; }
    public string MethodUsed { get; set; }
    public string UserId { get; set; }
    public EventModel()
    {
      id = new Guid();
    }

  }
}