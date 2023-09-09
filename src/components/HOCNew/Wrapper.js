import { Dashboard } from '@mui/icons-material'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ContainerRow from '../Global/ContainerRow'
import PagesWapper from '../Global/PagesWapper'
import SideBar from '../Navbar/SideBar'
import About from '../pages/About'

function Wrapper(props) {

    const [count, setCount] = useState(0)

    const incCount = () => {
        setCount((count) => count + 1)
    }

    const [txtval, setTxtVal] = useState()
    const changedText = (e) => {
        setTxtVal(e.target.value)
    }

    
    return (
        <>
            <PagesWapper>
                <SideBar>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </SideBar>
                <ContainerRow>
                    {props.render(txtval,  changedText)}
                </ContainerRow>
            </PagesWapper>
        </>
    )
}

export default Wrapper
