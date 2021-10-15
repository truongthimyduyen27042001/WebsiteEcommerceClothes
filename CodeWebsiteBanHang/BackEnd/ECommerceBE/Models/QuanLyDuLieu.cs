using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using ECommerceBE.Models;


// làm việc trực tiếp với sql ở nơi này!


namespace ECommerceBE.Controllers
{
    public class QuanLyDuLieu
    {
        public List<Products> LayListSanPham ()
        {
            List<Products> data = new List<Products>();
            string query = "Select * from Products";
            foreach(DataRow i in DBHelper.Instance.GetRecords(query).Rows)
            {
                data.Add(LaySanPham(i));
            }
            return data;
        }

        public Products LaySanPham(DataRow i)
        {
            Products pro = new Products();
            pro.proID = Convert.ToInt32(i[0]);
            pro.proName = i[1].ToString();
            pro.proBrand = i[2].ToString();
            pro.proOrigin = i[3].ToString();
            pro.proOldPrice = Convert.ToInt32(i[4]);
            pro.proPrice = Convert.ToInt32(i[5]);
            pro.proDescription = i[6].ToString();
            pro.proStatus = Convert.ToInt32(i[7]);
            pro.catID = Convert.ToInt32(i[8]);
            pro.proLinkPicture = i[9].ToString();
            pro.proLinkPicture1 = i[10].ToString();
            pro.proLinkPicture2 = i[11].ToString();
            pro.proLinkPicture3 = i[12].ToString();
            pro.proNOS = Convert.ToInt32(i[13]);
            return pro;
        }

        public void SuaSanPham(Products p)
        {
            string query = "update Products set proName = N'" + p.proName + "', proBrand = N'" + p.proBrand + 
                "', proOrigin = N'" + p.proOrigin + "', proOldPrice = " + p.proOldPrice + ", proPrice = " + p.proPrice +
                ", proDescription = N'" + p.proDescription + "', catID = " + p.catID + ", proLinkPicture = N'" + 
                p.proLinkPicture + "',proLinkPicture1 = N'" + p.proLinkPicture1 + "', proLinkPicture2 = N'" + 
                p.proLinkPicture2 + "', proLinkPicture3 = N'" + p.proLinkPicture3 + "' where proID = " + p.proID;
            DBHelper.Instance.ExcuteDB(query);
        }

        public void SuaSanPhamKhongHinh(Products p)
        {
            string query = "update Products set proName = N'" + p.proName + "', proBrand = N'" + p.proBrand +
                "', proOrigin = N'" + p.proOrigin + "', proOldPrice = " + p.proOldPrice + ", proPrice = " + p.proPrice +
                ", proDescription = N'" + p.proDescription + "', catID = " + p.catID +  " where proID = " + p.proID;
            DBHelper.Instance.ExcuteDB(query);
        }

        public void ThemSanPham(Products p)
        {
            string query = "insert into Products(proName, proBrand, proOrigin, proOldPrice, proPrice, proDescription," +
                " catID, proLinkPicture, proLinkPicture1, proLinkPicture2, proLinkPicture3) values (N'" + p.proName +
                "', N'" + p.proBrand + "', N'" + p.proOrigin + "', " + p.proOldPrice + ", " + p.proPrice + ", N'" +
                p.proDescription + "', " + p.catID + ", N'" + p.proLinkPicture + "', N'" + p.proLinkPicture1 + "', N'" +
                p.proLinkPicture2 + "', N'" + p.proLinkPicture3 + "')";
            DBHelper.Instance.ExcuteDB(query);
        }

        public void XoaSanPham(int id)
        {
            string query = "update Products set proStatus = -1 where proID = " + id;
            DBHelper.Instance.ExcuteDB(query);
        }

        public List<Users> LayListNguoiDung()
        {
            List<Users> data = new List<Users>();
            DBHelper.Instance.ExcuteDB("UPDATE Users SET userPass = DecryptByPassPhrase('PBL3', userPass)");
            string query = "Select * from Users";
            foreach (DataRow i in DBHelper.Instance.GetRecords(query).Rows)
            {
                data.Add(LayNguoiDung(i));
            }
            DBHelper.Instance.ExcuteDB("UPDATE Users SET userPass = EncryptByPassPhrase('PBL3', userPass)");
            return data;
        }

        private Users LayNguoiDung (DataRow i)
        {
            Users temp = new Users();
            temp.userID = Convert.ToInt32(i[0]);
            temp.userName = i[1].ToString();
            temp.userAccName = i[2].ToString();
            temp.userPass = i[3].ToString();
            temp.userPhone = i[4].ToString();
            temp.userAddress = i[5].ToString();
            temp.userStatus = Convert.ToInt32(i[6]);
            temp.isAdmin = Convert.ToBoolean(i[7]);
            temp.userLinkAvatar = i[8].ToString(); 
            return temp;
        }

        public void DangKyTaiKhoan(Users u)
        {
            DBHelper.Instance.ExcuteDB("UPDATE Users SET userPass = DecryptByPassPhrase('PBL3', userPass)");
            string query = "insert into Users (userName, userAccName, userPass, userPhone, userAddress, isAdmin, " +
                "userLinkAvatar) values(N'" + u.userName + "', '" + u.userAccName + "', '" + u.userPass + "', '" +
                u.userPhone + "', N'" + u.userAddress + "', " + Convert.ToInt32(u.isAdmin) + ", N'" + u.userLinkAvatar + "')";
            DBHelper.Instance.ExcuteDB(query);
            DBHelper.Instance.ExcuteDB("UPDATE Users SET userPass = EncryptByPassPhrase('PBL3', userPass)");
        }

        public void SuaThongTinTaiKhoan(Users u)
        {
            string query = "update Users set userName = N'" + u.userName + "', userPhone ='" + u.userPhone + 
                "', userAddress = N'" + u.userAddress + "' where userID = " + u.userID;
            DBHelper.Instance.ExcuteDB(query);
        }

        public void DoiMatKhau(Users u)
        {
            DBHelper.Instance.ExcuteDB("UPDATE Users SET userPass = DecryptByPassPhrase('PBL3', userPass)");
            string query = "update Users set userPass = '" + u.userPass + "' where userID = " + u.userID;
            DBHelper.Instance.ExcuteDB(query);
            DBHelper.Instance.ExcuteDB("UPDATE Users SET userPass = EncryptByPassPhrase('PBL3', userPass)");
        }

        public void KhoaTaiKhoan ( int id )
        {
            string query = "update Users set userStatus = -1 where userID = " + id;
            DBHelper.Instance.ExcuteDB(query);
        }

        public List<Orders> LayListDonHang()
        {
            List<Orders> data = new List<Orders>();
            string query = "Select * from Orders";
            foreach (DataRow i in DBHelper.Instance.GetRecords(query).Rows)
            {
                data.Add(LayDonHang(i));
            }
            return data;
        }

        private Orders LayDonHang(DataRow i)
        {
            Orders temp = new Orders();
            temp.orderID = Convert.ToInt32(i[0]);
            temp.proID = Convert.ToInt32(i[1]);
            temp.userID = Convert.ToInt32(i[2]);
            temp.proNum = Convert.ToInt32(i[3]);
            temp.orderCTime = Convert.ToDateTime(i[4]).ToString("HH:mm:ss dd/MM/yyyy");
            temp.orderStatus = Convert.ToInt32(i[5]);
            if (i[6].ToString() == "")
            {
                temp.oderATime = i[6].ToString();
            } else
            {
                temp.oderATime = Convert.ToDateTime(i[6]).ToString("HH:mm:ss dd/MM/yyyy");
            }
            temp.orderAddress = i[7].ToString();
            return temp;
        }

        public void DatDon(Orders o)
        {
            string query = "insert into Orders (proID, userID, proNum, orderAddress) values (" +
                o.proID + ", " + o.userID + ", " + o.proNum + ", N'" + o.orderAddress + "')";
            DBHelper.Instance.ExcuteDB(query);
        }

        public Orders LayDonHangBangID(int id)
        {
            string q = "Select * from Orders where orderID = " + id;
            List<Orders> data = new List<Orders>();
            foreach (DataRow i in DBHelper.Instance.GetRecords(q).Rows)
            {
                data.Add(LayDonHang(i));
            }
            return data[0];
        }

        public void HuyDonHang(int id)
        {
            int sl = LayDonHangBangID(id).proNum;
            int pid = LayDonHangBangID(id).proID;
            string query = "update Orders set orderStatus = -1, oderATime = GETDATE() where orderID = " + id;
            string queryy = "update Products set proNOS = proNOS - " + sl + " where proID = " + pid;
            DBHelper.Instance.ExcuteDB(query);
            DBHelper.Instance.ExcuteDB(queryy);
        }

        public void XacNhanDon(int id)
        {
            string query = "update Orders set orderStatus = 1, oderATime = GETDATE() where orderID = " + id;
            DBHelper.Instance.ExcuteDB(query);
        }

        public void DaNhanHang(int id)
        {
            string query = "update Orders set orderStatus = 10 where orderID = " + id;
            DBHelper.Instance.ExcuteDB(query);
        }
    }
}
