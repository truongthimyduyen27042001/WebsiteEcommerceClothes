using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceBE.Models
{
    public class Orders
    {
        public int orderID { get; set; }
        public int proID { get; set; }
        public int userID { get; set; }
        public int proNum { get; set; }
        public string orderCTime { get; set; }
        public int orderStatus { get; set; }
        public string oderATime { get; set; }
        public string orderAddress { get; set; }
    }

    public class OrdersFormUser
    {
        public int orderID { get; set; }
        public string proName { get; set; }
        public int proNum { get; set; }
        public double total { get; set; }
        public string orderCTime { get; set; }
        public string orderStatus { get; set; }
        public string orderATime { get; set; }
        //Duyen them vao , lấy link ảnh của sản phẩm order
        public string orderIMG { get; set; }
        public string orderAddress { get; set; }
        public string proBrand { get; set; }
        public double proOldPrice { get; set; }
        public double proPrice { get; set; }
    }

    public class OrdersFormAdmin
    {
        public int orderID { get; set; }
        public string proName { get; set; }
        public int proNum { get; set; }
        public string userName { get; set; }
        public string userPhone { get; set; }
        public string userAddress { get; set; }
        public string orderIMG { get; set; }
    }
}
