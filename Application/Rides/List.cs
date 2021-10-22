using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rides
{
    public class List
    {
        public class Query : IRequest<Result<List<RideDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<RideDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<RideDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var rides = await _context.Rides
                .Include(u => u.User)
                .ToListAsync();

                var ridesToReturn = _mapper.Map<List<RideDto>>(rides);

                return Result<List<RideDto>>.Success(ridesToReturn);
            }
        }
    }
}