import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
import SessionTime from '../../services/SessionTime'
import axios from 'axios'
import Commons from '../../services/Commons'
import Repository from "../../services/Repository"
import VertNavBar from '../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'



import PrintCompanyInfo from '../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../Global/Loader';
import TableHead from '../Global/TableHead'
import SearchBox from '../Global/SearchBox'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import SideBar from '../Navbar/SideBar'
import Dashboard from './Dashboard'
import About from './About'

import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwb, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow } from '../Global/Forms/InputRow'
import FormTools from '../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../Global/ListTable'
import Utils from '../Global/Utils'
import Delete from '../../services/Delete'
import { colors } from '@mui/material'

function Hwmovement() {

  const [userType, setUserType] = useState()
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [Id_id, setId_id] = useState()
  const [date_time, setDate_time] = useState()
  const [items, setItems] = useState()
  const [in_out, setIn_out] = useState()
  const [remaining, setRemaining] = useState()
  const [account, setAccount] = useState()
  const [current_qty, setCurrent_qty] = useState()

  //the below are for the purchases
  
  const [purchased_qty, setPurchased_qty] = useState()
  const [supplier, setSupplier] = useState(1)


  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [hwmovements, setHwmovement] = useState([]) //Data List
  const [purchasess, setPurchasess] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var tbl_Hw_movement = {
      id: id, date_time: date_time, items: items, in_out: in_out, remaining: remaining, account: localStorage.getItem('userid'), current_qty: current_qty
    }
    if (id) {
      Commons.updateUnit(tbl_Hw_movement, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveHw_movement(tbl_Hw_movement).then((res) => {
        console.log(res.data)
        if (res.data != null) {
          resetAfterSave()
        }
      }).catch((error) => {
        console.log('-----------')
        alert('Error Occured')
      })
    }
  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllHw_movements = () => {
    Repository.findHw_movement().then((res) => {
      setHwmovement(res.data);
      setDataLoad(true)
    });
  }
  const getAllPurchasess = () => {
    Repository.findPurchases().then((res) => {
      setPurchasess(res.data);
      setDataLoad(true)
    });
  }
  useEffect(() => {
    getAllHw_movements()
    getAllPurchasess()

     //Get Token and catname
     
     setUserType(localStorage.getItem('catname'))
  }, []);
  const getPurchasesById = (id) => {
    Repository.findPurchasesById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.id)
      setItems(res.data.id)
      setAccount(res.data.id)
      setPurchased_qty(res.data.id)
      setSupplier(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }

  const getHw_movementById = (id) => {
    Repository.findHw_movementById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.id)
      setItems(res.data.id)
      setIn_out(res.data.id)
      setRemaining(res.data.id)
      setAccount(res.data.id)
      setCurrent_qty(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delPurchasesById = (id) => {
    Utils.Submit(() => {
      Delete.deletePurchasesById(id, () => { getAllPurchasess() })
    }, () => { })
  }
  const delHw_movementById = (id) => {
    Utils.Submit(() => {
      Delete.deleteHw_movementById(id, () => { getAllHw_movements() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllHw_movements()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setItems("")
    setIn_out("")
    setRemaining("")
    setAccount("")
    setCurrent_qty("")
  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setItems("")
    setIn_out("")
    setRemaining("")
    setAccount("")
    setCurrent_qty("")
    setClearBtn(false)
  }
  /*#endregion Listing data*/


  /*#region Printing */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /*#endregion Listing data*/

  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form='  Movements' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Items' val={items} handle={(e) => setItems(e.target.value)} label='lblitems' />
            <InputRow name='In_out' val={in_out} handle={(e) => setIn_out(e.target.value)} label='lblin_out' />
            <InputRow name='Remaining' val={remaining} handle={(e) => setRemaining(e.target.value)} label='lblremaining' />
            <InputRow name='Current_qty' val={current_qty} handle={(e) => setCurrent_qty(e.target.value)} label='lblcurrent_qty' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />

          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Movements List' height={height} entity='Warehouse Movements' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
              <TableHead>
                <td>id</td>
                <td>date time</td>
                <td>purchased qty</td>
                <td>Unit cost</td>
                <td>User</td>
                
                <td className='delButton'>Option</td>
              </TableHead>
              <tbody>
                {purchasess.map((purchases) => (
                  <tr key={purchases.id}>
                    <td>{purchases.id}   </td>
                    <td>{purchases.date_time}   </td>
                    <td>{purchases.purchased_qty}   </td>
                    <td>{purchases.unit_cost}   </td>
                    <td>{purchases.account}   </td>
                    
                    <ListOptioncol getEntityById={() => getPurchasesById(purchases.id)} delEntityById={() => delPurchasesById(purchases.id)} />
                  </tr>
                ))}</tbody>
            </TableOpen>



          <TableOpen>
            <TableHead>

              <td>id</td>
              <td>date_time</td>
              <td>item</td>
              <td>Action</td>
              <td>current_qty</td>
              <td>Difference</td>
              <td>remaining</td>
              <td>account</td>
              <td className='delButton'>Option</td>
            </TableHead>
            <tbody>
              {hwmovements.map((Hw_movement) => {

                const prev = Hw_movement.current_qty
                const later = Hw_movement.remaining
                const pchased_sold = Hw_movement.in_out === 'in' ? 'Purchased' : 'Sold'
                const diff = pchased_sold == 'Purchased' ? later - prev : prev - later

                return (
                  <tr key={Hw_movement.id}>
                    <td>{Hw_movement.id}   </td>
                    <td>{Hw_movement.date_time}   </td>
                    <td>{Hw_movement.mdl_items.name}   </td>
                    <td>{Hw_movement.in_out === 'in' ? 'Purchase' : 'Sale'}   </td>
                    <td>{Hw_movement.current_qty}   </td>
                    <td>{pchased_sold}  <span style={{color: 'blue'}}> {diff} </span></td>
                    <td>{Hw_movement.remaining}   </td>
                    <td>{Hw_movement.account}   </td>
                    <ListOptioncol getEntityById={() => getHw_movementById(Hw_movement.id)} delEntityById={() => delHw_movementById(Hw_movement.id)} />
                  </tr>
                )
              })}</tbody>
          </TableOpen>
        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />
      }

    </PagesWapper>


  )
}

export default Hwmovement
