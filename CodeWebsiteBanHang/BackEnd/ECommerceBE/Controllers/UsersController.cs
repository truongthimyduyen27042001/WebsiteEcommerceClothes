using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ECommerceBE.Models;
using System;

namespace ECommerceBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // hàm kiểm tra để đăng ký mới...
        private bool Kiemtra(string taikhoan, string matkhau)
        {
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            foreach (Users i in dulieu.LayListNguoiDung())
            {
                if (i.userAccName == taikhoan) return false;
            }
            for (int i = 0; i < taikhoan.Length; i++)
            {
                if ((taikhoan[i] < 48 || taikhoan[i] > 57) && (taikhoan[i] < 65 || taikhoan[i] > 90)
                    && (taikhoan[i] < 97 || taikhoan[i] > 122)) return false;
            }
            for (int i = 0; i < matkhau.Length; i++)
            {
                if ((matkhau[i] < 48 || matkhau[i] > 57) && (matkhau[i] < 65 || matkhau[i] > 90)
                    && (matkhau[i] < 97 || matkhau[i] > 122)) return false;
            }
            return true;
        }

        [HttpPost("DangKy")]
        public BaseRespone DangKy(string taikhoan, string matkhau, string hvt, string sdt, string dc)
        {
            var res = new BaseRespone(false, false);
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            if (Kiemtra(taikhoan, matkhau))
            {
                Users temp = new Users();
                temp.userName = hvt;
                temp.userAccName = taikhoan;
                temp.userPass = matkhau;
                temp.userPhone = sdt;
                temp.userAddress = dc;
                temp.isAdmin = false;
                temp.userLinkAvatar = "https://lazi.vn/uploads/users/avatar/1586010042_0ac3294600fdbbace1702b5b9c7ce1dc.jpg";
                res.Success = true;
                dulieu.DangKyTaiKhoan(temp);
                res.Success = true;
            }
            return res;
        }


        //GET: api/Users
        [HttpGet("LayListUser")]
        public BaseRespone LayListUser()
        {
            var res = new BaseRespone(false, null);
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            List<Users> data = new List<Users>();
            foreach (Users i in dulieu.LayListNguoiDung())
            {
                data.Add(i);
            }
            if (data.Count != 0)
            {
                res.Data = data;
                res.Success = true;
            }
            return res;
        }

        //GET: api/Users/{id}
        [HttpGet("LayThongTinUser")]
        public BaseRespone GetUser(int userID)
        {
            var res = new BaseRespone(false, null);
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            foreach (Users i in dulieu.LayListNguoiDung())
            {
                if (i.userID == userID)
                {
                    res.Data = i;
                    res.Success = true;
                }
            }
            return res;
        }


        [HttpGet("LayListThongTinUsers")]
        public BaseRespone GetListUserInfo()
        {
            var res = new BaseRespone(false, null);
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            List<UsersInFo> data = new List<UsersInFo>();
            foreach (Users i in dulieu.LayListNguoiDung())
            {
                UsersInFo ui = new UsersInFo();
                ui.userID = i.userID;
                ui.userAccName = i.userAccName;
                ui.userName = i.userName;
                ui.userPhone = i.userPhone;
                ui.userAddress = i.userAddress;
                if (i.isAdmin == true) ui.userStatus = "Admin";
                else
                {
                    if (i.userStatus == -1) ui.userStatus = "Bị khóa";
                    else ui.userStatus = "Bình thường";
                }
                data.Add(ui);
            }
            res.Data = data;
            res.Success = true;
            return res;
        }


        //PUT: api/Users/{id}
        [HttpPut("SuaThongTinUser")]
        public BaseRespone Sua(int userID, string userName, string userPhone, string userAddress)
        {
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            var res = new BaseRespone(false, null);
            Users temp = new Users();
            temp.userID = userID;
            temp.userName = userName;
            temp.userPhone = userPhone;
            temp.userAddress = userAddress;
            temp.userLinkAvatar = "https://lazi.vn/uploads/users/avatar/1586010042_0ac3294600fdbbace1702b5b9c7ce1dc.jpg";
            dulieu.SuaThongTinTaiKhoan(temp);
            res.Success = true;
            return res;
        }

        private bool CheckMK(string matkhau)
        {
            for (int i = 0; i < matkhau.Length; i++)
            {
                if ((matkhau[i] < 48 || matkhau[i] > 57) && (matkhau[i] < 65 || matkhau[i] > 90)
                    && (matkhau[i] < 97 || matkhau[i] > 122)) return false;
            }
            return true;
        }

        [HttpPut("DoiMatKhau")]
        public BaseRespone DoiMK(int userID, string userPass)
        {
            var res = new BaseRespone(false, null);
            if (CheckMK(userPass))
            {
                QuanLyDuLieu dulieu = new QuanLyDuLieu();
                Users temp = new Users();
                temp.userID = userID;
                temp.userPass = userPass;
                dulieu.DoiMatKhau(temp);
                res.Success = true;
            }
            return res;
        }

        private Users LayIFNguoiDung(int uID)
        {
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            foreach (Users i in dulieu.LayListNguoiDung())
            {
                if (i.userID == uID)
                {
                    return i;
                }
            }
            return null;
        }

        //DELETE: api/Users/{id}
        [HttpDelete("KhoaTaiKhoan")]
        public BaseRespone KhoaTaiKhoan(int userID)
        {
            var res = new BaseRespone(false, null);
            QuanLyDuLieu dulieu = new QuanLyDuLieu();
            Users u = LayIFNguoiDung(userID);
            if ( u.userStatus != -1 && u.isAdmin == false )
            {
                dulieu.KhoaTaiKhoan(userID);
                res.Success = true;
            }
            return res;
        }
    }
}
