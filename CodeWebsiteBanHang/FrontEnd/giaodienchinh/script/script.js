var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2")
var modal3 = document.getElementById("myModal3")
var modal4 = document.getElementById("myModal4")

var textTimKiem = document.getElementById("textTimKiem");

var login = document.getElementById("logInOut")
var user = document.getElementById("useraccount")
let username = document.getElementById("header__navbar-user-name")
let userIMG = document.getElementById("userIMG")
let adminManage = document.getElementById("adminManage")

// let totalProduct = document.getElementById("totalProduct");

let inputIMG = document.getElementById("input-image")
let avatarIMG = document.getElementById("avatarIMG")
var proPrice = document.getElementById("proPrice")

// Phần error của pw
let errorPW=document.querySelector('#errorPW')
let errorLogin=document.querySelector('#errorLogin')

//Đọc số lượng sản phẩm trong giỏ hàng 
console.log('So luong san pham trong gio hang ')
console.log(totalProduct.innerText==0)


//Đổi tiền 
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })
console.log(formatter.format(1000) )



// Nếu nhấn vào thay đổi thông tin account của người dùng thì hiện form thay đổi thông tin lên 
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
        errorPW.style.display="block"
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


//Load dữ liệu cho sản phẩm 
function requestData(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText)
            loadData(data)
            console.log("load ok")
        } else {
            console.log("error")
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function requestDataAjax(url) {
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

var goToPage = function (id) {
    window.location.href = "../src/detail.html?productId=" + id;
}


var loadData = function (proudcts) {
    for (var i = 0; i < proudcts.length; i++) {
        let product = proudcts[i];
        var productHtml = `
        <div onclick="goToPage('${product.proID}')" class="grid__column-2-4">
                            <!-- product-item -->
                                <a href="#" id="0" class="home-product-item">
                                    <img src=" ${product.proLinkPicture}">
                                    <div class="home-product-item__name"> ${product.proName} </div>
                                    <div class="home-product-item__price">
                                        <span class="home-product-item__price-old">${formatter.format(product.proOldPrice)}</span>
                                        <span class="home-product-item__price-current">${formatter.format(product.proPrice)}</span>
                                    </div>
                                    <div class="home-product-item__action">
                                        <div class="home-product-item__rating">
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <span class="home-product-item__sold"> ${product.proNOS} đã bán </span>
                                    </div>
                                    <div class="product-favourite">
                                        <i class="fas fa-check"></i>
                                        <span> Yêu thích </span>
                                    </div>
                                    <div class="product-sale-off">
                                        <span class="product-sale-off__percent"> ${Math.floor((product.proOldPrice - product.proPrice) / product.proOldPrice * 100)}% </span>
                                        <span class="product-sale-off__label"> GIẢM </span>
                                    </div>
                                </a>
                        </div>
    `
        $("#product-list-row").append(productHtml)
    }
}
$(document).ready(function () {
    console.log("ready!");
    localStorage.setItem("cate", 0)
    requestDataAjax("http://localhost:37504/api/Product");
    //requestDataUser("http://localhost:37504/api/Users/LayListUser");
});


// When the user clicks the button, open the modal 

// When the user clicks on <span> (x), close the modal
function openRegister() {
    modal.style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    // Phải thực hiện việc xóa những dữ liệu trong form
    
    if (event.target == modal || event.target == modal2 || event.target == modal3 || event.target == modal4) {
        modal.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
        modal4.style.display = "none";
        hvt.value=''
        sdt.value=''
        dc.value=''
        mk.value=''
        tk.value=''
        mk2.value=''
        emailLogin.value=''
        passwordLogin.value=''
        errorNameRegis.classList.remove("notValidData");
        errorNumberRegis.classList.remove('notValidData')
        errorAddressRegis.classList.remove('notValidData')
        errorAccoutRegis.classList.remove('notValidData')
        errorPWRegis.classList.remove('notValidData')
        errorcheckPW.classList.remove('notValidData')

    }
}

//Đăng nhập
function openLogInOut() {
    requestDataUser("http://localhost:37504/api/Users/LayListUser");
    modal2.style.display = "block";
}
// chuyển đổi form đăng nhập / đăng ký
function changeToLogin() {
    modal.style.display = "none";
    modal2.style.display = "block";
}
function changeToRegister() {
    modal.style.display = "block";
    modal2.style.display = "none";
}
// Thực hiện chức năng xem xét dữ liệu sau khi đăng nhập
var userdata = []
function requestDataUser(url) {
    $.ajax({
        url: url,
        data: null,
        cache: false,
        type: "GET",
        success: function (response) {
            if (response.success) {
                console.log(response.data)
                checkData(response.data)
            }
            else {
                alert(response.message)
            }
        },
        error: function (xhr) {
            console.log(xhr)
        }
    });
}

var checkData = function (data) {
    console.log('thuc hien ham checkData')
    for (i = 0; i < data.length; i++) {
        userdata.push(data[i])
    }
}

//Ban đầu không có người đăng nhập

// Thực hiện hàm đăng nhập 
function checkLogin() {
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
            //if (usevalid.isAdmin) adminEdit.style.display = "block"
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
            modal2.style.display = "none";
            errorLogin.style.display="none"
            location.reload()
        }
    } else errorLogin.style.display="block"
}
// Khi bấm nút trở lại thì phải xóa hết dữ liệu trong form 


function sortDefault() {
    $("#product-list-row").empty();
    requestDataAjax("http://localhost:37504/api/Product");
    console.log("sort mới nhất")
}
function sortBanChay() {
    $("#product-list-row").empty();
    requestDataAjax("http://localhost:37504/api/Product/GetSort3ListProductByIDCat?catID=" + localStorage.cate);
    console.log("sort bán chạy")
}

function sortThapdenCao() {
    $("#product-list-row").empty();
    requestDataAjax("http://localhost:37504/api/Product/GetSort1ListProductByIDCat?catID=" + localStorage.cate);
    console.log("sort thấp đến cao")
}

function sortCaoDenThap() {
    $("#product-list-row").empty();
    requestDataAjax("http://localhost:37504/api/Product/GetSort2ListProductByIDCat?catID=" + localStorage.cate);
    console.log("sort cao đến thấp")
}

// Thực hiện hàm logOut sau khi người dùng đăng xuất thì local Storage sẽ xóa dữ liệu của người dùng 
function logOut() {
    localStorage.removeItem("data");
    location.reload()
}
//neu trong local co du lieu thi hien 

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

console.log("gio se check xem co ai dang nhap chua ")
let listdata = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
console.log("so luong localstorage  " + listdata.length)
if (listdata.length == 1) {
    username.innerText = listdata[0].name
    userIMG.src = listdata[0].src
    useraccount.style.display = "flex"
    logInOut.style.display = "none"
    if (listdata[0].isAdmin) adminManage.style.display = "block"
}
console.log(listdata[0])

//neu co du lieu trong local thi hien nguoi dung khong thi hien dang ky


//Cần một biến isError để kiểm tra việc nhập dữ liệu đã hợp lệ chưa, 
//ban đầu gắn bằng true nghĩa là dữ liệu đã không hợp lệ , sau đó check dữ liệu đã nhập hay chưa 
//Nếu chưa nhập thì add class not Valid Data (show ra màn hình), nếu không thì ẩn đi

function Regis() {
    console.log('-----------------------------------------')
    console.log('Thuc hien ham nay')
    console.log('Truoc khi thu')
    let isError=true;
    console.log(isError)
    if(hvt.value==='') {
        errorNameRegis.classList.add("notValidData");
        isError = true
    }
    else{
        errorNameRegis.classList.remove("notValidData");
        isError=false
    }
    if(sdt.value==='') {
        errorNumberRegis.classList.add("notValidData"); 
        isError = true
    }
    else{
        errorNumberRegis.classList.remove("notValidData");
        isError=false
    }
    if(dc.value==='') {
        errorAddressRegis.classList.add("notValidData");
        isError = true
    }
    else{
        errorAddressRegis.classList.remove("notValidData");
        isError=false
    }
    if(tk.value==='') {
        errorAccoutRegis.classList.add("notValidData");
        isError = true
    }
    else{
        errorAccoutRegis.classList.remove("notValidData");
        isError=false
    }
    if(mk.value==='') {
        errorPWRegis.classList.add("notValidData");
        isError = true
    }
    else{
        errorPWRegis.classList.remove("notValidData");
        isError=false
    }
    if(mk.value!==mk2.value){
        errorcheckPW.classList.add("notValidData");
        isError = true
    }
    else{
        errorcheckPW.classList.remove("notValidData");  
        check=false
    }
    console.log('Sau khi thu ')
    console.log(isError)
    if (isError===false) {
        requestRegisAcc("http://localhost:37504/api/Users/DangKy?taikhoan=" + tk.value + "&matkhau=" + mk.value + "&hvt=" + hvt.value +
            "&sdt=" + sdt.value + "&dc=" + dc.value)
        // modal.style.display = "none";
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
                alert("Tên đăng nhập đã tồn tại")
                errorcheckPW.innerText='Tên đăng nhập đã tồn tại'
                errorcheckPW.style.display="block"

            }
        },
        error: function (xhr) {

        }
    });
}
// requestDataOrdersByUID("http://localhost:37504/api/Orders/GetListOrdersByUID?userID=" + listdata[0].id + "&loai=T%E1%BA%A5t%20C%E1%BA%A3");
function cate0() {
    localStorage.cate = 0;
    $("#product-list-row").empty();
    requestDataAjax("http://localhost:37504/api/Product");
}

function cate1() {
    localStorage.cate = 1;
    $("#product-list-row").empty();
    requestDataAjax("http://localhost:37504/api/Product/GetListProductByIDCat?catID=1");
}

function cate2() {
    localStorage.cate = 2;
    $("#product-list-row").empty();
    requestDataAjax("http://localhost:37504/api/Product/GetListProductByIDCat?catID=2");
}

function cate3() {
    localStorage.cate = 3;
    $("#product-list-row").empty();
    requestDataAjax("http://localhost:37504/api/Product/GetListProductByIDCat?catID=3");
}

function cate4() {
    localStorage.cate = 4;
    $("#product-list-row").empty();
    requestDataAjax("http://localhost:37504/api/Product/GetListProductByIDCat?catID=4");
}


function TimKiemSanPham(){
    console.log(textTimKiem.value)
    if(textTimKiem.value.replace(/\s+/g,' ').trim().length == 0) cate0()
    else {
        localStorage.cate = 0;
        $("#product-list-row").empty();
        requestDataAjax("http://localhost:37504/api/Product/GetListSearch?s=" + textTimKiem.value.replace(/\s+/g,' ').trim());
    }
}