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

      public string result = "";

      public UsersController(ILogger<UsersController> logger, HttpClient http, MongoDb mongoDb)
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
      public IActionResult GetOne([FromBody] UserModel UserModel)
      {
        var result = _mongoDb.Get<UserModel>(UserModel);
        return Ok(result);
      }


      [HttpPost]
      public IActionResult Post(UserModel UserModel)
      {
        _mongoDb.Post(UserModel); //await _http.GetAsync(sb.ToString());
        return Ok();
      }

      [HttpPut]
      public IActionResult Put(UserModel UserModel)
      {
        _mongoDb.Put(UserModel); //await _http.GetAsync(sb.ToString());
        return Ok();
      }

      [HttpDelete]
      public IActionResult Delete(UserModel UserModel)
      {
        _mongoDb.Delete<UserModel>(UserModel);
        return Ok();
      }


    }
}