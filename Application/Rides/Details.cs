using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Rides
{
    public class Details
    {
        public class Query : IRequest<Result<Ride>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Ride>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Ride>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ride = await _context.Rides.FindAsync(request.Id);

                return Result<Ride>.Success(ride); 
            }
        }
    }
}