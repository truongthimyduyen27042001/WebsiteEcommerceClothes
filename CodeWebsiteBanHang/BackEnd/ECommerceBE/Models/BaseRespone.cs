using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceBE.Models
{
    public class BaseRespone
    {
        public bool Success { get; set; }
        public Object Data { get; set; }

        public BaseRespone()
        {

        }

        public BaseRespone(bool success , Object data)
        {
            Success = success;
            Data = data;
        }
    }
}
