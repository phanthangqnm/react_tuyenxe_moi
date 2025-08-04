
const html = (
    `
    <div class="container page-hd-content" style="max-width: 800px;margin: auto;">
        <div class="companyname" id="imgcompanyname" style="padding-top: 220px;width: 30px;float: left;font-size: 18px;color: red;font-weight: bold;min-height: 600px;"><img src="https://nitsoftvn.com/uploads/media/system/companyname.png" /></div>
        <div class="pagecontent" style="margin-left: 30px">
            <div class="header-left"><span id="hopdongso">Hợp Đồng Số 1</span></div>
            <div class="header-center">
                <h2 style="margin: 0px;font-size: 16px">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h2>
                <p><strong>Độc lập – Tự do – Hạnh phúc</strong></p>
                <h3 style="margin: 0px;font-size: 16px">HỢP ĐỒNG THUÊ XE DỊCH VỤ</h3>
                <p><span class="doithongtin" data-value="0" id="sohopdong" data-style="textboxlive">Số: 012025/22/TSĐH-TXNĐ</span></p>
            </div>

            <ul class="law-ref">
                <li>- Căn cứ Luật Dân sự số 33/2005/QH11 ngày 14 tháng 6 năm 2004;</li>
                <li>- Căn cứ Luật Thương mại số 36/2005/QH11 ngày 14 tháng 6 năm 2005;</li>
                <li>- Căn cứ nhu cầu và khả năng của hai bên, chúng tôi gồm có:</li>
            </ul>

            <p class="date"><span class="doithongtin" data-value="0" id="datehopdong" data-style="textboxlive">Hôm nay, ngày 18 tháng 6 năm 2025</span></p>

            <div class="content-hd" style="position: relative;font-size: 13px;min-height: 650px">
                <h4>BÊN CHO THUÊ XE (BÊN A):</h4>
                <p><strong>CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI VẬN TẢI NĂM SAO</strong></p>
                <p>Địa chỉ: 67 Trưng Nữ Vương, P. Tân Thạnh, Tp Tam Kỳ, Tỉnh Quảng Nam</p>
            
                <div style="overflow: hidden;">
                    <div style="float: left; width: 48%;">
                        <p>Điện thoại: 02353.777.666</p>
                        <p>Đại diện: Ông Phạm Viết Cầm</p>
                    </div>
                    <div style="float: right; width: 48%;">
                        <p>Mã số thuế: 4000113342</p>
                        <p>Chức vụ: <strong>Giám đốc</strong></p>
                    </div>
                </div>

                
                <h4>BÊN THUÊ XE (BÊN B):</h4>
                <span data-value="1" id="thongtinbenb" data-style="textboxlive">
                    <div style="overflow: hidden;">
                        <div style="float: left; width: 48%;">
                            <p>Họ và tên: <strong style="text-transform: uppercase"><span class="doithongtin" data-value="0" id="benb_name" data-style="textboxlive">CHỊ HƯƠNG</span></strong></p>
                            <p>Điện thoại: <span class="doithongtin" data-value="0" id="benb_phone" data-style="textboxlive">0905432258</span></p>
                        </div>
                        <div style="float: right; width: 48%;">
                            <p>Số CMND/CCCD: <span class="doithongtin" data-value="0" id="benb_cccd" data-style="textboxlive">.................................</span></p>
                            <p>Địa chỉ: <span class="doithongtin" data-value="0" id="benb_diachi" data-style="textboxlive">145 HTK</span></p>
                        </div>
                    </div>
                </span>


                <p>Bên B đồng ý thuê và ký kết hợp đồng vận chuyển hành khách với những điều khoản như sau:</p>

                <h4>ĐIỀU 1. NỘI DUNG HỢP ĐỒNG</h4>
                <p>Bên B thuê xe để vận chuyển hành khách từ các điểm đón đến các điểm trả khách như sau:</p>
                <ul style="margin: 0px 10px;padding:0px">
                    <li>- <span class="doithongtin" data-value="1" id="loaixe" data-style="textboxlive">Loại xe sử dụng là xe dịch vụ, số chổ 4 (Chưa bao gồm nhân viên lái xe) Biển số xe: 92A-204.83</span> do NVLX: <span class="doithongtin" data-value="0" id="laixe" data-style="textboxlive">Nguyễn Hoàng Hân</span> điều khiển.</li>
                    <li>- <span class="doithongtin" data-value="1" id="diemdon" data-style="textboxlive">Điểm đón: 145 HTK</span></li>
                    <li>- <span class="doithongtin" data-value="1" id="diemtra" data-style="textboxlive">Điểm trả: HV</span></li>
                    <li>Lộ trình: Từ <span class="doithongtin" data-value="1" id="tuyenxe" data-style="selectboxlive">Tam Kỳ đi Đà Nẵng</span>. Cự ly khoảng <span class="doithongtin" data-value="1" id="khoangcach" data-style="textboxlive">85Km</span>.</li>
                </ul>

                <p>Số lượng hành khách trên xe theo hợp đồng là:</p>
                <span class="doithongtin" data-value="0" id="listkhachhang"  data-style="tablecus">
                    <table class="info-table" style="width: 100%;border-collapse: collapse;margin-top: 10px;font-size:13px">
                        <thead>
                            <tr>
                                <th style="background-color: #f0f0f0;border: 1px solid #000;padding: 2px;text-align: center;">STT</th>
                                <th style="background-color: #f0f0f0;border: 1px solid #000;padding: 2px;text-align: center;">Thông tin khách</th>
                                <th style="background-color: #f0f0f0;border: 1px solid #000;padding: 2px;text-align: center;">Số điện thoại</th>
                                <th style="background-color: #f0f0f0;border: 1px solid #000;padding: 2px;text-align: center;">Điểm đón</th>
                                <th style="background-color: #f0f0f0;border: 1px solid #000;padding: 2px;text-align: center;">Điểm trả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;">1</td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;">2</td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;">3</td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;">4</td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                                <td style="border: 1px solid #000;padding: 2px;text-align: center;"></td>
                            </tr>
                        </tbody>
                    </table>
                </span>

                <h4>ĐIỀU 2. GIÁ TRỊ CỦA HỢP ĐỒNG</h4>
                <p>Tổng giá trị hợp đồng: <strong><span data-value="0" id="giatrihopdong" data-style="textboxlive">400.000</span>đ.</strong></p>
                <p>Viết bằng chữ: <strong><span id="giatrichu" data-style="textboxlive">Bốn trăm nghìn đồng</span></strong></p>
            </div>
        </div>
    </div>
    `
)

export default html
