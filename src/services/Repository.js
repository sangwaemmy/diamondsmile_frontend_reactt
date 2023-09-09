import axios from 'axios'
import React, { Component } from 'react'
import Conn from './Conn';
import Commons from './Commons';

class Repository {
    static page = (Repository.page < 1 || Repository.page == undefined) ? 1 : Repository.page;
    static size = (Repository.size < 1) ? 50 : Repository.size;
    static server = Conn.wholePath.name;
    // static url = "http://" + Repository.server + ":8089/guru/api"

    static headers = Conn.LoginToken
    static getHeaders = Conn.GetToken

    findAccountById(id) {
        return axios.get(Repository.server + "/account/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    findCategories() {
        return axios.get(Repository.server + "/")
    }
    Login(authRequest) {

        return axios.post(Conn.server.name + Conn.port.val + "authenticate", authRequest, { headers: Repository.headers }
        )
    }
    findCategoriesCount() {
        return axios.get(Repository.server + "/count/",
            {
                withCredentials: true
            }
        )
    }
    findProfile() {
        return axios.get(Repository.server + "/profile/")
    }
    findProfileById(id){
        return axios.get(Repository.server + "/profile/profile/"+id, { headers: Repository.getHeaders })

    }
    findAccount() {
        return axios.get(Repository.server + "/account/", { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    findUserAndProfileByCategory(name) {
        return axios.get(Repository.server + "/account/byPatient/"+name, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    findAccount_category() {
        return axios.get(Repository.server + "/category/", { headers: Repository.getHeaders })
            .catch(() => Commons.RedirectToLogin())
    }
    finditemsCategory() {
        return axios.get(Repository.server + "/itemsCategory", { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())
    }
    findItem_categoryById(id) {
        return axios.get(Repository.server + "/itemsCategory/itemsCategory/" + id, { headers: Repository.getHeaders })
        //.catch(() => Commons.RedirectToLogin())
    }
    findProfile() {
        return axios.get(Repository.server + "/profile", { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())
    }


    findItems(page, size) {
        let config = {
            headers: Repository.getHeaders,
            params: {
                page: page, size: size
            },

        }
        return axios.get(Repository.server + "/items", config)
            .catch((err) =>
                Commons.RedirectToLogin()
            )
    }


    allNopagination() {
        return axios.get(Repository.server + "/items/search/items/allnopagination", { headers: Repository.getHeaders })
        // .catch(() => Commons.RedirectToLogin())
    }
    findAppointment() {
        return axios.get(Repository.server + "/appointment", { headers: Repository.getHeaders })
    }
  

    findServ_group(){
        return axios.get(Repository.server + "/serv_group", { headers: Repository.getHeaders })
    }
    findCustomers(){
        return axios.get(Repository.server + "/customer", { headers: Repository.getHeaders })
                                                
    }
    findusersByCategory(name){
        return axios.get(Repository.server + "/account/byPatient/"+name, { headers: Repository.getHeaders })
                                                
    }
   

}

export default new Repository()