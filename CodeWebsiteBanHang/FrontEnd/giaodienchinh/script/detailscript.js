var username = document.getElementById("header__navbar-user-name")
var useraccount = document.getElementById("useraccount")
var logInOut = document.getElementById("logInOut")
let userIMG = document.getElementById("userIMG")
var adminEdit = document.getElementById("adminEdit")
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2")
var modal3 = document.getElementById("myModal3")
var modal4 = document.getElementById("myModal4")
let emailLogin = document.getElementById("emailLogin")
var login = document.getElementById("logInOut")
var user = document.getElementById("useraccount")
var adminManage = document.getElementById("adminManage")
let useNameLogin=document.querySelector('#userName')

// let totalProduct = document.getElementById("totalProduct");


// Hàm đổi tiền tệ 
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })
console.log(formatter.format(1000) )

var userdata = []

// Theem vao ne 

//kiểm tra trong localStorage đã có người đăng nhập hay chưa 
console.log("gio se check xem co ai dang nhap chua ")
let listdata = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
console.log("so luong localstorage" + listdata.length)
console.log("Xem thong tin nguoi dung : ")
if (listdata.length == 1) {
    useraccount.style.display = "flex"
    logInOut.style.display = "none"
    username.innerHTML = listdata[0].name
    userIMG.src = listdata[0].src
    document.getElementById("userContactIMG").src = listdata[0].srcIMG
    if (listdata[0].isAdmin == true) adminManage.style.display = "block"
    useNameLogin.innerHTML=listdata[0].name
}





//Nếu nhấn logout thì data sẽ xóa dữ liệu 
function logOut() {
    localStorage.removeItem("data");
    location.reload()
}

//ham dang xuat dang nhap hien form 
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function openRegister() {
    modal.style.display = "block";
}
function openLogInOut() {
    requestDataUser("http://localhost:37504/api/Users/LayListUser");
    modal2.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    modal2.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal || event.target == modal2 || event.target == modal3 || event.target == modal4) {
        modal.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
        modal4.style.display = "none";
    }
}
//ket thuc dang xuat dang nhap hien form

adminEdit.style.display = "none"


function requestDataDetail(url) {
    $.ajax({
        url: url,
        data: null,
        cache: false,
        type: "GET",
        success: function (response) {

            if (response.success) {
                console.log(response.success)
                loadData2(response.data)
            }
            else {
                alert(response.message)

            }
        },
        error: function (xhr) {
        }
    });
}

var loadData2 = function (proudcts) {
    var productHtml = `
        <div class="product-img">
            <div class="product-spe-img">
                <img src="${proudcts.proLinkPicture}" alt="hinhanh">
            </div>
            <div class="product-small-img">
                <img src="${proudcts.proLinkPicture1}" alt="">
                <img src="${proudcts.proLinkPicture2}" alt="">
                <img src="${proudcts.proLinkPicture3}" alt="">
                <img src="https://likefit.vn/wp-content/uploads/2020/07/snb3-600x600.jpg" alt="">
                <img src="https://likefit.vn/wp-content/uploads/2020/07/snb3-600x600.jpg" alt="">
            </div>
            <div class="product__sharing-icons hide-on-mobile-tablet">
                <div class="text">Chia sẻ:</div>
                <a href="#" class="product__action-icon messenger">
                    <i class="fab fa-facebook-messenger"></i>
                </a>
                <a href="#" class="product__action-icon facebook">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="#" class="product__action-icon google">
                    <i class="fab fa-google-plus"></i>
                </a>
                <a href="#" class="product__action-icon pinterest">
                    <i class="fab fa-pinterest"></i>
                </a>
                <a href="#" class="product__action-icon twitter">
                    <i class="fab fa-twitter-square"></i>
                </a>
               
            </div>
        </div>
        <div id="product-infor">
            <div class="product-infor-inner">
                <h1 class="product-title entry-title">
                   ${proudcts.proName}
               </div>
               <div class="product__price">
                <div class="product__price-main">
                    <span class="product__price-old">${formatter.format(proudcts.proOldPrice)}</span>
                    <div class="product__price-current">
                        <span class="product__price-new">${formatter.format(proudcts.proPrice)}đ</span>
                        <span class="product__price-label bgr-orange">${Math.floor((proudcts.proOldPrice - proudcts.proPrice) / proudcts.proOldPrice * 100)}%GIẢM</span>
                    </div>
                </div>
                <div class="product__price-slogan hide-on-mobile-tablet">
                    <i class="product__price-icon-tag fas fa-tags"></i>
                    <span class="product__price-slogan-text">Ở đâu rẻ hơn, Minecraft Shop hoàn
                        tiền</span>
                    <i class="product__price-icon-question far fa-question-circle"></i>
                </div>
            </div> 
            <div class="product-decription">
                <p class="product-detail-item"><strong>Mô tả sản phẩm</strong></p>
                <div class="product-detail-text">
                    <p>– <strong>Mô tả</strong>: ${proudcts.proDescription}</p>
                    <p>– <strong>Thương hiệu</strong>: ${proudcts.proBrand}</p>
                    <p>– <strong>Xuất xứ</strong>: ${proudcts.proOrigin}</p>
                </div>
            </div>
            <div class="product__qnt hide-on-mobile">
                <label class="product__qnt-label width-label">Số Lượng</label>
                <div class="shop__qnt-btns">
                    <button class="soluong" onclick = "giamsl()">
                        <i class="shop__qnt-btn-icon fas fa-minus"></i>
                    </button>
                    <input type='number' value=1 id='soluongg'> 
                    <button class="soluong" onclick = "tangsl()">
                        <i class="shop__qnt-btn-icon fas fa-plus"></i>
                    </button>
                </div>
                <div class="product__qnt-note">
                    <span class="product__qnt-note-num">1100</span>
                    sản phẩm có sẵn
                </div>
            </div>
            <div class="product-btns-main">
                <button class="product-btn-main product-btn-main__msg clear-btn hide-on-tablet">
                    <i class="product-btn-main__msg-icon far fa-comment-dots"></i>
                </button>
                <button class="product-btn-main product-btn-main__adding" onclick="MuaNgay()">
                    <i class="product-btn-main__adding-icon fas fa-cart-plus"></i>
                    <span class="product-btn-main__text product-btn-main__adding-text hide-on-mobile">Thêm Vào Giỏ Hàng</span>
                </button>
                <button onclick = "MuaNgay()" class="product-btn-main product-btn-main__buying">
                    <span class="product-btn-main__text product-btn-main__buying-text">Mua
                        Ngay</span>
                </button>
            </div>
            <div class="product__guarantee-container">
                <a href="*" class="product__guarantee">
                    <div class="product__guarantee-wrapper">
                        <span>
                            <i class="product__guarantee-icon fas fa-clipboard-check"></i>
                        </span>
                        <div class="product__guarantee-text">Minecraft Shop Đảm Bảo</div>
                    </div>
                    <span class="product__guarantee-note">3 Ngày Trả Hàng / Hoàn Tiền</span>
                </a>
            </div> 
            </div>
    `
    $("#product-inner").append(productHtml)
}
$(document).ready(function () {
    var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5";
    var url = new URL(url_string);
    var c = url.searchParams.get("c");
    var url = new URL(window.location.href)
    let productId = url.searchParams.get("productId");
    requestDataDetail("http://localhost:37504/api/Product/GetProductByID?proID=" + productId);
});


// Sau khi bam dang ky , dang nhap 

//dang nhap tu giao dien detail 
function requestDataUser(url) {
    $.ajax({
        url: url,
        data: null,
        cache: false,
        type: "GET",
        success: function (response) {
            if (response.success) {
                checkData(response.data)
            }
            else {
                alert(response.message)
            }
        },
        error: function (xhr) {

        }
    });
}

var checkData = function (data) {
    for (i = 0; i < data.length; i++) {
        userdata.push(data[i])
    }
}

// Thực hiện hàm đăng nhập 
function checkLogin() {
    modal2.style.display = "none";
    let valid = false;
    let usevalid
    userdata.forEach(function (item) {   
        if (emailLogin.value == item.userAccName && passwordLogin.value == item.userPass) {
            console.log(emailLogin.value)
            valid = true
            usevalid = item
        }
    })
    // Đăng nhập thành công lưu người dùng vào local
    if (valid == true) {
        if (usevalid.userStatus == -1) alert("Tài khoản này đã bị khóa!")
        else {
            console.log("da tim duoc nguoi")
            login.style.display = "none"
            user.style.display = "flex"
            username.innerText = usevalid.userName
            userIMG.src = usevalid.userLinkAvatar
            // Nếu là admin thì hiển thị giao diện admin 
            if (usevalid.isAdmin) adminEdit.style.display = "block"
            // Dùng local để lưu người đã đăng nhập
            var listnguoidung = []
            var nguoidung = {
                "id": usevalid.userID,
                "name": usevalid.userName,
                "accname": usevalid.userAccName,
                "pass": usevalid.userPass,
                "phone": usevalid.userPhone,
                "address": usevalid.userAddress,
                "src": usevalid.userLinkAvatar,
                "isAdmin": usevalid.isAdmin,
                'srcIMG':usevalid.userLinkAvatar
            }
            listnguoidung.push(nguoidung)
            localStorage.setItem("data", JSON.stringify(listnguoidung))
            location.reload()
        }
    } else alert("sai thông tin tài khoản hoặc mật khẩu")
}

// đăng ký
function Regis() {
    modal.style.display = "none";
    if (mk.value == mk2.value) {
        requestRegisAcc("http://localhost:37504/api/Users/DangKy?taikhoan=" + tk.value + "&matkhau=" + mk.value + "&hvt=" + hvt.value +
                        "&sdt=" + sdt.value + "&dc=" + dc.value)
    } else {
        alert("Mật khẩu xác nhận không khớp")
    }
}

// gửi yêu cầu đăng ký
function requestRegisAcc(url) {
    $.ajax({
        url: url,
        data: null,
        cache: false,
        type: "POST",
        success: function (response) {
            if (response.success) {
                alert("Đăng ký thành công!")
                location.reload()
            }
            else {
                alert("Đăng ký thất bại, tài khoản đã tồn tại hoặc dữ liệu điền vào không hợp lệ!")
            }
        },
        error: function (xhr) {

        }
    });
}

// chuyển đổi form đăng nhập / đăng ký
function changeToRegister() {
    modal.style.display = "block";
    modal2.style.display = "none";
}
function changeToLogin() {
    modal.style.display = "none";
    modal2.style.display = "block";
}



function giamsl() {
    if (soluongg.value > 1) {
        soluongg.value--;
    } else {
        soluongg.value = 1;
    }
}

function tangsl() {
    if (isInt(soluongg.value) && soluongg.value >= 1) {
        soluongg.value++;
    } else {
        soluongg.value = 1;
    }
}
// function requestDataOrdersByUID(url) {
//     $.ajax({
//         url: url,
//         data: null,
//         cache: false,
//         type: "GET",
//         success: function (response) {
//             if (response.success) {
//                 totalProduct.innerText = response.data.length
//             }
//             else {
//                 alert(response.message)
//             }
//         },
//         error: function (xhr) {

//         }
//     });
// }
// requestDataOrdersByUID("http://localhost:37504/api/Orders/GetListOrdersByUID?userID=" + listdata[0].id + "&loai=T%E1%BA%A5t%20C%E1%BA%A3");

// Duyen test 
//Đầu tiên nó sẽ check xem đã đăng nhập hay chưa , nếu chưa đăng nhập thì hiện form đăng nhập 
function MuaNgay(){
    if(listdata.length===0){
        openLogInOut()
    }
    else{
        console.log(soluongg.value)
        var url = new URL(window.location.href)
        let productId = url.searchParams.get("productId");
        requestDatDon("http://localhost:37504/api/Orders/DatDon?pid=" + productId + "&uid=" + listdata[0].id + "&s=" + soluongg.value)
        // requestDataOrdersByUID("http://localhost:37504/api/Orders/GetListOrdersByUID?userID=" + listdata[0].id + "&loai=T%E1%BA%A5t%20C%E1%BA%A3");
    }
}

//Nếu có người đang đăng nhập thì kiểm tra giỏ hàng 

// Hàm check người dùng đang đăng nhập đã có đơn hàng hay chưa ? 
// function checkGioHang(){
//     //Thuc hiem truy cap list data nguoi dung 
//     console.log('Ham trong check gio hang')
//     let UID=listdata[0].id
//     requestListOrderByUID("http://localhost:37504/api/Orders/GetListOrdersByUID?userID="+listdata[0].id)
// }
//Thuc hien viec check gio hang 
//Nếu số lượng đơn hàng của nguoiwf dugn lớn hơn 1 thì show giao diện khác 


function requestListOrderByUID(url){
    $.ajax({
        url: url,
        data: null,
        cache: false,
        type: "GET",
        success: function (response) {
            console.log(response)
            if (response.success) {
                console.log(response.data)
            }
            else {
                alert("Thất bại???")
            }
        },
        error: function (xhr) {
        }
    });
}




function requestDatDon(url) {
    $.ajax({
        url: url,
        data: null,
        cache: false,
        type: "POST",
        success: function (response) {
            console.log(response)
            if (response.success) {
                alert ("Thành công, xem sản phẩm vừa đặt trong 'Đơn mua hàng'!")
            }
            else {
                alert("Thất bại???")
            }
        },
        error: function (xhr) {
        }
    });
}
// Kiểm tra xem giỏ hàng đã có tồn tại đơn hàng hay chưa , nếu chưa thì hiện giao diện no-order 
//nếu có rồi thì hiện giao diện của đơn hàng 



function DoiThongTinNguoiDung() {
    modal3.style.display = "block"
    hvtm.value = listdata[0].name
    dcm.value = listdata[0].address
    sdtm.value = listdata[0].phone
}

function XacNhanDoiThongTin() {
    if (mkht.value == listdata[0].pass) {
        urlquery = "http://localhost:37504/api/Users/SuaThongTinUser?userID=" + listdata[0].id + "&userName=" + hvtm.value +
            "&userPhone=" + sdtm.value + "&userAddress=" + dcm.value;
        $.ajax({
            url: urlquery,
            data: null,
            cache: false,
            type: "PUT",
            success: function (response) {
                if (response.success) {
                    alert("Đổi thông tin tài khoản thành công, vui lòng đăng nhập lại!!!")
                    logOut()
                }
                else {
                    alert("Lỗi! Vui lòng thử lại sau!")
                }
            },
            error: function (xhr) {

            }
        });
    } else {
        alert("Mật khẩu nhập vào không chính xác!!! Hãy thử lại!")
    }
}

function DoiMatKhauNguoiDung() {
    modal4.style.display = "block"
}

function XacNhanDoiMatKhau() {
    if (passcu.value == listdata[0].pass) {
        if (passmoi1.value == passmoi2.value) {
            urlquery = "http://localhost:37504/api/Users/DoiMatKhau?userID=" + listdata[0].id + "&userPass=" + passmoi1.value;
            $.ajax({
                url: urlquery,
                data: null,
                cache: false,
                type: "PUT",
                success: function (response) {
                    if (response.success) {
                        alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại!!!")
                        logOut()
                    }
                    else {
                        alert("Định dạng mật khẩu mới sai! Chỉ dùng các ký tự a-z, A-Z, 0-9")
                    }
                },
                error: function (xhr) {

                }
            });
        } else {
            alert("Xác thực mật khẩu mới thất bại!!! Hãy thử lại!")
        }
    } else {
        alert("Mật khẩu cũ nhập vào không chính xác!!! Hãy thử lại!")
    }
}