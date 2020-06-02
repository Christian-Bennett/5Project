using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Models
{
  public class UserModel
  {
    [BsonId]
    public Guid id { get; set; }
    public string Username { get; set; }
    public string Password { get{ return _password; } set{ _password = Password; } }
    private string _password;
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string EmailAddress { get; set; }






  }
}