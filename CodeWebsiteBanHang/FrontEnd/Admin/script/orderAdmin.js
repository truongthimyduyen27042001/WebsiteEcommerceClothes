
//Thực hiện cài đắt link dẫn đi vào các trang cho 3 button quản lý

$(document).ready(function () {
  console.log("ready!");
  requestDataOrders("http://localhost:37504/api/Orders/GetListOrders")
});



function requestDataOrders(url) {
  $.ajax({
      url: url,
      data: null,
      cache: false,
      type: "GET",
      success: function (response) {
          if (response.success) {
              loadData(response.data)
          }
          else {
              alert(response.message)
          }
      },
      error: function (xhr) {

      }
  });
}


var loadData = function (ods) {
  for (var i = 0; i < ods.length; i++) {
      var productHtml = `
      <div class="row list product">
                              <div class="cell" data-title="ID">
                              ${ods[i].orderID}
                              </div>
                              <div class="cell" id="proName" data-title="productName">
                              ${ods[i].proName}
                              </div>
                              <div class="cell soluong" data-title="Amount">
                              ${ods[i].proNum}
                              </div>
                              <div class="cell" data-title="Location">
                              ${ods[i].userName}
                              </div>
                              <div class="cell" data-title="numberSold">
                              ${ods[i].userPhone}
                              </div>
                              <div class="cell func edit" data-title="edit">
                              ${ods[i].userAddress}
                              </div>
                              <div class="cell func" data-title="conform">
                              <input type="button" name="thethao" value="Xác nhận" onclick = "XacNhanDonHang(${ods[i].orderID})">
                              </div>
                              <div class="cell func" data-title="delete">
                                  <i class="fas fa-trash-alt" onclick = "HuyDonHang(${ods[i].orderID})"></i>
                              </div>
                          </div>
                        
  `
      $("#order-list-row").append(productHtml)
  }
}

function HuyDonHang(id) {
  requestCancelOrdersByID("http://localhost:37504/api/Orders/HuyDonHang?orID=" + id)
}

function XacNhanDonHang(id) {
  requestAcceptOrdersByID("http://localhost:37504/api/Orders/AcceptOrder?orID=" + id);
}

function requestCancelOrdersByID(url) {
  $.ajax({
      url: url,
      data: null,
      cache: false,
      type: "DELETE",
      success: function (response) {
          if (response.success) {
              alert("đã hủy đơn hàng")
              location.reload()
          }
          else {
              alert("Trạng thái đơn hàng không thể hủy!")
          }
      },
      error: function (xhr) {

      }
  });
}

function requestAcceptOrdersByID(url) {
  $.ajax({
      url: url,
      data: null,
      cache: false,
      type: "PUT",
      success: function (response) {
          if (response.success) {
              alert("đã xác nhận đơn hàng")
              location.reload()
          }
          else {
              alert("Lỗi ? :v")
          }
      },
      error: function (xhr) {

      }
  });
}