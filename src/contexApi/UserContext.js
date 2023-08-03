import React, { useState, useEffect } from "react";
import { GetUserAccount } from "../components/services/userService"
// tao gia tri mac dinh cho con text tao gia tri khoi tao  the nao cung duoc vi du :null
import { Suspense } from 'react';

const UserContext = React.createContext(null);


const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }
    const [user, setUser] = useState(userDefault);

    // Login updates the user data with a name parameter
    const login = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser({ ...userDefault, isLoading: false });
    }




    const fetchUser = async () => {
        // khi chay ham getaccount thanh cong thi bien user duoc cap nhat thi chay vao day moi di tiep duoc
        let res = await GetUserAccount();
        if (res && res.EC === 0) {
            console.log("res.DT-35", res.DT)
            let groupWithRound = res.DT.groupWithRole;
            let email = res.DT.email;
            let usersname = res.DT.usersname;
            let phone = res.DT.phone;
            let Position = res.DT.Position;
            let shippingunit_id = res.DT.shippingunit_id;
            let nameUnit = res.DT.nameUnit;
            let groupName = res.DT.groupName;

            let data = {
                isAuthenticated: true,
                token: res.DT.access_token,
                account: { groupWithRound, email, usersname, phone, Position, shippingunit_id, nameUnit, groupName },
                isLoading: false
            }
            setUser(data)

        } else {
            // khong get duoc ham getaccount thanh cong thi chay vao day
            setUser({ ...userDefault, isLoading: false })
        }


    }

    useEffect(() => {
        // if (window.location.pathname !== "/" && window.location.pathname !== "/login") {
        //     fetchUser()

        // }
        // else {
        //     setUser({ ...user, isLoading: false })
        //     // setUser bang cai user de khong mat nguoi dung hien tai
        // }


        fetchUser()
    }, [])



    return (
        <Suspense fallback={<div>Loading... </div>}>

            <UserContext.Provider value={{ user, login, logout, fetchUser }}>
                {children}
            </UserContext.Provider>
        </Suspense>

    );

}


export { UserProvider, UserContext }