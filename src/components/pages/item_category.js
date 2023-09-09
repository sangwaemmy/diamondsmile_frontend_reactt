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


function ItemCategory() {
  const [userType, setUserType] = useState()
  const [id, setId] = useState(null)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [Id_id, setId_id] = useState()
  const [item_name, setItem_name] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [item_categorys, setItem_categorys] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var itemsCategory = {
      id: id, item_name: item_name
    }
    if (id) {
      Commons.updateItemCategory(itemsCategory, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveItemCategory(itemsCategory).then((res) => {
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
  const getAllItem_categorys = () => {
    Repository.findItem_category().then((res) => {
      setItem_categorys(res.data);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    getAllItem_categorys()


     //Get Token and catname
     
     setUserType(localStorage.getItem('catname'))


  }, []);


  const getItem_categoryById = (id) => {
    Repository.findItem_categoryById(id).then((res) => {
      setId(res.data.id)
      setItem_name(res.data.item_name)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delItem_categoryById = (id) => {
    Utils.Submit(() => {
      Delete.deleteItem_categoryById(id, () => { getAllItem_categorys() })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllItem_categorys()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setItem_name("")
  }
    const clearHandle = () => {
      setId(null)
      setItem_name("")
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
          <ContainerRowBtwn clearBtn={clearBtn} form='Item category' showLoader={showLoader}  >
            <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
            <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
              <InputRow name='Name' val={item_name} handle={(e) => setItem_name(e.target.value)} label='lblname' />
              <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
            </FormInnerRightPane>
            <FormSidePane />
          </ContainerRowBtwn>
        </AnimateHeight>
        <ContainerRow mt='3'>
          <ListToolBar listTitle='Item category List' height={height} entity='Item Category' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
          <SearchformAnimation searchHeight={searchHeight}>
            <SearchBox />
          </SearchformAnimation>

          <div ref={componentRef} className="dataTableBox">
            <PrintCompanyInfo />
            <TableOpen>
              <TableHead>
                 
                <td>id</td>
                <td>name</td>
               {userType == 'admin' &&  <td className='delButton'>Option</td>}
              </TableHead>
              <tbody>
                {item_categorys.map((item_category) => (
                  <tr key={item_category.id}>
                    <td>{item_category.id}   </td>
                    <td>{item_category.item_name}   </td>
                    {userType == 'admin' && <ListOptioncol getEntityById={() => getItem_categoryById(item_category.id)} delEntityById={() => delItem_categoryById(item_category.id)} />}
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

  export default ItemCategory
