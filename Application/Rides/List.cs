using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<RideDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName ==
                    _userAccessor.GetUsername());

                var rides = await _context.Rides
                    .Where(u => u.User.UserName == user.UserName)
                    .OrderBy(r => r.Date)
                    .ToListAsync();

                // var rides = await _context.Rides
                // .Include(u => u.User)
                // .ToListAsync();

                var ridesToReturn = _mapper.Map<List<RideDto>>(rides);

                return Result<List<RideDto>>.Success(ridesToReturn);
            }
        }
    }
}