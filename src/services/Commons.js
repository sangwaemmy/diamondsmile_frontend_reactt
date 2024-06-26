import React, { Component } from 'react'
import axios from "axios"
import Conn from './Conn'
class Commons {
    static server = Conn.server.name + Conn.port.val
    static apiPath = Conn.basicPath.val
    RedirectToLogin() {
        localStorage.removeItem('token')
        localStorage.removeItem('catname')
        localStorage.removeItem('userid')
        localStorage.clear()
        if (localStorage.getItem('token') == '' && localStorage.getItem('catname') == '' && localStorage.getItem('userid') == '') {
            window.location.replace('/login')
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('catname')
            localStorage.removeItem('userid')
            localStorage.clear()
            window.location.replace('/login')
        }
    }


    saveAccount(usersDTO) {
        return axios.post(Conn.wholePath.name + "/account/", usersDTO, { headers: Conn.GetToken })
    }

    changePassword(user, id) {
        return axios.put(Conn.wholePath.name + "/account/changePassword/" + id, user, { headers: Conn.GetToken })
    }

    saveItemCategory(itemsCategory) {
        return axios.post(Conn.wholePath.name + "/itemsCategory/", itemsCategory, { headers: Conn.GetToken })
    }
    saveItem(mdl_items, itemsCategoryId) {
        return axios.post(Conn.wholePath.name + "/items/" + itemsCategoryId, mdl_items, { headers: Conn.GetToken })
    }
    savewhMovement(mdl_Hw_movement) {
        return axios.post(Conn.wholePath.name + "/hwmovement/", mdl_Hw_movement, { headers: Conn.GetToken })
    }

    saveDamage(mdl_sales, accountId, itemsId, reference) {
        return axios.post(Conn.wholePath.name + "/damage/" + accountId + "/" + itemsId + "/" + reference, mdl_sales, { headers: Conn.GetToken })
    }
    saveSales(mdl_sales, accountId, itemsId, reference) {
        return axios.post(Conn.wholePath.name + "/sales/" + accountId + "/" + itemsId + "/" + reference, mdl_sales, { headers: Conn.GetToken })
    }
    savePurcSalesJournal(mdl_Sale_purchase_journal) {
        return axios.post(Conn.wholePath.name + "/Sale_purchase_journal/", mdl_Sale_purchase_journal, { headers: Conn.GetToken })
    }

    saveServ_group(mdl_serv_group) {
        return axios.post(Conn.wholePath.name + "/serv_group/", mdl_serv_group, { headers: Conn.GetToken })

    }
    saveAppointment(appointmentRequestDto, service_grp_id) {
        return axios.post(Conn.wholePath.name + "/appointment/add/" + service_grp_id, appointmentRequestDto, { headers: Conn.GetToken })
    }

    // Send SMS
    sendSms(mdl_messageValues) {
        return axios.post(Conn.sms_wholePath.name + '/send', mdl_messageValues)
    }


    Item(item, id, itemsCategoryId) {
        return axios.put(Conn.wholePath.name + "/items/items/" + id + "/" + itemsCategoryId, item, { headers: Conn.GetToken })
    }
    updateItemCategory(itemCategory, itemsCategoryId) {
        return axios.put(Conn.wholePath.name + "/itemsCategory/itemsCategory/" + itemsCategoryId, itemCategory, { headers: Conn.GetToken })
    }
    updateAccount(usersDTO, id, profileId, catId) {
        return axios.put(Conn.wholePath.name + "/account/" + id + "/" + profileId + "/" + catId, usersDTO, { headers: Conn.GetToken })
    }
    updateAppointmentStatus(id, status) {
        return axios.get(Conn.wholePath.name + "/appointment/update/apptmt/" + id + "/" + status, { headers: Conn.GetToken })
    }

    getTodayAppointments(SearchByDateOnly) {
        return axios.post(Conn.wholePath.name + "/appointment/searchByDateOnly", SearchByDateOnly, { headers: Conn.GetToken })
    }
    //  + recDate
    findAppointmentByRecordedDate(SearchByDateOnly, recDate) {
        return axios.post(Conn.wholePath.name + "/appointment/ByrecordedDate/recDate/", SearchByDateOnly, { headers: Conn.GetToken })
    }
    findAppointByStatus(SearchByDateOnly, status) {
        return axios.post(Conn.wholePath.name + "/appointment/find/apptmt/customer/bystatus/" + status, SearchByDateOnly, { headers: Conn.GetToken })
    }
    updateOrder(id, user_id, product_id, Mdl_orders) {
        return axios.put(Conn.wholePath.name + '/orders/' + id + '/' + user_id + '/' + product_id,Mdl_orders, { headers: Conn.GetToken })
    }

    /* #region  Public urls */
    savePubAccount(usersDTO) {
        return axios.post(Conn.PubWholePath.name + "/account", usersDTO)
    }
    savePubOrder(sendOrder, account_id, product_id) {
        return axios.post(Conn.PubWholePath.name + '/' + account_id + '/' + product_id, sendOrder)

    }



    /* #endregion */

}

export default new Commons()
