
using Application.Rides;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Ride, Ride>();
            CreateMap<Ride, RideDto>()
                .ForMember(d => d.Profile, o => o.MapFrom(s => s.User));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.UserName));
        }
    }
}