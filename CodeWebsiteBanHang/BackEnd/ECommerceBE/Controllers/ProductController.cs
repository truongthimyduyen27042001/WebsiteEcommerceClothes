using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ECommerceBE.Models;

namespace ECommerceBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        //GET: api/Products
        [HttpGet]
        public BaseRespone GetListProduct()
        {
            var res = new BaseRespone(false, null);
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            List<Products> data = new List<Products>();
            foreach (Products i in dulieu.LayListSanPham())
            {
                if (i.proStatus != -1) data.Add(i);
            }
            data.Reverse();
            if (data.Count != 0)
            {
                res.Success = true;
                res.Data = data;
            }
            return res;
        }

        [HttpGet("GetListProductManage")]
        public BaseRespone GetListProductManage()
        {
            var res = new BaseRespone(false, null);
            List<ProductsManage> data = new List<ProductsManage>();
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            foreach (Products i in dulieu.LayListSanPham())
            {
                if (i.proStatus != -1)
                {
                    ProductsManage pm = new ProductsManage();
                    pm.proID = i.proID;
                    pm.proName = i.proName;
                    pm.proLinkPicture = i.proLinkPicture;
                    if (i.catID == 1) pm.category = "Áo quần";
                    if (i.catID == 2) pm.category = "Giày";
                    if (i.catID == 3) pm.category = "Phụ kiện";
                    if (i.catID == 4) pm.category = "Bóng";
                    pm.proNOS = i.proNOS;
                    data.Add(pm);
                }
            }
            if (data.Count != 0)
            {
                res.Success = true;
                res.Data = data;
            }
            return res;
        }

        //GET: api/Products/{id}
        [HttpGet("GetProductByID")]
        public BaseRespone GetProduct(int proID)
        {
            var res = new BaseRespone(false, null);
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            foreach (Products i in dulieu.LayListSanPham())
            {
                if (i.proID == proID)
                {
                    res.Data = i;
                    res.Success = true;
                    return res;
                }
            }
            return res;
        }

        private List<Products> getListProByCatID(int IDCat)
        {
            List<Products> data = new List<Products>();
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            if (IDCat == 0)
            {
                foreach (Products i in dulieu.LayListSanPham())
                {
                    if (i.proStatus != -1)
                    {
                        data.Add(i);
                    }
                }
            }
            else
            {
                foreach (Products i in dulieu.LayListSanPham())
                {
                    if (i.catID == IDCat && i.proStatus != -1)
                    {
                        data.Add(i);
                    }
                }
            }
            return data;
        }

        [HttpGet("GetListProductByIDCat")]
        public BaseRespone GetProductCat(int catID)
        {
            var res = new BaseRespone(false, null);
            List<Products> data = getListProByCatID(catID);
            data.Reverse();
            res.Data = data;
            res.Success = true;
            return res;
        }

        [HttpGet("GetListSearch")]
        public BaseRespone searchlist(string s)
        {
            var res = new BaseRespone(false, null);
            List<Products> data = new List<Products>();
            foreach(Products i in getListProByCatID(0))
            {
                if (i.proName.ToUpper().Contains(s.ToUpper())) data.Add(i);
            }
            data.Reverse();
            res.Data = data;
            res.Success = true;
            return res;
        }

        // xếp theo giá giảm dần
        [HttpGet("GetSort1ListProductByIDCat")]
        public BaseRespone Get1ProductCat(int catID)
        {
            var res = new BaseRespone(false, null);
            List<Products> data = getListProByCatID(catID);
            for (int i = 0; i < data.Count - 1; i++)
            {
                for (int j = i + 1; j < data.Count; j++)
                {
                    if (data[i].proPrice > data[j].proPrice)
                    {
                        Products temp = data[i];
                        data[i] = data[j];
                        data[j] = temp;
                    }
                }
            }
            res.Data = data;
            res.Success = true;
            return res;
        }

        // xếp theo giá tăng dần
        [HttpGet("GetSort2ListProductByIDCat")]
        public BaseRespone Get2ProductCat(int catID)
        {
            var res = new BaseRespone(false, null);
            List<Products> data = getListProByCatID(catID);
            for (int i = 0; i < data.Count - 1; i++)
            {
                for (int j = i + 1; j < data.Count; j++)
                {
                    if (data[i].proPrice < data[j].proPrice)
                    {
                        Products temp = data[i];
                        data[i] = data[j];
                        data[j] = temp;
                    }
                }
            }
            res.Data = data;
            res.Success = true;
            return res;
        }

        // xếp theo ưu chuộng
        [HttpGet("GetSort3ListProductByIDCat")]
        public BaseRespone Get3ProductCat(int catID)
        {
            var res = new BaseRespone(false, null);
            List<Products> data = getListProByCatID(catID);
            for (int i = 0; i < data.Count - 1; i++)
            {
                for (int j = i + 1; j < data.Count; j++)
                {
                    if (data[i].proNOS < data[j].proNOS)
                    {
                        Products temp = data[i];
                        data[i] = data[j];
                        data[j] = temp;
                    }
                }
            }
            res.Data = data;
            res.Success = true;
            return res;
        }

        //PUT: api/Products/{id}
        [HttpPut("SuaThongTinSanPham")]
        public BaseRespone PutProduct(int proID, string proName, string proBrand, string proOrigin, 
            double proOldPrice, double proPrice, string proDescription, int catID, string proLinkPicture, 
            string proLinkPicture1, string proLinkPicture2, string proLinkPicture3)
        {
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            Products newP = new Products();
            var res = new BaseRespone(false, null);
            newP.proID = proID;
            newP.proName = proName;
            newP.proBrand = proBrand;
            newP.proOrigin = proOrigin;
            newP.proOldPrice = proOldPrice;
            newP.proPrice = proPrice;
            newP.proDescription = proDescription;
            newP.catID = catID;
            newP.proLinkPicture = proLinkPicture;
            newP.proLinkPicture1 = proLinkPicture1;
            newP.proLinkPicture2 = proLinkPicture2;
            newP.proLinkPicture3 = proLinkPicture3;
            //dulieu.SuaSanPhamKhongHinh(newP);
            dulieu.SuaSanPham(newP);
            res.Success = true;
            return res;
        }

        //POST: api/Products
        [HttpPost("ThemSanPham")]
        public BaseRespone PostProduct(string proName, string proBrand, string proOrigin,
            double proOldPrice, double proPrice, string proDescription, int catID, string proLinkPicture,
            string proLinkPicture1, string proLinkPicture2, string proLinkPicture3)
        {
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            Products newP = new Products();
            var res = new BaseRespone(false, null);
            newP.proName = proName;
            newP.proBrand = proBrand;
            newP.proOrigin = proOrigin;
            newP.proOldPrice = proOldPrice;
            newP.proPrice = proPrice;
            newP.proDescription = proDescription;
            newP.catID = catID;
            newP.proLinkPicture = proLinkPicture;
            newP.proLinkPicture1 = proLinkPicture1;
            newP.proLinkPicture2 = proLinkPicture2;
            newP.proLinkPicture3 = proLinkPicture3;
            dulieu.ThemSanPham(newP);
            res.Success = true;
            return res;
        }

        private Products LayIFSanPham(int proID)
        {
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            foreach (Products i in dulieu.LayListSanPham())
            {
                if (i.proID == proID)
                {
                    return i;
                }
            }
            return null;
        }

        //DELETE: api/Products/{id}
        [HttpDelete("XoaSanPham")]
        public BaseRespone DeleteProduct(int proID)
        {
            var res = new BaseRespone(false, null);
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            Products p = LayIFSanPham(proID);
            if (p.proStatus != -1)
            {
                dulieu.XoaSanPham(proID);
                res.Success = true;
            }
            return res;
        }
    }   
}
