import React from 'react'
import AnimateHeight from "react-animate-height"
import Icon from 'react-icons-kit'
import { useState } from 'react'

import { home } from 'react-icons-kit/icomoon/home'
import { user } from 'react-icons-kit/icomoon/user'
import { userTie as admin } from 'react-icons-kit/icomoon/userTie'
import { man as manager } from 'react-icons-kit/icomoon/man'
import { users } from 'react-icons-kit/icomoon/users'
import { hourGlass as unfishedStructure } from 'react-icons-kit/icomoon/hourGlass'
import { laptop as machineLearning } from 'react-icons-kit/icomoon/laptop'
function VertNavBar(props) {

    const [menuheight, setMenuHeight] = useState(0);
    return (
        <div>
            <div className="container-fluid navContainer"  >
                <div className="row ">
                    <div className="  col-md-2 col-xl-2 px-sm-2 px-0  verNavBar"     >
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-99">
                            <a href="#" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">Menu</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <a href="#" className="nav-link align-middle px-0">
                                        <Icon icon={home} />   <span className="ms-1 d-none d-sm-inline">Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" data-bs-toggle="collapse" className="nav-link px-0 align-middle"
                                        aria-expanded={menuheight !== 0} aria-controls="aniMenu1" onClick={() => setMenuHeight(menuheight === 0 ? 'auto' : 0)} >
                                        <Icon style={{ color: '#fff' }} icon={user} />
                                        <span className="ms-1 d-none d-sm-inline"
                                            aria-expanded={menuheight !== 0} aria-controls="aniMenu1" onClick={() => setMenuHeight(menuheight === 0 ? 'auto' : 0)}
                                        >Dashboard</span>
                                    </a>
                                    <AnimateHeight
                                        id="aniMenu1"
                                        duration={300} animateOpacity={true}
                                        menuheight={menuheight}>
                                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                            <li className="w-100">
                                                <a href="#" className="nav-link px-0">
                                                    <Icon icon={admin} style={{marginRight: "8px"}} />
                                                    <span className="d-none d-sm-inline">Administrator </span>  </a>
                                            </li>
                                            <li>
                                                <a href="#" className="nav-link px-0"> <Icon icon={manager} /> <span className="d-none d-sm-inline">Manager</span>  </a>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0 align-middle">
                                        <Icon icon={users} /> <span className="ms-1 d-none d-sm-inline">Users</span></a>
                                </li>
                                <li>
                                    <a href="#" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                        <Icon icon={unfishedStructure} /><span className="ms-1 d-none d-sm-inline">Unfinished Structures</span></a>
                                    <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                        <li className="w-100">
                                            <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Delayed</span> 1</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Costly Structures</span> 2</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                        <Icon icon={machineLearning} /> <span className="ms-1 d-none d-sm-inline">Machine Learning </span> </a>
                                    <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                        <li className="w-100">
                                            <a href="#" className="nav-link px-0"> <span className="d-sm-inline">JAVA </span> 1</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link px-0"> <span className="d-sm-inline">PYTHON</span> 2</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link px-0"> <span className="d-sm-inline">PHP</span> 3</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <hr />
                            <div className="dropdown pb-4">
                                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                    <span className="d-none d-sm-inline mx-1">SANGWA</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li><a className="dropdown-item" href="#">New project...</a></li>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 pt-3 border border-dark">
                        {props.children}
                    </div>
                </div>
            </div >


        </div >
    )
}

export default VertNavBar
