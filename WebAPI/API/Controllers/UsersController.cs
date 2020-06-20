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

namespace API.Controllers
{
    [EnableCors]
    [ApiController]
    [Route("[controller]/[action]")]
    public class UsersController : ControllerBase
    {
      //private readonly string URL = "http://swapi.dev/api/";
      private readonly HttpClient _http;
      private readonly ILogger<UsersController> _logger;
      private readonly MongoDb _mongoDb;
      private DbEvents _dbEvent;
      private DbLogController _dbl;
      public string result = "";

      public UsersController(ILogger<UsersController> logger, HttpClient http, MongoDb mongoDb)
      {
          _dbEvent = new DbEvents();
          _logger = logger;
          _http = http;
          _mongoDb = mongoDb;
          _dbl = new DbLogController(mongoDb);
          _dbEvent.DbEvent += (object sender, DbEventArgs args) =>
          {
            _dbl.onPost(sender, args);
          };
      }

      [HttpGet]
      public IActionResult Get()
      {
        var result = _mongoDb.Get<UserModel>();
        return Ok(result);

      }

      [HttpGet]
      public IActionResult GetOne()
      {
        var result = _mongoDb.Get<UserModel>(Request.QueryString.ToString().Substring(4));
        _dbEvent.OnDbEvent($"Get {result.id.ToString()}");
        return Ok(result);
      }

      [HttpGet]
      public IActionResult Login()
      {
        _dbEvent.OnDbEvent($"Login Attempt {Request.QueryString.ToString().Substring(4)}");
        var result = _mongoDb.Login<UserModel>(Request.QueryString.ToString().Substring(4));
        return Ok(result);
      }

      [HttpPost]
      public IActionResult Post([FromBody] UserModel userModel)
      {
        // if(_mongoDb.Post(userModel))
        // {
        //   _dbEvent.OnDbEvent($"Post {userModel.id.ToString()}");
        // }
        // else{
        //   _dbEvent.OnDbEvent("Username Taken");
        // }
        _mongoDb.Post(userModel);

        return Ok();
      }

      [HttpPut]
      public IActionResult Put([FromBody] UserModel userModel)
      {
        _mongoDb.Put(userModel); 
        _dbEvent.OnDbEvent($"Put {userModel.id.ToString()}");
        return Ok();
      }

      [HttpDelete]
      public IActionResult Delete()
      {
        var uId = Request.QueryString.ToString().Substring(4);
        _mongoDb.Delete<UserModel>(uId);
        _dbEvent.OnDbEvent($"Delete {uId}");
        return Ok();
      }


    }
}