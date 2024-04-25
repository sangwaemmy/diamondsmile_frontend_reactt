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
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwb, ContainerRowBtwn, ContainerRowHalf, FormFillPane, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputAndSearch, LoadSub } from '../Global/Forms/InputRow'
import FormTools from '../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../Global/ListTable'
import Utils from '../Global/Utils'
import Delete from '../../services/Delete'
import { LocalTableHead, TableRows } from '../Global/commonForPages/TableCommons'


function Return() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [Id_id, setId_id] = useState()
  const [date_time, setDate_time] = useState()
  const [items, setItems] = useState()
  const [sale_unit_cost, setSale_unit_cost] = useState(0)
  const [account, setAccount] = useState(1)
  const [customer, setCustomer] = useState(0)
  const [amount_paid, setAmount_paid] = useState(0)
  const [expected_amount, setExpected_amount] = useState(0)



  //the warehouse movements fields
  const [in_out, setIn_out] = useState()
  const [remaining, setRemaining] = useState()

  const [current_qty, setCurrent_qty] = useState()
  /*#endregion Listing data*/


  /*#region ---------- SEARCH FIELDS--------------------------------------*/
  const [searchedItemChosen, setSearchedItemChosen] = useState(false)// this is to show the two fields that are initially hiden(false), on the selection they appear again
  const [completedSearch, setCompletedSearch] = useState(false)//  
  const [searchItemValue, setSearchItemValue] = useState('')

  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
  const [secondTableitemssbyname, setSecondTableitemssbyname] = useState([]) //Data List searched by name
  const [completeitemName, setCompleteitemName] = useState() //This is the chosen name of item selected from the list from the backend on the result table
  const [resultTableVisible, setResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button
  const [secondResultTableVisible, setSecondResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button
  const [itemsId, setItemsId] = useState()

  /*#endregion SEARCH FIELDS*/


  /*#region ---------- OTHER FIELDS DECLARATIONS ---------------------------*/
  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [saless, setSaless] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [itemss, setItemss] = useState([]) //Data List in combo box
  const [profiles, setProfiles] = useState([]) //Data List

  const [sold_qty, setSold_qty] = useState(0)
  const [hwmovements, setHwmovement] = useState([]) //Data List
  const [searchProgress, setSearchProgress] = useState(false)//more as units when clicked the 'deploy' button
  const [carrier, setCarrier] = useState(1);
  const [name, setName] = useState()
  const [clickedSearch, setClickedSearch] = useState(false)

  const [userType, setUserType] = useState()
  const [username, setUsername] = useState()
  const [reference, setReference] = useState()
  /*#endregion Listing data*/

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_purchases = {
      id: id, date_time: date_time, itemsId: itemsId, account: localStorage.getItem('userid'), purchased_qty: sold_qty, 
      supplier: 1
    }
    if (id) {
      Commons.updateUnit(mdl_purchases, id).then((res) => {
        resetAfterSave()
      })
    } else {
      //                                   {accountId}/                   {itemsId}/{carrier}/{reference}
      Commons.saveReturn(mdl_purchases, localStorage.getItem('userid'), itemsId, carrier, reference).then((res) => {
        console.log(res.data)
        if (res.data != null) {
          resetAfterSave()
        }
      }).catch((error) => {
        console.log('-----------')
        alert('Error Occured: ' + error)
      })
    }
  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/

  const getAllSaless = () => {
    Repository.findSales().then((res) => {
      setSaless(res.data);
      setDataLoad(true)
    });
  }
  const getAllHw_movements = () => {
    Repository.findWhmByType('return').then((res) => {
      setHwmovement(res.data);
      setDataLoad(true)
    });
  }
  const getAllProfiles = () => {
    Repository.findProfile().then((res) => {
      setProfiles(res.data);
      setDataLoad(true)
    });
  }
  const getAllItemss = () => {
    Repository.findItems().then((res) => {
      setItemss(res.data.itemss);
      setDataLoad(true)
    });
  }
  useEffect(() => {
    // getAllSaless()
    getAllItemss()
    getAllProfiles()
    getAllHw_movements()


    setUsername(localStorage.getItem('token'))
    setUserType(localStorage.getItem('catname'))

    //Get Token and catname

    setUserType(localStorage.getItem('catname'))
  }, []);


  const saleSwitchToDamage = () => {
    return (userType == 'store keeper' || userType == 'admin') ? 'Return' : 'sale'
  }
  const getSalesById = (id) => {
    Repository.findSalesById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.id)
      setItems(res.data.id)
      setSale_unit_cost(res.data.id)
      setAccount(res.data.id)
      setCustomer(res.data.id)
      setAmount_paid(res.data.id)
      setExpected_amount(res.data.id)
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
  const delHw_movementById = (id) => {
    Utils.Submit(() => {
      Delete.deleteHw_movementById(id, () => { getAllHw_movements() })
    }, () => { })
  }
  const delSalesById = (id) => {
    Utils.Submit(() => {
      Delete.deleteSalesById(id, () => { getAllSaless() })
    }, () => { })
  }
  const getCommonSearchByDate = (startDate, endDate, name, type) => {
    setSearchProgress(true)
    var Mdl_SearchItemDate_itemName = {
      startDate: startDate,
      endDate: endDate,
      name: name,
      type: type
    }

    if (type == 'Reference') {// this is the reference number taken from dropdown list
      Repository.findHw_movementByReference(name).then((res) => {
        if (res.data != null) {
          setSearchProgress(false)
          setHwmovement(res.data)
          console.log('-------------The warehouse by reference----------')
          console.log(res)
          //setWareosueMovementsList(res,Mdl_SearchItemDate_itemName,name)

        }
      })
    } else if (type = 'name' && (startDate !== 'NaN-NaN-NaN' && endDate !== 'NaN-NaN-NaN')) { // this is the name of the item
      setSecondResultTableVisible(false)

      Repository.findItemByDate(Mdl_SearchItemDate_itemName).then((res) => {
        if (res.data != null) {
          if (res.data.warehouse_stat == 'not exists') {
            alert('The item could not be found in the stock. Kindly make sure you have entered the correct \n\n1. \'name\' of the item and \n2. the \'date\' range and then search again')
            setSearchProgress(false)
          } else {
            setWareosueMovementsList(res, Mdl_SearchItemDate_itemName, name)
          }
        } else {
          alert('Could not find the data')
        }

      })

    } else if (type = 'name' && (startDate == 'NaN-NaN-NaN' && endDate == 'NaN-NaN-NaN')) {//  no date jus thte item
      setSecondResultTableVisible(true) // to display the second table of the search, there are two tables fof search

      Repository.findItemssbyname(name).then(res => {
        setSecondTableitemssbyname(res.data)
        setResultTableVisible(true)
        setSearchProgress(false)
      })

    } else {
      alert('You have to select an option')
    }



  }

  const searchForItemByName = () => {
    console.log('--------The search initiated Commmon');
    if (searchItemValue == '') {
      alert('You have to enter the value to search')
    } else {
      setCompletedSearch(false)
      setSearchProgress(true) // Go and show the progress bar,
      Repository.findItemssbyname(searchItemValue).then(res => {
        setItemssbyname(res.data)
        setResultTableVisible(true)
        setSearchProgress(false)
      })
    }
  }

  const searchDone = (id, name) => {
    setSearchedItemChosen(true) //show other 2 fields on the form
    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setCompleteitemName(name)
    setResultTableVisible(false)

  }
  const setWareosueMovementsList = (res, Mdl_SearchItemDate_itemName, name) => {

    setDate_time(res.data.warehouse_data.date_time)
    setIn_out(res.data.warehouse_data.in_out)
    setRemaining(res.data.warehouse_data.remaining)
    setCurrent_qty(res.data.warehouse_data.current_qty)
    setCarrier(res.data.warehouse_data.carrier)

    //setHwmovement(res.salesPurchases_data);
    Mdl_SearchItemDate_itemName = {
      id: res.data.warehouse_data.id,
      date_time: res.data.warehouse_data.date_time,
      in_out: in_out,
      carrier: res.data.warehouse_data.carrier,
      current_qty: current_qty,
      remaining: res.data.warehouse_data.remaining,
      itemname: res.data.warehouse_data.mdl_items.name
    }
    setName(name)
    setHwmovement([])
    setHwmovement(current => [...current, Mdl_SearchItemDate_itemName]);
    setSearchProgress(false)
    setClickedSearch(true)
  }
  const SearchDone_Table2 = (id, name) => {
    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setCompleteitemName(name)
    setSecondResultTableVisible(false)
  }
  const refreshClick = () => {

    setSearchProgress(true)
    getAllHw_movements()
    setSearchProgress(false)
    setName('')
  }

  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllSaless()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setItems("")
    setSale_unit_cost("")
    setCustomer("")
    setAmount_paid("")
    setExpected_amount("")
  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setItems("")
    setSale_unit_cost("")
    setAccount("")
    setCustomer("")
    setAmount_paid("")
    setExpected_amount("")
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
        <ContainerRowBtwn clearBtn={clearBtn} form={saleSwitchToDamage()} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormFillPane onSubmitHandler={onSubmitHandler}>
          <InputAndSearch changedContent={(e) => setSearchItemValue(e.target.value)} handle={() => searchForItemByName()} label='Item' name='item'>
              <div className='row offset-6 fw-bold'>
                {completeitemName}
              </div>
              <LoadSub showmoreload={searchProgress} /> {/* Show progress upon clicking te deploy button*/}

              {/* The first search table */}
              {resultTableVisible &&
                <TableOpen changedbgColor={1} >
                  <TableHead changedbgColor={1}>
                    <LocalTableHead />
                    {userType == 'admin' && <td className='delButton'>Option</td>}
                  </TableHead>
                  <tbody>
                    {itemssbyname.map((item, index) => {
                      var color = index > 0 && (itemssbyname[index - 1].name !== item.name ? 'change' : 'v')
                      var styl = color == 'change' ? 'green' : 'transparent'
                      var txt = color == 'change' ? '#fff' : '#000'
                      return <TableRows item={item} searchDone={searchDone} />
                    }
                    )}
                  </tbody>
                </TableOpen>
              }
            </InputAndSearch>


            <InputRow name='Reference' val={reference} handle={(e) => setReference(e.target.value)} label='reference' />
            <InputRow name='Sale Quantity' val={sold_qty} handle={(e) => setSold_qty(e.target.value)} label='sold Quantity' />
            {userType == 'admin' &&
              <>  <DropDownInput handle={(e) => setCustomer(e.target.value)} name='Customer' label='Customer' >
                {profiles.map((profile) => (
                  <option value={profile.id} val={profile.id} key={profile.id}> {profile.name} {profile.surname} </option>
                ))}
              </DropDownInput>

                {/* <InputRow name='Sale unit cost' val={sale_unit_cost} handle={(e) => setSale_unit_cost(e.target.value)} label='lblsale_unit_cost' />
                <InputRow name='Amount paid' val={amount_paid} handle={(e) => setAmount_paid(e.target.value)} label='lblamount_paid' />
                <InputRow name='Expected amount' val={expected_amount} handle={(e) => setExpected_amount(e.target.value)} label='lblexpected_amount' /> */}
              </>}
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />

          </FormFillPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle={`${saleSwitchToDamage()} List`} height={height} entity={saleSwitchToDamage()} changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} refreshClick={refreshClick} />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <LoadSub showmoreload={searchProgress} /> {/* Show progress upon clicking te deploy button*/}

          {/* The  second search table, searching itemOnly */}
          {secondResultTableVisible &&
            <>

              <h3 style={{ color: 'green' }}>Search Result</h3>
              <TableOpen changedbgColor={1} >
                <TableHead changedbgColor={1}>
                  <LocalTableHead />
                  {userType == 'admin' && <td className='delButton'>Option</td>}
                </TableHead>
                <tbody>
                  {secondTableitemssbyname.map((item, index) => {
                    var color = index > 0 && (secondTableitemssbyname[index - 1].name !== item.name ? 'change' : 'v')
                    var styl = color == 'change' ? 'green' : 'transparent'
                    var txt = color == 'change' ? '#fff' : '#000'
                    return <TableRows item={item} searchDone={SearchDone_Table2} />
                  }
                  )}
                </tbody>
              </TableOpen>    </>
          }


          <TableOpen>
            <TableHead>
              <td>id</td>
              <td>Reference</td>
              <td>date_time</td>
              <td>item</td>
              <td>Action</td>
              <td>Previous</td>
              <td>Difference</td>
              <td>remaining</td>
              <td>account</td>
              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {hwmovements.map((Hw_movement) => {

                const prev = Hw_movement.current_qty
                const later = Hw_movement.remaining
                const pchased_sold = Hw_movement.in_out === 'in' ? 'Purchased' : (Hw_movement.in_out == 'return' ? 'return' : 'Sale')
                const diff = pchased_sold == 'Purchased' ? later - prev : prev - later
                return (
                  <tr key={Hw_movement.id}>
                    <td>{Hw_movement.id}   </td>
                    <td>{Hw_movement.reference}   </td>
                    <td>{Hw_movement.date_time}   </td>
                    <td>{Hw_movement.itemname}   </td>
                    <td style={{ backgroundColor: Hw_movement.in_out == 'damage' ? '#ffd4c5e8' : 'transparent' }} >
                      {Hw_movement.in_out}   </td>
                    <td>{Hw_movement.current_qty}   </td>
                    <td>{pchased_sold}  <span style={{ color: 'blue' }}> {diff} </span></td>
                    <td>{Hw_movement.remaining}   </td>
                    <td>{Hw_movement.email}   </td>
                    {userType == 'admin' && <ListOptioncol getEntityById={() => getHw_movementById(Hw_movement.id)} delEntityById={() => delHw_movementById(Hw_movement.id)} />}
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

export default Return
