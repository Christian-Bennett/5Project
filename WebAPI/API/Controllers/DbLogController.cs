using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Cors;
using System.Net.Http;
using System.Text;
using Domain.Models;
using Storage.Database;
using API.Events;
using static API.Events.DbEvents;

namespace API.Controllers
{
    [EnableCors]
    public class DbLogController : ControllerBase
    {
      //private readonly string URL = "http://swapi.dev/api/";
      private readonly MongoDb _mongoDb;

      public DbLogController(MongoDb mongoDb)
      {
          _mongoDb = mongoDb;
      }
      [HttpPost]
      public void onPost(object source, DbEventArgs e)
      {
        
        var eventModel = new EventModel(){
          MethodUsed = e.EventDetails.ToString(),
          UserId = "1"
        };
        _mongoDb.Post<EventModel>(eventModel);
        System.Console.WriteLine(e.EventDetails);
      }
    }
}