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
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class APIController : ControllerBase
    {
      //private readonly string URL = "http://swapi.dev/api/";
      private readonly HttpClient _http;
      private readonly ILogger<APIController> _logger;
      private readonly MongoDb _mongoDb;

      public string result = "";

      public APIController(ILogger<APIController> logger, HttpClient http, MongoDb mongoDb)
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
      public ActionResult GetPost([FromBody] UserModel pm)
      {
        _mongoDb.Post(pm); //await _http.GetAsync(sb.ToString());
        return Ok();
      }
    }
}