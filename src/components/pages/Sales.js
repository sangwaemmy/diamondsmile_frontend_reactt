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
import Icon from 'react-icons-kit'
import { ic_thumb_up_alt as ok } from 'react-icons-kit/md/ic_thumb_up_alt'
import { LocalTableHead, TableRows } from '../Global/commonForPages/TableCommons'
function Sales() {
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
  /*#region ---------- OTHER FIELDS   ---------------------------*/
  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [saless, setSaless] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [itemss, setItemss] = useState([]) //Data List in combo box
  const [itemsId, setItemsId] = useState()
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
  /*#endregion OTHER FIELDS */
  /*#region ---------- SEARCH FIELDS--------------------------------------*/
  const [searchedItemChosen, setSearchedItemChosen] = useState(false)// this is to show the two fields that are initially hiden(false), on the selection they appear again
  const [completedSearch, setCompletedSearch] = useState(false)//  
  const [searchItemValue, setSearchItemValue] = useState('')

  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
  const [secondTableitemssbyname, setSecondTableitemssbyname] = useState([]) //Data List searched by name
  const [completeitemName, setCompleteitemName] = useState() //This is the chosen name of item selected from the list from the backend on the result table
  const [resultTableVisible, setResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button
  const [secondResultTableVisible, setSecondResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button


  /*#endregion SEARCH FIELDS*/
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/

  
 

   
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var tbl_sales = {
      id: id, date_time: date_time, items: items, sale_unit_cost: sale_unit_cost, account: localStorage.getItem('userid'), customer: customer, amount_paid: amount_paid, expected_amount: expected_amount,
      sold_qty: sold_qty
    }
    if (id) {
      Commons.updateUnit(tbl_sales, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveSales(tbl_sales, localStorage.getItem('userid'), items, reference).then((res) => {
        console.log(res.data)

        if (res.data.stat == 'no sales yet') {
          alert('There is not enough quantity in the stock, kindly add some quantity first and proceed')
          setShowLoader(false)
        } else if (res.data.stat == 'not enough') {
          alert('There is not enough quantity in the stock, kindly do some purchases and proceed')
          setShowLoader(false)
        } else {
          resetAfterSave()

        }
      }).catch((error) => {
        console.log('-----------')
        alert('Error Occured')
      })
    }
  }
  /*#endregion Listing data*/
  /*#region ---------- All Records, Deleting and By Id------------------------*/

  const getAllSaless = () => {
    Repository.findSales().then((res) => {
      setSaless(res.data);
      setDataLoad(true)
    });
  }
  const getAllHw_movements = () => {
    Repository.findHw_movement().then((res) => {
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
    Utils.VerifyLogin()

    getAllProfiles()



    setUsername(localStorage.getItem('token'))
    setUserType(localStorage.getItem('catname'))

    //Get Token and catname

    setUserType(localStorage.getItem('catname'))
  }, []);


  const saleSwitchTSstockOut = () => {
    return (userType == 'store keeper') ? 'StockOut' : 'Sales'
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
      name: res.data.warehouse_data.mdl_items.name
    }
    setName(name)
    //hwmovements.push(await Mdl_SearchItemDate_itemName)  
    setHwmovement([])
    setHwmovement(current => [...current, Mdl_SearchItemDate_itemName]);
    setSearchProgress(false)
    setClickedSearch(true)
  }

  const refreshClick = () => {
    setSearchProgress(false)
    setName('')
  }

  /*#endregion Listing data*/
  /*#region ---------- Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();

    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setItems("")
    setSale_unit_cost(0)
    setCustomer(0)
    setAmount_paid(0)
    setExpected_amount(0)
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
  /*#region ---------- SEARCH ON THE FORM  ------------*/
  const searchDone = (id, name) => {
    setSearchedItemChosen(true) //show other 2 fields on the form
    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setItems(id)
    setCompleteitemName(name)
    setResultTableVisible(false)
  }
  const searchForItemByName = () => {
    if (searchItemValue == '') {
      alert('You have to enter the value to search')
    } else {
      setCompletedSearch(false)
      setSearchProgress(true) // Go and show the progress bar,
      Repository.findItemssbyname(searchItemValue).then(res => {
        setItemssbyname(res.data)
        setResultTableVisible(true)
      })
    }
  }

  //Second search

  const SearchDone_Table2 = (id, name) => {

    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setCompleteitemName(name)
    setSecondResultTableVisible(false)
  }
  /*#endregion SEARCH ON THE FORM*/
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
        <ContainerRowBtwn clearBtn={clearBtn} form={saleSwitchTSstockOut()} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormFillPane onSubmitHandler={onSubmitHandler}>
            <InputAndSearch changedContent={(e) => setSearchItemValue(e.target.value)} handle={() => searchForItemByName()} label='Item' name='item'>
              <div className='row offset-6 fw-bold'>
                {completeitemName}
              </div>
              <LoadSub showmoreload={searchProgress} /> {/* Show progress upon clicking te deploy button*/}

               Searched? {secondResultTableVisible}
              {/* The  second search table, searching itemOnly */}

              {resultTableVisible &&
                <TableOpen changedbgColor={1} >
                  <TableHead changedbgColor={1}>

                    <td>ITEM</td>
                    <td>Category</td>
                    <td>Remaining</td>
                    <td>Select</td>

                    {userType == 'admin' && <td className='delButton'>Option</td>}
                  </TableHead>
                  <tbody>
                    {itemssbyname.map((item, index) => {

                      var color = index > 0 && (itemssbyname[index - 1].name !== item.name ? 'change' : 'v')
                      var styl = color == 'change' ? 'green' : 'transparent'
                      var txt = color == 'change' ? '#fff' : '#000'
                      return (
                        <tr>
                          <td      >{item.name}       </td>
                          <td>{item.item_name}</td>
                          <td >{item.balance}</td>
                          <td>
                            <Icon onClick={(e) => searchDone(item.id, item.name)} size={30} className='handCursor' style={{ boxShadow: '0px 0px 4px #fff', color: '#e6540b', marginRight: "10px" }} icon={ok} />
                          </td>
                        </tr>
                      )
                    }
                    )}
                  </tbody>
                </TableOpen>
              }
            </InputAndSearch>


            {searchedItemChosen && <>{/*This is the variable that toggles the on and off the the two fields upon click on the search button*/}
              <InputRow name='Reference' val={reference} handle={(e) => setReference(e.target.value)} label='reference' />
              <InputRow name='Sale Quantity' val={sold_qty} handle={(e) => setSold_qty(e.target.value)} label='sold Quantity' /></>
            }
           
             
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />

          </FormFillPane>
          <FormSidePane />
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle={`${saleSwitchTSstockOut()} List`} height={height} entity={saleSwitchTSstockOut()} changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
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
                const pchased_sold = Hw_movement.in_out === 'in' ? 'Purchased' : 'Sold'
                const diff = pchased_sold == 'Purchased' ? later - prev : prev - later

                return (
                  <tr key={Hw_movement.id}>
                    {/* <td>{Hw_movement.id}   </td> */}
                    <td>{Hw_movement.reference}   </td>
                    <td>{Hw_movement.date_time}   </td>
                    <td>{Hw_movement.itemname}   </td>
                    <td>{Hw_movement.in_out === 'in' ? 'Purchase' : 'Sale'}   </td>
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

export default Sales
