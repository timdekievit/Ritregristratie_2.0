using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rides
{
    public class List
    {
        public class Query : IRequest<List<Ride>> { }

        public class Handler : IRequestHandler<Query, List<Ride>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Ride>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Rides.ToListAsync();
            }
        }
    }
}