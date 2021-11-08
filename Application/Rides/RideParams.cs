using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Rides
{
    public class RideParams : PagingParams
    {
        public bool OrderByRecent { get; set; }
    }
}