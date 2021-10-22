using System;
using Application.Profiles;

namespace Application.Rides
{
    public class RideDto
    {
        public Guid Id { get; set; }
        public string BeginAddress { get; set; }
        public string Destination { get; set; }
        public DateTime Date { get; set; }
        public Profile Profile { get; set; } 
    }
}