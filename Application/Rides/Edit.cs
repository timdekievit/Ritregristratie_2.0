using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Rides
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Ride Ride { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var ride = await _context.Rides.FindAsync(request.Ride.Id);

                _mapper.Map(request.Ride, ride);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}