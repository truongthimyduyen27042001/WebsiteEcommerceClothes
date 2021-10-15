using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceBE.Controllers
{
    public class DBHelper
    {
        private static DBHelper _Instance;
        private SqlConnection cnn;
        public static DBHelper Instance
        {
            get
            {
                if (_Instance == null)
                {
                    // vu
                    //string cnnstr = @"Data Source=DESKTOP-P6C180P\SQLEXPRESS;Initial Catalog=DB_ShopTheThao;Integrated Security=True";

                    // duyen
                    string cnnstr = @"Data Source=DESKTOP-D9VU28Q\SQLEXPRESS;Initial Catalog=DB_ShopTheThao;Integrated Security=True";

                    // dung
                    //string cnnstr = @"Data Source=DESKTOP-0H7QQE6\SQLEXPRESS;Initial Catalog=PBL3_ShopTheThao;Integrated Security=True";

                    // tri


                    _Instance = new DBHelper(cnnstr);
                }
                return _Instance;
            }
            private set { }
        }
        private DBHelper(string s)
        {
            cnn = new SqlConnection(s);
        }

        public DataTable GetRecords(string sql)
        {
            DataTable dt = new DataTable();
            SqlCommand cmd = new SqlCommand(sql, cnn);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataSet sd = new DataSet();
            cnn.Open();
            da.Fill(dt);
            cnn.Close();
            return dt;
        }

        public void ExcuteDB(string sql)
        {
            SqlCommand cmd = new SqlCommand(sql, cnn);
            cnn.Open();
            cmd.ExecuteNonQuery();
            cnn.Close();
        }
    }
}
