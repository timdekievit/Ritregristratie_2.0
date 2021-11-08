using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rides
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<RideDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<RideDto>>>
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

            public async Task<Result<PagedList<RideDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName ==
                    _userAccessor.GetUsername());

                var query = _context.Rides
                    .Where(u => u.User.UserName == user.UserName)
                    .OrderBy(r => r.Date)
                    .ProjectTo<RideDto>(_mapper.ConfigurationProvider,
                        new { currentUsername = user })
                    .AsQueryable();

                return Result<PagedList<RideDto>>.Success(
                    await PagedList<RideDto>.CreateAsync(query,
                        request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}