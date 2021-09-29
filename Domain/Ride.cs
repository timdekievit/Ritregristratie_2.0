using System;

namespace Domain
{
    public class Ride
    {
        public Guid Id { get; set; }
        public string BeginAddress { get; set; }
        public string Destination { get; set; }
        public DateTime Date { get; set; }
    }
}