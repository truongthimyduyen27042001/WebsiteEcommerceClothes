
// $("#proManage").click(function(){
//     window.location.href="../src/productManage.html"
// })
// $("#orderManage").click(function(){
//     window.location.href="../src/orderAdmin.html"
// })
// $("#userManage").click(function(){
//     window.location.href="../src/userManage.html"
// })

$(document).ready(function () {
    console.log("ready!");
    requestDataUser("http://localhost:37504/api/Users/LayListThongTinUsers")
});
$( '#logOut' ).click(function() {
    window.location.href="../../giaodienchinh/src/index.html"
  });

function requestDataUser(url) {
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

var loadData = function (usr) {
    for (var i = 0; i < usr.length; i++) {
        var productHtml = `
        <div class="row list product">
                                <div class="cell" data-title="ID">
                                ${usr[i].userID}
                                </div>
                                <div class="cell" id="proName" data-title="productName">
                                ${usr[i].userAccName}
                                </div>
                                <div class="cell nameAccount" data-title="Amount">
                                ${usr[i].userName}
                                </div>
                                <div class="cell hinhanh" data-title="Location">
                                ${usr[i].userStatus}
                                </div>
                                <div class="cell" data-title="numberSold">
                                ${usr[i].userPhone}
                                </div>
                                <div class="cell func edit" data-title="edit">
                                ${usr[i].userAddress}
                                </div>
                                <div class="cell func" data-title="conform">
                                    <button type="button" class="btn btn-outline-success" onclick = "LSMH()">Xem</button>
                                </div>
                                <div class="cell func" data-title="delete">
                                    <i class="fas fa-trash-alt" onclick = "KhoaTaiKhoan(${usr[i].userID})"></i>
                                </div>
                            </div>
                          
    `
        $("#user-list-row").append(productHtml)
    }
}

function LSMH() {
    alert("Chức năng này sẽ được cập nhật sau!")
}

function KhoaTaiKhoan(id) {
    requestLockUsersByID("http://localhost:37504/api/Users/KhoaTaiKhoan?userID=" + id)
}

function requestLockUsersByID(url) {
    $.ajax({
        url: url,
        data: null,
        cache: false,
        type: "DELETE",
        success: function (response) {
            if (response.success) {
                alert("Khóa tài khoản thành công!")
                location.reload()
            }
            else {
                alert("Khóa tài khoản thất bại! Có thể tài khoản là Admin hoặc đã bị khóa trước đó!")
            }
        },
        error: function (xhr) {

        }
    });
}