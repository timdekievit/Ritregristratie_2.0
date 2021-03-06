using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core;
using Application.Rides;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RidesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetRides([FromQuery]RideParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRide(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRide(Ride Ride)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Ride = Ride}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditRide(Guid id, Ride Ride)
        {
            Ride.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Ride = Ride}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRide(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}