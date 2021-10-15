let listdata = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
var UID = listdata[0].id;



$(document).ready(function () {
    console.log("ready!");
    requestDataOrdersByUID("http://localhost:37504/api/Orders/GetListOrdersByUID?userID=" + UID)
});

function requestDataOrdersByUID(url) {
    $.ajax({
        url: url,
        data: null,
        cache: false,
        type: "GET",
        success: function (response) {
            if (response.success) {
                console.log(response.data)
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
        console.log(ods.length)
        var productHtml = `
        <div class="row list product">
                                <div class="cell" data-title="ID">
                                ${ods[i].orderID}
                                </div>
                                <div class="cell" id="proName" data-title="Age">
                                ${ods[i].proName}
                                </div>
                                <div class="cell hinhanh" data-title="Occupation">
                                ${ods[i].proNum}
                                </div>
                                <div class="cell" data-title="amount">
                                ${ods[i].total}đ
                                </div>
                                <div class="cell" data-title="numberSold">
                                ${ods[i].orderCTime}
                                </div>
                                <div class="cell func edit" data-title="statusProduct">
                                ${ods[i].orderStatus}
                                </div>
                                <div class="cell func" data-title="delete">
                                ${ods[i].oderATime}
                                </div>
                                <div class="cell func" data-title="addmore">
                                    <input type="button" name="thethao" value="Hủy đơn hàng" onclick = "HuyDonHang(${ods[i].orderID})">
                                </div>
                            </div>
                          
    `
        $("#order-list-row").append(productHtml)
    }
}

function HuyDonHang(id) {
    requestCancelOrdersByID("http://localhost:37504/api/Orders/HuyDonHang?orID=" + id)
    console.log(id)
}
function requestCancelOrdersByID(url) {
    $.ajax({
        url: url,
        data: null,
        cache: false,
        type: "DELETE",
        success: function (response) {
            if (response.success) {
                console.log("chạy được")
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