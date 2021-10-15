using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceBE.Models
{
    public class Products
    {
        public int proID { get; set; }
        public string proName { get; set; }
        public string proBrand { get; set; }
        public string proOrigin { get; set; }
        public double proOldPrice { get; set; }
        public double proPrice { get; set; }
        public string proDescription { get; set; }
        public int proStatus { get; set; }
        public int catID { get; set; }
        public string proLinkPicture { get; set; }
        public string proLinkPicture1 { get; set; }
        public string proLinkPicture2 { get; set; }
        public string proLinkPicture3 { get; set; }
        public int proNOS { get; set; }
    }

    public class ProductsManage
    {
        public int proID { get; set; }
        public string proName { get; set; }
        public string proLinkPicture { get; set; }
        public string category { get; set; }
        public int proNOS { get; set; }
    }
}
