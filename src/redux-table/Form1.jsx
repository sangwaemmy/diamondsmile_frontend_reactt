
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { chooseName, chooseSurname } from './rootSlice';
// import { useHistory } from "react-router-dom"

const Form1 = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    const name = useSelector(state=>state.name)
    const surname = useSelector(state=>state.surname)
    const {register,handleSubmit} = useForm({defaultValues:{name,surname}})

    const onSubmit = (data) => {
        dispatch(chooseName(data.name))
        dispatch(chooseSurname(data.surname))
        // history.push("/form2")
    }

    return<>
        <div className="container">
         <div className="row">
             <div className="col-sm-3"></div>
             <div className="col-sm-6 bg-secondary mt-5">
                 <form className='form' onSubmit={handleSubmit(onSubmit)}>
                     <label className="form-label mt-3 h5 fw-bold text-light">name</label>
                     <input type="text" name='name' className='form-control' {...register("name")} />
                    
                     <label className="form-label mt-3 h5 fw-bold text-light">surname</label>
                     <input type="text" name="surname" className='form-control' {...register("surname")} />
                    
                     <Link to="/form2" className='btn btn-primary w-50 mt-3 mb-3'>next</Link>
                 </form>
         </div>
         </div>
     </div>
    </>
}

export default Form1