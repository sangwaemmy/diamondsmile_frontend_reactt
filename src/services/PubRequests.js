import React  from "react"
import Conn from "./Conn"
import axios from "axios"
import Commons from "./Commons"
import Repository from "./Repository"
class  PubRequests{

    static basePubPath=Conn.wholePath.name+'pub'
    //post requests
   
    appointment(formData){
        return axios.post(Repository.server +"/images/img",formData,{ headers: Repository.getHeaders })
    }




    //Get requests
    serviceGroup(){
        return axios.get(PubRequests.basePubPath + "/appointment/serv_Group") //.catch(() => Commons.RedirectToLogin())

    }
    customers(){
        return axios.get(PubRequests.basePubPath + "/appointment/customer") //.catch(() =>Commons.RedirectToLogin())
    }
    doctors(name){
        return axios.get(PubRequests.basePubPath + "/appointment/byPatient/" + name)
    }  
    saveAppointment(mdl_appointment, service_groupd_id, mdl_messageValues) {
        axios.post( Conn.sms_wholePath.name +"/",mdl_messageValues)
        return axios.post(PubRequests.basePubPath+ "/appointment/add/" + service_groupd_id, mdl_appointment)
        
    }
}
export default new PubRequests()