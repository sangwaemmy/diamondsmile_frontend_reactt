import React from 'react'
import Icon from 'react-icons-kit'

import { facebook } from 'react-icons-kit/icomoon/facebook'
import { google } from 'react-icons-kit/icomoon/google'
import { twitter } from 'react-icons-kit/icomoon/twitter'
import { linkedin } from 'react-icons-kit/icomoon/linkedin'
import { github } from 'react-icons-kit/icomoon/github'

function Footer() {
    return (
        <>

            <div className="mt-5 footer">
                <footer className="text-center text-white" style={{ backgroundColor: "#0a252c" }}>
                    <div className="ro">
                        <section className="mt-5">
                            <div className="row text-center  d-flex justify-content-center pt-5">
                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <a href="#!" className="">About us</a>
                                    </h6>
                                </div>
                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <a href="#!" className="">Products</a>
                                    </h6>
                                </div>

                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <a href="#!" className="">Awards</a>
                                    </h6>
                                </div>
                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <a href="#!" className="">Contact</a>
                                    </h6>
                                </div>
                            </div>
                        </section>


                        <hr className="my-5" />


                        <section className="mb-5">
                            <div className="row d-flex justify-content-center " style={{minHeight:"150px"}}>
                            <div className='col-lg-2 col-sm-3  '>
                                
                                <div className='footerLogo me-1'>
                                    Logo
                                </div>
                                <p className='footerAddress mt-2'>Email: info@codeguru-pro.com</p>
                                <p className='footerAddress'>Tel:    (250) 784113888</p>
                            </div>



                                <div className="col-lg-8 border border-light">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                                        distinctio earum repellat quaerat voluptatibus placeat nam,
                                        commodi optio pariatur est quia magnam eum harum corrupti
                                        dicta, aliquam sequi voluptate quas.
                                    </p>
                                </div>
                            </div>
                        </section>


                        <section className="text-center mb-5">
                            <Icon icon={facebook} className="ms-2" />
                            <Icon icon={twitter} className="ms-2" />
                            <Icon icon={google} className="ms-2" />
                            <Icon icon={linkedin} className="ms-2" />
                            <Icon icon={github} className="ms-2" />
 
                        </section>

                    </div>


                    <div
                        className="text-center p-3"
                        style={{ fontSize:"12px", fontWeight:"bolder", backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        2017 -  {new Date().getFullYear()} Copyright: -
                        <a  style={{ textDecoration:"none"}} className="" href="https://mdbootstrap.com/"> codeguru-pro.com</a>

                    </div>

                </footer>

            </div>


        </>
    )
}

export default Footer
