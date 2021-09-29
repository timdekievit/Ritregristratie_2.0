using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Rides
{
    public class Details
    {
        public class Query : IRequest<Ride>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Ride>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Ride> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Rides.FindAsync(request.Id);
            }
        }
    }
}