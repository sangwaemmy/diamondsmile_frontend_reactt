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
import InputRow, { DropDownInput, EmptyInputRow, LoadSub, PasswordInputRow } from '../Global/Forms/InputRow'
import FormTools from '../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../Global/ListTable'
import Utils from '../Global/Utils'
import Delete from '../../services/Delete'
import Pagination from '../Global/Pagination'

function Changepassword() {
    const [id, setId] = useState(null)

    /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
    const [Id_id, setId_id] = useState()
    const [name, setName] = useState()
    const [unit_cost, setUnit_cost] = useState(0)
    const [sale_cost, setSale_cost] = useState(0)
    const [category, setCategory] = useState()

    const [item_categorys, setItem_categorys] = useState([]) //Data List
    const [itemsCategoryId, setItemsCategoryId] = useState() //this is the item category
    /*#endregion Listing data*/

    const [showLoader, setShowLoader] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [itemss, setItemss] = useState([]) //Data List

    const [clearBtn, setClearBtn] = useState(false) //The cancel button

    const [dataLoad, setDataLoad] = useState(false)
    const [height, setHeight] = useState('auto');
    const [searchHeight, setSearchHeight] = useState(0);
    const [userType, setUserType] = useState()
    const [oldPassword, setOldPassword] = useState()
    const [password, setPassword] = useState()
    const [confpassword, setConfpassword] = useState()
    const [searchProgressBottom, setSearchProgressBottom] = useState(false)// next or previous set of data on bottom

    /*#region ----PAGINATION -----*/

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentitems = itemss.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const [startPoint, setStartPoint] = useState(0)
    const [nextset, setNextset] = useState(50) // number of record
    const [itemsBackend, setItemsBackend] = useState(50)// incremented amount each next
    const totalItems = itemss.length


    const nextEvent = () => {

        setSearchProgressBottom(true)
        setStartPoint(n => n + itemsBackend)
        setNextset(n => n + itemsBackend)



        // go to db
        /*
        it is just a setting i gave myself (SANGWA) to set the set to be 50 records from database
        so each set will be retrieving a set of 50 items.
        */
        console.log(startPoint + '- ' + nextset)



    }


    const delItemsById = (id) => {
        Utils.Submit(() => {
            Delete.deleteItemsById(id, () => { getAllItemss() })
        }, () => { })
    }
    /*#endregion Pagination*/


    /*endregion -- End pagination*/


    /*#region ---------- SAVING DATA TO DB--------------------------------------*/

    const onSubmitHandler = (e) => {
        e.preventDefault()
        setShowLoader(true)
        var ChangePassword = {
            id: id,
            oldPassword: oldPassword, password: password, confpassword: confpassword
        }
        if (id) {
            Commons.changePassword(ChangePassword, id).then((res) => {
                if (res.data.resp === 'foundAccountFoundpassword') {
                    alert('Password changed successfully')

                    resetAfterSave()
                } else if (res.data.resp === 'OnlyFoundacc') {
                    alert('The password is incorect!')
                } else if (res.data.resp === 'noRec') {
                    alert('The account not found')
                }
            })
        } else {
            alert('You have to log in')
        }
    }

    /*#endregion Listing data*/

    /*#region ------------All Records, Deleting and By Id------------------------*/
    const getAllItemss = (startPoint, nextset) => {
        Repository.findItems(startPoint, nextset).then((res) => {
            console.log(res)
            setItemss(res.data.itemss);
            setDataLoad(true)
        });
    }



    useEffect(() => {
        // getAllItemss(startPoint, nextset)
        // getAllItem_categorys()
        setId(localStorage.getItem('userid'))
        //Get Token and catname

        setUserType(localStorage.getItem('catname'))
        setSearchProgressBottom(false)
    }, [nextset, , searchProgressBottom, currentPage]);




    /*#region ---------Show Height, reset all and clear Button   ------------*/
    function showheight(type) {
        setHeight(type)
    }
    const resetAfterSave = () => {
        document.getElementById("Form").reset();
        getAllItemss()
        setShowLoader(false)
        setShowAlert(true)
        setHeight(0)
        setId(null)

    }
    const clearHandle = () => {
        setId(null)
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
                <ContainerRowBtwn clearBtn={clearBtn} form='Config' showLoader={showLoader}  >
                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />

                    <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

                        <PasswordInputRow name='Old Password' val={name} handle={(e) => setOldPassword(e.target.value)} label='oldpasss' />
                        <PasswordInputRow name='New Password' val={name} handle={(e) => setPassword(e.target.value)} label='newpass' />
                        <PasswordInputRow name='Confirm Password' val={name} handle={(e) => setConfpassword(e.target.value)} label='confirm' />

                        <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />

                    </FormInnerRightPane>
                    <FormSidePane />
                </ContainerRowBtwn>
            </AnimateHeight>
            <ContainerRow mt='3'>
                <ListToolBar listTitle='Change Password' height={height} entity='config' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
                <SearchformAnimation searchHeight={searchHeight}>
                    <SearchBox />
                </SearchformAnimation>


            </ContainerRow>
            
        </PagesWapper>
    )
}

export default Changepassword
