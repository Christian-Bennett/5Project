using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text;
using Domain.Models;
using Storage.Database;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
      //private readonly string URL = "http://swapi.dev/api/";
      private readonly HttpClient _http;
      private readonly ILogger<UserController> _logger;
      private readonly MongoDb _mongoDb;

      public string result = "";

      public UserController(ILogger<UserController> logger, HttpClient http, MongoDb mongoDb)
      {
          _logger = logger;
          _http = http;
          _mongoDb = mongoDb;
      }

      [HttpGet]
      public IActionResult Get()
      {
        var result = _mongoDb.Get<UserModel>();
        return Ok(result);
      }

      [HttpPost]
      public IActionResult GetOne(UserModel userModel)
      {
        var result = _mongoDb.Get<UserModel>(userModel);
        return Ok(result);
      }


      [HttpPost]
      public IActionResult Post(UserModel userModel)
      {
        _mongoDb.Post(userModel); //await _http.GetAsync(sb.ToString());
        return Ok();
      }

      [HttpPut]
      public IActionResult Put(UserModel userModel)
      {
        _mongoDb.Put(userModel); //await _http.GetAsync(sb.ToString());
        return Ok();
      }

      [HttpDelete]
      public IActionResult Delete(UserModel userModel)
      {
        _mongoDb.Delete<UserModel>(userModel);
        return Ok();
      }


    }
}