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
import InputRow, { DropDownInput, EmptyInputRow, LoadSub } from '../Global/Forms/InputRow'
import FormTools from '../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../Global/ListTable'
import Utils from '../Global/Utils'
import Delete from '../../services/Delete'
import Pagination from '../Global/Pagination'

function Configure() {
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
    const [height, setHeight] = useState(0);
    const [searchHeight, setSearchHeight] = useState(0);
    const [userType, setUserType] = useState()
    const [searchProgress, setSearchProgress] = useState(false)// next or previous set of data on top
    const [searchProgressBottom, setSearchProgressBottom] = useState(false)// next or previous set of data on bottom

    /*#region ----PAGINATION -----*/
    const [loading, setLoading] = useState(false)
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

    const prevEvent = () => {
        if (startPoint >= 50) {
            setStartPoint(n => n - 50)
            setNextset(n => n - 50)
            getAllItemss(startPoint, nextset)
        }

        // searchProgressBottom(true)

    }

    const getItemsById = (id) => {
        Repository.findItemsById(id).then((res) => {
            setId(res.data.id)
            setName(res.data.name)
            setUnit_cost(res.data.id)
            setSale_cost(res.data.id)
            setCategory(res.data.mdl_itemsCategory.id)
            setItemsCategoryId(res.data.mdl_itemsCategory.id)
            setClearBtn(true)
            showheight('auto')
        })
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
        var mdl_items = {
            id: id,
            name: name,
            unit_cost: unit_cost,
            sale_cost: sale_cost, balance: 0
        }
        if (id) {
            Commons.updateItem(mdl_items, id, itemsCategoryId).then((res) => {
                resetAfterSave()
            })
        } else {
            Commons.saveItem(mdl_items, itemsCategoryId).then((res) => {
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
    const getAllItemss = (startPoint, nextset) => {
        Repository.findItems(startPoint, nextset).then((res) => {
            console.log(res)
            setItemss(res.data.itemss);
            setDataLoad(true)
        });
    }
    const getAllItem_categorys = () => {
        Repository.findItem_category().then((res) => {
            setItem_categorys(res.data);
            setDataLoad(true)
        });
    }

    const getconfig = () => {
        Repository.conf().then((res) => {

        }
        )
    }
    useEffect(() => {
        getAllItemss(startPoint, nextset)
        getAllItem_categorys()
        getconfig()

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
                        <InputRow name='Name' val={name} handle={(e) => setName(e.target.value)} label='lblname' />

                        <DropDownInput handle={(e) => setItemsCategoryId(e.target.value)} name='Category' label='Category' >
                            {item_categorys.map((cats) => (
                                <option selected={cats.id == itemsCategoryId} value={cats.id} key={cats.id}> {cats.item_name} </option>
                            ))}
                        </DropDownInput>
                        <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />

                    </FormInnerRightPane>
                    <FormSidePane />
                </ContainerRowBtwn>
            </AnimateHeight>
            <ContainerRow mt='3'>
                <ListToolBar listTitle='Items List to configure' height={height} entity='config' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
                <SearchformAnimation searchHeight={searchHeight}>
                    <SearchBox />
                </SearchformAnimation>

                <div ref={componentRef} className="dataTableBox">
                    <PrintCompanyInfo />

                    <Pagination itemsPerPage={itemsPerPage} totalitems={itemss.length} paginate={paginate} prevEvent={prevEvent} nextEvent={nextEvent} />
                    <LoadSub showmoreload={searchProgressBottom} /> {/* Show progress upon clicking te deploy button*/}

                    <TableOpen>
                        <TableHead>
                            {/* <td>id</td> */}
                            <td>name</td>
                            {/* <td>unit_cost</td>
              <td>sale_cost</td> */}
                            {/* <td>category</td> */}
                            {userType == 'admin' && <td className='delButton'>Option</td>}
                        </TableHead>
                        <tbody>
                            {currentitems.map((items) => (
                                <tr key={items.id}>
                                    {/* <td>{items.id}   </td> */}
                                    <td>{items.name}   </td>
                                    {/* <td>{items.mdl_itemsCategory.item_name}   </td> */}
                                    {/* <td>{items.unit_cost}   </td>
                  <td>{items.sale_cost}   </td> */}
                                    {userType == 'admin' &&
                                        <ListOptioncol getEntityById={() => getItemsById(items.id)} delEntityById={() => delItemsById(items.id)} />}
                                </tr>
                            ))}</tbody>
                    </TableOpen>
                    <LoadSub showmoreload={searchProgressBottom} /> {/* Show progress upon clicking te deploy button*/}

                    <Pagination itemsPerPage={itemsPerPage} totalitems={itemss.length} paginate={paginate} prevEvent={prevEvent} nextEvent={nextEvent} />
                </div>
            </ContainerRow>
            {!dataLoad && <DataListLoading />}
        </PagesWapper>
    )
}

export default Configure
