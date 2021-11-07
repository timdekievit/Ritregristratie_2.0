using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.GoogleMaps;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class GoogleMapsController : ControllerBase
    {
        private readonly IOptions<GoogleMapsSettings> config;

        public GoogleMapsController(IOptions<GoogleMapsSettings> config)
        {
            this.config = config;
        }

        [HttpGet]
        public ActionResult<string> GetApiKey()
        {
            return config.Value.Apikey;
        }

        // private GoogleMapsSettings CreateUserObject(AppUser user)
        // {
        //     return new GoogleMapsSettings
        //     {
        //         Apikey = config.Value;
        //     };
        // }
    }
}