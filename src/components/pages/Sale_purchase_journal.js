import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
import SessionTime from '../../services/SessionTime'
import axios from 'axios'
import Commons from '../../services/Commons'
import Repository from "../../services/Repository"
import VertNavBar from '../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'

import UpdatedComponent from '../Global/HOCForm'
import { Link, Route, Routes, useParams } from 'react-router-dom';

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

function Sale_purchase_journal() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [Id_id, setId_id] = useState()
  const [date_time, setDate_time] = useState()
  const [items, setItems] = useState()
  const [sold_purch_qty, setSold_purch_qty] = useState()
  const [sale_unit_cost, setSale_unit_cost] = useState()
  const [remaining_qty, setRemaining_qty] = useState()
  const [total_paid, setTotal_paid] = useState()
  const [account, setAccount] = useState()
  const [current_qty, setCurrent_qty] = useState()
  const [qty_sold_purchase, setQty_sold_purchase] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [Sale_purchase_journals, setSale_purchase_journals] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);

  const [userType, setUserType] = useState()
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var tbl_Sale_purchase_journal = {
      id: id, date_time: date_time, items: items, sold_purch_qty: sold_purch_qty, sale_unit_cost: sale_unit_cost, remaining_qty: remaining_qty, total_paid: total_paid, account: localStorage.getItem('userid'), current_qty: current_qty, qty_sold_purchase: qty_sold_purchase
    }
    if (id) {
      Commons.updateUnit(tbl_Sale_purchase_journal, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveSale_purchase_journal(tbl_Sale_purchase_journal).then((res) => {
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
  const getAllSale_purchase_journals = () => {
    Repository.findSale_purchase_journal().then((res) => {
      setSale_purchase_journals(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    getAllSale_purchase_journals()


     //Get Token and catname
     
     setUserType(localStorage.getItem('catname'))
  }, []);


  const getSale_purchase_journalById = (id) => {
    Repository.findSale_purchase_journalById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.id)
      setItems(res.data.id)
      setSold_purch_qty(res.data.id)
      setSale_unit_cost(res.data.id)
      setRemaining_qty(res.data.id)
      setTotal_paid(res.data.id)
      setAccount(res.data.id)
      setCurrent_qty(res.data.id)
      setQty_sold_purchase(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delSale_purchase_journalById = (id) => {
    Utils.Submit(() => {
      Delete.deleteSale_purchase_journalById(id, () => { getAllSale_purchase_journals() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllSale_purchase_journals()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setItems("")
    setSold_purch_qty("")
    setSale_unit_cost("")
    setRemaining_qty("")
    setTotal_paid("")
    setAccount("")
    setCurrent_qty("")
    setQty_sold_purchase("")
  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setItems("")
    setSold_purch_qty("")
    setSale_unit_cost("")
    setRemaining_qty("")
    setTotal_paid("")
    setAccount("")
    setCurrent_qty("")
    setQty_sold_purchase("")
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
        <ContainerRowBtwn clearBtn={clearBtn} form='Sales Purchase movements' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            
            <InputRow name='Items' val={items} handle={(e) => setItems(e.target.value)} label='lblitems' />
            <InputRow name='Sold_purch_qty' val={sold_purch_qty} handle={(e) => setSold_purch_qty(e.target.value)} label='lblsold_purch_qty' />
            <InputRow name='Sale_unit_cost' val={sale_unit_cost} handle={(e) => setSale_unit_cost(e.target.value)} label='lblsale_unit_cost' />
            <InputRow name='Remaining_qty' val={remaining_qty} handle={(e) => setRemaining_qty(e.target.value)} label='lblremaining_qty' />
            <InputRow name='Total_paid' val={total_paid} handle={(e) => setTotal_paid(e.target.value)} label='lbltotal_paid' />
            
            <InputRow name='Current_qty' val={current_qty} handle={(e) => setCurrent_qty(e.target.value)} label='lblcurrent_qty' />
            <InputRow name='Qty_sold_purchase' val={qty_sold_purchase} handle={(e) => setQty_sold_purchase(e.target.value)} label='lblqty_sold_purchase' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
            
          </FormInnerRightPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Sales Purchase List' height={height} entity='Sales Purchase' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              
              <td>id</td>
              <td>date_time</td>
              <td>items</td>
              <td>sold_purch_qty</td>
              <td>sale_unit_cost</td>
              <td>remaining_qty</td>
              <td>total_paid</td>
              <td>account</td>
              <td>current_qty</td>
              <td>qty_sold_purchase</td>
              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {Sale_purchase_journals.map((Sale_purchase_journal) => (
                <tr key={Sale_purchase_journal.id}>
                  <td>{Sale_purchase_journal.id}   </td>
                  <td>{Sale_purchase_journal.date_time}   </td>
                  <td>{Sale_purchase_journal.items}   </td>
                  <td>{Sale_purchase_journal.sold_purch_qty}   </td>
                  <td>{Sale_purchase_journal.sale_unit_cost}   </td>
                  <td>{Sale_purchase_journal.remaining_qty}   </td>
                  <td>{Sale_purchase_journal.total_paid}   </td>
                  <td>{Sale_purchase_journal.account}   </td>
                  <td>{Sale_purchase_journal.current_qty}   </td>
                  <td>{Sale_purchase_journal.qty_sold_purchase}   </td>
                  {userType == 'admin' &&  <ListOptioncol getEntityById={() => getSale_purchase_journalById(Sale_purchase_journal.id)} delEntityById={() => delSale_purchase_journalById(Sale_purchase_journal.id)} />}
                </tr>
              ))}</tbody>
          </TableOpen>
        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />
      }

    </PagesWapper>


  )
}

export default Sale_purchase_journal
