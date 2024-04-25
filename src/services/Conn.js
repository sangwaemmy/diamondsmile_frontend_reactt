
export default class Conn {
    static server = {
        name: '//localhost:'
        // name:    '//guruservices.codeguru-pro.com:'
        // name: '//appointment.thediamondsmile.rw:'
    };
    static port = {
        val: '8081/'   /*The tes*/
        // val: '8096/'
    }
    static basicPath = {
        val: 'appointment/api'
    }
    static accountAll = {
        val: Conn.server.name + Conn.port.val + Conn.basicPath.val + "/account"
    }
    static PubWholePath = {
        name: Conn.server.name + Conn.port.val + 'pub/appointment'  /*  http://localhost:8081/pub/appointment  */
    }
    
    static wholePath = {
        name: Conn.server.name + Conn.port.val + Conn.basicPath.val  /*  http://localhost:8081/appointment/api  */
    }

    static callBackWeb = {
        url: (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) ?
            Conn.server.name : 'file:///C:/Apache/webapps/DiamondSmileHtml/public_html/index.html'
    }

    static ReqContentType = 'application/json'
    static LoginToken = {
        'Content-Type': Conn.ReqContentType,
        'Authorization': 'Bearer '
    }
    static GetToken = {
        'Content-Type': Conn.ReqContentType,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    // sms address

    /* #region  -----------------------------------SMS ENDPOINTS CONFs */
    static sms_server = {
        name: '//thediamondsmile.rw:'
        // name: 'http://localhost:'
    };
    static sms_port = {
        val: '8096/'
    }
    static sms_basicPath = {
        val: 'guru/smssender'
    }
    static sms_wholePath = {
        name: Conn.sms_server.name + Conn.sms_port.val + Conn.sms_basicPath.val  /* http://megisha.com:8095/guru/smssender  */
    }
    /* #endregion */

    
    static orders = {
        name: Conn.wholePath.name + "/orders"
    }
    static account = {
        name: Conn.wholePath.name + '/account'
    }
    static image = {
        name: Conn.wholePath.name + "/images"
    }
    static nonAuthenticated = {
        name: Conn.server.name + Conn.port.val+"/pub/appointment"
    }
}
