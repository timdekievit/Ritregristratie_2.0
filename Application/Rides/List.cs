using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rides
{
    public class List
    {
        public class Query : IRequest<Result<List<Ride>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Ride>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Ride>>> Handle(Query request, CancellationToken cancellationToken)
            {
                 return Result<List<Ride>>.Success(await _context.Rides.ToListAsync());
            }
        }
    }
}