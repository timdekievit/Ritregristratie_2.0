using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Rides;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RidesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Ride>>> GetRides()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ride>> GetRide(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateRide(Ride Ride)
        {
            return Ok(await Mediator.Send(new Create.Command {Ride = Ride}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditRide(Guid id, Ride Ride)
        {
            Ride.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Ride = Ride}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRide(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}