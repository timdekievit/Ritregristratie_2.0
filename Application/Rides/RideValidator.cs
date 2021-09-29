using Domain;
using FluentValidation;

namespace Application.Rides
{
 public class RideValidator : AbstractValidator<Ride>
    {
        public RideValidator()
        {
            RuleFor(x => x.BeginAddress).NotEmpty();
            RuleFor(x => x.Destination).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}