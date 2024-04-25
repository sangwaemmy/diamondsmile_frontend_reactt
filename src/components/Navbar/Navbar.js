import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';

import { Icon } from 'react-icons-kit'
import { man } from 'react-icons-kit/icomoon/man'
import { compass } from 'react-icons-kit/icomoon/compass'
import { pencil2 as arrival } from 'react-icons-kit/icomoon/pencil2'
import { checkmark as tally } from 'react-icons-kit/icomoon/checkmark'
import { coinDollar as invoice } from 'react-icons-kit/icomoon/coinDollar'
import { stack as receipt } from 'react-icons-kit/icomoon/stack'
import { printer } from 'react-icons-kit/icomoon/printer'
import { stack as deploy } from 'react-icons-kit/icomoon/stack'
import { ic_view_week_outline as struc } from 'react-icons-kit/md/ic_view_week_outline'
import { ic_credit_card as layout } from 'react-icons-kit/md/ic_credit_card'
import { ic_next_plan_twotone as more } from 'react-icons-kit/md/ic_next_plan_twotone'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OtherStyles from '../Styles/OtherStyles';
import { useSignOut } from 'react-auth-kit';
import { useEffect } from 'react';
import { useState } from 'react';
import { ic_logout } from 'react-icons-kit/md/ic_logout'

import { ic_person_pin } from 'react-icons-kit/md/ic_person_pin'
import { ic_home } from 'react-icons-kit/md/ic_home'

import {ic_person_pin_circle_twotone as person} from 'react-icons-kit/md/ic_person_pin_circle_twotone'
export function LocalLoginLink(props) {
    return (
        <li className="nav-item">
            <Link className="nav-link  " style={{ fontSize: "13px", fontWeight: "bold", color: "#fff", marginLeft: "40px" }} to={`/${props.path} `}>
                <span style={{ textTransform: 'capitalize' }}>  {`${props.path} `} </span>
            </Link>
        </li>
    )
}
function NavbarBar() {
    let my_class = "background-color: #2ccdf5  "

    const globalTheme = '#03388e'
    const globalThemText = '#bdf8dbe8'

    const signOut = useSignOut()
    const navigate = useNavigate()

    const [username, setUsername] = useState()
    const [userType, setUserType] = useState()

    const [usermenuNames, setUsermenuNames] = useState()

    const navLinks = {
        color: globalThemText,
        textDecoration: "none",
        fontWeight: "bolder",
        fontFamily: "arial black",
        fontSize: "13px",
        textShadow: "0px 0px 5px #000",
        marginLeft: "12px",
        marginTop: '3px'
    };

    const nav_styles = {
        backgroundColor: globalTheme,
        fontFamily: "arial",
        fontWeight: "bolder",
        zIndex: "1",
        textShadow: "0px 0px 5px #fff",

    };
    const loginLink = {
        color: "#000",
        textDecoration: "none",
        fontWeight: "bolder",
        fontFamily: "arial black",
        fontSize: "13px"

    };
    const iconStyle = {
        color: "#2ccdf5",
        marginRight: "5px"

    };
    const brandStyles = {
        color: "#fff",
        textDecoration: "none",
        fontWeight: "bolder",
        fontFamily: "arial black",
        fontSize: "20px", textShadow: "0px 0px 5px #000"
    }
    const subMenuTitle = {
        name: "<span style={{color:'#000'}}>Action</span>"
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('catname')
        localStorage.removeItem('userid')
        localStorage.clear()
        signOut()
        if (localStorage.getItem('token') == '' && localStorage.getItem('catname') == '' && localStorage.getItem('userid') == '') {
            navigate('/login')
        }
    }

    const changePassword = () => {
        navigate('/changepassword')
    }
    useEffect(() => {
        setUsername(localStorage.getItem('token'))
        setUserType(localStorage.getItem('catname'))

    })
    const purchaseSwitchTSstockIn = () => {
        return (userType == 'store keeper') ? 'StockIn' : (userType == 'user' ? 'Stock' : 'Purchase')
    }
    const saleSwitchTSstockIn = () => {
        return (userType == 'store keeper') ? 'StockOut' : 'Sales'
    }

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" style={nav_styles} >
            <Container>
                <Navbar.Brand style={brandStyles} as={Link} to="https://thediamondsmile.rw/">THEDIAMONDSMILE</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        {(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) 
                        && (userType==='admin' || userType==='doctor' )? <>
                            <Nav.Link style={navLinks} as={Link} to="/admin">
                                <Icon style={iconStyle} size={18} icon={struc} />
                                Home
                            </Nav.Link>
                        </>

                            : <><Nav.Link style={navLinks} as={Link} to="/">
                                <Icon style={iconStyle} size={18} icon={struc} />
                                Appointment
                            </Nav.Link></>}

                        {userType == 'admin' ?
                            <NavDropdown color='#fff' title={<span style={navLinks}  > <Icon style={iconStyle} size={16} icon={compass} />  Users </span>}
                                id="collasible-nav-dropdowns">

                                <Nav.Link as={Link} to="/account">
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        Users
                                    </span>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/patientsusers">
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        Patients
                                    </span>
                                </Nav.Link>
                            </NavDropdown>

                            :
                            <>  <Nav.Link style={navLinks} as={Link} to="/pubcreateaccount">
                                <Icon style={iconStyle} size={22} icon={person} />
                                Create Account
                            </Nav.Link>

                                <Nav.Link  style={navLinks} as={Link} to="/pubproduct">
                                    <Icon style={iconStyle} size={22} icon={ic_logout} />
                                     shop
                                </Nav.Link>
                            </>

                        }

                        {(userType !== null && (userType==='admin' || userType==='doctor' )     ) &&<>
                            <NavDropdown color='#fff' title={
                                <span style={navLinks}  > <Icon style={iconStyle} size={16} icon={compass} />  Appointment </span>}
                                id="collasible-nav-dropdowns">

                                <Nav.Link as={Link} to="/serv_group">
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        Service Groups
                                    </span>
                                </Nav.Link>

                                <Nav.Link as={Link} to="/appointment">
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        Appointment
                                    </span>
                                </Nav.Link>

                                {/* <Nav.Link as={Link} to="/changepassword" onClick={changePassword}>
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        Upcoming appointments
                                    </span>
                                </Nav.Link> */}
                                <Nav.Link as={Link} to="/product">
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        Product
                                    </span>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/orders">
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        Orders
                                    </span>
                                </Nav.Link>
                                {/* <Nav.Link as={Link} to="/form1">
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        form1
                                    </span>
                                </Nav.Link> */}

                            </NavDropdown>


                        </>
                        }

                    </Nav>

                    <Nav>
                        <NavDropdown color='#fff' title={
                            <span style={navLinks}  >
                                <Icon style={OtherStyles.iconStyles()} icon={ic_person_pin} size={24} />
                                {localStorage.getItem('catname') !== null ? localStorage.getItem('catname') : 'Login'}

                            </span>} id="collasible-nav-dropdowns">

                            <NavDropdown.Divider />
                            {userType !== null ? <>
                                <Nav.Link as={Link} onClick={logout}>
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        Logout
                                    </span>
                                </Nav.Link>
                                {/* <Nav.Link as={Link} to="/changepassword" onClick={changePassword}>
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>
                                        <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                        Change Password
                                    </span>
                                </Nav.Link> */}
                                </>
                                :
                                <Nav.Link as={Link} to="/login">
                                    <span style={{ color: '#000', fontWeight: 'normal' }}>  <Icon style={OtherStyles.iconStyles()} size={22} icon={deploy} /> Login </span>
                                </Nav.Link>
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>



    )
}

export default NavbarBar


