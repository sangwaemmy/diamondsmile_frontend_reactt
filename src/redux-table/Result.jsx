import { useDispatch, useSelector } from "react-redux"
import { SubmitAll } from "./rootSlice"
import { Link } from "react-router-dom"

export const Result = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const {name,surname,age,date} = state;
    const formattedResult = {
        name,
        surname,
        age,
        date
    };
    const handleClick = (formattedResult) => {
        dispatch(SubmitAll(formattedResult))
    }
    
    return <>
        <pre>Name: {name}</pre>
        <pre>Surname: {surname}</pre>
        <pre>Age: {age}</pre>
        <pre>Date: {date}</pre>
        <Link to="/table" className="btn btn-primary me-3" onClick={() => handleClick(formattedResult)}>submit</Link>
        <Link to="/form1" className="btn btn-primary">Go to begining</Link>
    </>
}