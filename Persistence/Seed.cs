
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Rides.Any()) return;
            
            var activities = new List<Ride>
            {
                new Ride
                {
                    
                    BeginAddress = "Wassenaar",
                    Destination = "Leiden",
                    Date = DateTime.Now.AddMonths(-2),
                },

                new Ride
                {
                    
                    BeginAddress = "Amsterdam",
                    Destination = "Haarlem",
                    Date = DateTime.Now.AddMonths(-1),
                },

                new Ride
                {
                    
                    BeginAddress = "Denhaag",
                    Destination = "Zoetermeer",
                    Date = DateTime.Now.AddDays(-5),
                },
            };

            await context.Rides.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}