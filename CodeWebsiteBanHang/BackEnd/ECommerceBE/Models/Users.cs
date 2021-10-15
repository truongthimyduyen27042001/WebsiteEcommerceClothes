using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceBE.Models
{
    public class Users
    {
        public int userID { get; set; }
        public string userName { get; set; }
        public string userAccName { get; set; }
        public string userPass { get; set; }
        public string userPhone { get; set; }
        public string userAddress { get; set; }
        public int userStatus { get; set; }
        public bool isAdmin { get; set; }
        public string userLinkAvatar { get; set; }
    }

    public class UsersInFo
    {
        public int userID { get; set; }
        public string userName { get; set; }
        public string userAccName { get; set; }
        public string userStatus { get; set; }
        public string userPhone { get; set; }
        public string userAddress { get; set; }
    }
}
