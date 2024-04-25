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



import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwb, ContainerRowBtwn, ContainerRowHalf, ContainerSingleRow, FormFillPane, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputAndSearch, LoadSub } from '../Global/Forms/InputRow'
import FormTools from '../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../Global/ListTable'
import Utils from '../Global/Utils'
import Delete from '../../services/Delete'
import { ic_refresh as refreshBtn } from 'react-icons-kit/md/ic_refresh'
import { search } from 'react-icons-kit/icomoon/search'


import Icon from 'react-icons-kit'
import { LocalTableHead, LocalTableHeadCommon, TableRows } from '../Global/commonForPages/TableCommons'
function Purchase() {
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id_id, setId_id] = useState()
  const [date_time, setDate_time] = useState()
  const [itemsId, setItemsId] = useState()
  const [account, setAccount] = useState()
  const [purchased_qty, setPurchased_qty] = useState()
  const [supplier, setSupplier] = useState(1)



  const [in_out, setIn_out] = useState()
  const [remaining, setRemaining] = useState()

  const [current_qty, setCurrent_qty] = useState()


  /*#endregion Listing data*/


  /*#region ---------OTHER FIELDS ------------*/
  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [purchasess, setPurchasess] = useState([]) //Data List
  const [itemss, setItemss] = useState([]) //Data List in combo box
  const [name, setName] = useState()
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [carrier, setCarrier] = useState(1);
  const [accountId, setAccountId] = useState(1);
  const [searchProgress, setSearchProgress] = useState(false)//more as units when clicked the 'deploy' button

  const [clickedSearch, setClickedSearch] = useState(false)
  const [userType, setUserType] = useState()
  const [reference, setReference] = useState()
  var [hwmovements, setHwmovement] = useState([]) //Data List

  const [username, setUsername] = useState()
  /*#endregion OTHER FIELDS*/


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

    var mdl_purchases = {
      id: id, date_time: date_time, itemsId: itemsId, account: localStorage.getItem('userid'), purchased_qty: purchased_qty, supplier: supplier
    }
    if (id) {
      Commons.updateUnit(mdl_purchases, id).then((res) => {
        resetAfterSave()
      })
    } else {
      //                                   {accountId}/                   {itemsId}/{carrier}/{reference}
      Commons.savePurchases(mdl_purchases, localStorage.getItem('userid'), itemsId, carrier, reference).then((res) => {
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
  const getAllPurchasess = () => {
    Repository.findPurchases().then((res) => {
      setPurchasess(res.data);
      setDataLoad(true)
    });
  }
  const getAllHw_movements = () => {
    Repository.findHw_movement().then((res) => {
      setHwmovement(res.data);
      setDataLoad(true)
    });
  }
  const getAllItemss = () => {
    Repository.findItems().then((res) => {
      console.log(res)
      setItemss(res.data.itemss);
      setDataLoad(true)
    });
  }
  useEffect(() => {
    Utils.VerifyLogin()
    // getAllPurchasess()
    setDataLoad(true)

    setUsername(localStorage.getItem('token'))
    setUserType(localStorage.getItem('catname'))

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))



    // Repository.allNopagination().then((res) => {
    // setComboitemss(res.data)
    // })

    Repository.findItemssbyname(searchItemValue).then(res => {
      setItemssbyname(res.data.itemssbyname)
    })


  }, [username]);
  const purchaseSwitchTSstockIn = () => {
    return (userType == 'store keeper') ? 'StockIn' : 'Purchase'
  }
  const saleSwitchTSstockIn = () => {
    return (userType == 'store keeper') ? 'StockOut' : 'Sales'
  }

  const getPurchasesById = (id) => {
    Repository.findPurchasesById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.id)
      setItemsId(res.data.id)
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
      setItemsId(res.data.id)
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
  const delPurchasesById = (id) => {
    Utils.Submit(() => {
      Delete.deletePurchasesById(id, () => { getAllPurchasess() })
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
    } else if (type = 'name' && (startDate !== 'NaN-NaN-NaN' && endDate !== 'NaN-NaN-NaN') ) { // this is the name of the item
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
      name: res.data.warehouse_data.mdl_items.name,
      reference: res.data.warehouse_data.reference,
      user: res.data.warehouse_data.user.username
    }

    setName(name)
    //hwmovements.push(await Mdl_SearchItemDate_itemName)  
    setHwmovement([])
    setHwmovement(current => [...current, Mdl_SearchItemDate_itemName]);
    setSearchProgress(false)
    setClickedSearch(true)
  }

  const refreshClick = (e) => {
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

    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setItemsId("")
    setAccount("")
    setPurchased_qty("")
    setSupplier("")
  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setItemsId("")
    setAccount("")
    setPurchased_qty("")
    setSupplier("")
    setClearBtn(false)
  }
  /*#endregion Listing data*/


  /*#region ---------SEARCH ON THE FORM  ------------*/
  const searchDone = (id, name) => {
    setSearchedItemChosen(true) //show other 2 fields on the form
    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setCompleteitemName(name)
    setResultTableVisible(false)

  }

  const SearchDone_Table2 = (id, name) => {

    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setCompleteitemName(name)
    setSecondResultTableVisible(false)
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
        <ContainerSingleRow clearBtn={clearBtn} form={purchaseSwitchTSstockIn()} showLoader={showLoader}  >
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

            {searchedItemChosen && <>{/*This is the variable that toggles the on and off the the two fields upon click on the search button*/}
              <InputRow name='Reference' val={reference} handle={(e) => setReference(e.target.value)} label='reference' />
              <InputRow name='Purchased quantity' val={purchased_qty} handle={(e) => setPurchased_qty(e.target.value)} label='lblpurchased_qty' />
            </>
            }


            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />

          </FormFillPane>
          <FormSidePane />
        </ContainerSingleRow>
      </AnimateHeight >
      <ContainerRow mt='3'>
        <ListToolBar logeuserType={localStorage.getItem('catname')} listTitle={`${purchaseSwitchTSstockIn()} History`} height={height} entity={purchaseSwitchTSstockIn()} changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} >

        </ListToolBar>
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
          {/* The below is the normal table */}

          <TableOpen>
            <TableHead>
              {/* <td>id</td> */}
              <td>Ref. No.</td>
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
                    {/* the below, the mdl_itemsname comes when made a search, another comes on load */}
                    <td>{Hw_movement.name !== undefined ? Hw_movement.name
                      : Hw_movement.itemname} </td>
                    <td>{Hw_movement.in_out === 'in' ? 'Purchase' : 'Sale'}   </td>
                    <td>{Hw_movement.current_qty}   </td>
                    <td>{pchased_sold}  <span style={{ color: 'blue' }}> {diff} </span></td>
                    <td>{Hw_movement.remaining}   </td>
                    <td>{Hw_movement.user !== undefined ? Hw_movement.user : Hw_movement.email}   </td>
                    {userType == 'admin' && <ListOptioncol getEntityById={() => getHw_movementById(Hw_movement.id)} delEntityById={() => delHw_movementById(Hw_movement.id)} />}
                  </tr>
                )
              })}</tbody>
          </TableOpen>

        </div>
      </ContainerRow>
      {
        !dataLoad && <DataListLoading />
      }

    </PagesWapper >


  )
}

export default Purchase

