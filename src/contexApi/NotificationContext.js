import React, { useState, useEffect } from "react";
import { getAllNotificaltion } from "../components/services/ProjectService"

// tao gia tri mac dinh cho con text tao gia tri khoi tao  the nao cung duoc vi du :null
const NotificationContext = React.createContext(null);


const NotificationProvider = ({ children }) => {

    const [list, setList] = useState([])
    const [listStaff, seListStaff] = useState([])
    const [listAdmin, seListAdmin] = useState([])


    const getALlListNotification = async (shippingUnit_Id, phone, position, name) => {
        console.log("shippingUnit_Id, phone, position", shippingUnit_Id, phone, position)
        if (!shippingUnit_Id) {

            let res = await getAllNotificaltion(shippingUnit_Id, phone)
            if (res && +res.EC === 0) {

                let data = res.DT.filter(item => item.CreatedBy === phone && item.Change_content !== "thêm mới" && item.Change_content !== "người tạo vừa chat" &&
                    item.Change_content !== "huỷ đơn gấp" && item.Change_content !== "đơn gấp" && item.Change_content !== "thay đổi địa chỉ người bán" &&
                    item.Change_content !== "thay đổi thông tin đơn hàng" && item.Change_content !== "thay đổi địa chỉ người nhận")
                setList(data)
            }
        }
        if (shippingUnit_Id) {
            let res = await getAllNotificaltion(shippingUnit_Id, phone)
            if (res && +res.EC === 0) {
                if (position === "Nhân viên lấy hàng") {
                    let data = res.DT.filter(item => +item.Unit === +shippingUnit_Id)
                    let dataOne = data.filter(item => item.Change_content !== "thay đổi thông tin đơn hàng" && item.Change_content !== "thay đổi địa chỉ người nhận" &&
                        item.Change_content !== "đơn hàng trì hoãn nhập kho" && item.Change_content !== "đơn hàng đã xuất kho" && item.Change_content !== "đơn hàng đã nhập kho"
                        && item.Change_content !== "đơn hàng đang giao" && item.Change_content !== "đơn hàng trì hoãn giao" && item.Change_content !== "đơn hàng giao xong" && item.Change_content !== "đơn hàng hủy giao" && item.Change_content !== "đơn hàng giao lại" &&
                        item.Change_content !== "đơn hàng đang đối soát" && item.Change_content !== "đơn hàng đối soát xong bằng chuyển khoản" &&
                        item.Change_content !== "đơn hàng đối soát xong bằng tiền mặt" && item.Change_content !== "nhân viên vừa chat" &&
                        item.Change_content !== "nhân viên chuyển trạng tái sang bình thường" && item.Change_content !== "nhân viên chuyển trạng tái sang gấp"

                    )
                    seListStaff(dataOne)
                }
                if (position === "Nhân viên kho hàng") {
                    let data = res.DT.filter(item => +item.Unit === +shippingUnit_Id)
                    let dataOne = data.filter(item => item.Change_content !== "thay đổi thông tin đơn hàng" && item.Change_content !== "thay đổi địa chỉ người nhận" && item.Change_content !== "thay đổi địa chỉ người bán" && item.Change_content !== "nhân viên vừa chat" && item.Change_content !== "người tạo vừa chat" && item.Change_content !== "thêm mới"
                        && item.Change_content !== "đơn hàng đang giao" && item.Change_content !== "đơn hàng trì hoãn giao" && item.Change_content !== "đơn hàng giao xong" && item.Change_content !== "đơn hàng hủy giao" && item.Change_content !== "đơn hàng giao lại" &&
                        item.Change_content !== "đơn hàng đang đối soát" && item.Change_content !== "đơn hàng đối soát xong bằng chuyển khoản" && item.Change_content !== "đơn hàng đối soát xong bằng tiền mặt"
                        && item.Change_content !== "đơn hàng đang lấy hàng" && item.Change_content !== "nhân viên chuyển trạng tái sang bình thường" && item.Change_content !== "nhân viên chuyển trạng tái sang gấp"


                    )
                    seListStaff(dataOne)
                }
                if (position === "Nhân viên giao hàng") {
                    let data = res.DT.filter(item => +item.Unit === +shippingUnit_Id)
                    console.log("data-56", data)
                    let dataOne = data.filter(item => item.Change_content !== "thay đổi thông tin đơn hàng" && item.Change_content !== "nhân viên vừa chat" && item.Change_content !== "thay đổi địa chỉ người bán" && item.Change_content !== "thêm mới"
                        && item.Change_content !== "đơn hàng đang lấy hàng" && item.Change_content !== "đơn hàng trì hoãn" && item.Change_content !== "đơn hàng đã lấy thành công" &&
                        item.Change_content !== "đơn hàng trì hoãn nhập kho" && item.Change_content !== "đơn hàng đã nhập kho"
                        && item.Change_content !== "đơn hàng đang đối soát" && item.Change_content !== "đơn hàng đối soát xong bằng chuyển khoản" && item.Change_content !== "đơn hàng đối soát xong bằng tiền mặt"
                        && item.Change_content !== "nhân viên chuyển trạng tái sang bình thường" && item.Change_content !== "nhân viên chuyển trạng tái sang gấp"


                    )
                    seListStaff(dataOne)
                }
                if (position === "Nhân viên kế toán") {
                    let data = res.DT.filter(item => +item.Unit === +shippingUnit_Id)
                    let dataOne = data.filter(item => item.Change_content !== "nhân viên vừa chat"
                        && item.Change_content !== "đơn hàng đang lấy hàng" && item.Change_content !== "đơn hàng trì hoãn" && item.Change_content !== "đơn hàng đã lấy thành công" && item.Change_content !== "thêm mới" &&
                        item.Change_content !== "thay đổi địa chỉ người bán" && item.Change_content !== "thay đổi địa chỉ người nhận" && item.Change_content !== "huỷ đơn gấp" && item.Change_content !== "đơn gấp" &&
                        item.Change_content !== "đơn hàng trì hoãn nhập kho" && item.Change_content !== "đơn hàng đã nhập kho" && item.Change_content !== "đơn hàng đã xuất kho"
                        && item.Change_content !== "đơn hàng đang giao" && item.Change_content !== "đơn hàng trì hoãn giao" && item.Change_content !== "đơn hàng hủy giao" && item.Change_content !== "đơn hàng giao lại"
                        && item.Change_content !== "nhân viên chuyển trạng tái sang bình thường" && item.Change_content !== "nhân viên chuyển trạng tái sang gấp"

                    )
                    seListStaff(dataOne)
                }

            }

        }
        if (shippingUnit_Id === 0 && phone === "Dev") {

            let res = await getAllNotificaltion(0, "Dev")

            if (res && +res.EC === 0) {
                seListAdmin(res.DT)
            }
        }
    }




    return (
        <NotificationContext.Provider value={{ list, getALlListNotification, listStaff, listAdmin }}>
            {children}
        </NotificationContext.Provider>
    );
}


export { NotificationProvider, NotificationContext }