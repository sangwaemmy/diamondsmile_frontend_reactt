import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { chooseAge, chooseDate } from './rootSlice';
import { Link } from 'react-router-dom';

export const Form2 = () => {
    const dispatch = useDispatch()
    const age = useSelector(state => state.age )
    const date = useSelector(state => state.date )
    const {register,handleSubmit} = useForm({defaultValues:{age,date}})

    const onSubmit = (data) => {
        dispatch(chooseAge(data.age))
        dispatch(chooseDate(data.date))
    }

    return<>
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                </div>
                <div className="col-sm-6 bg-secondary mt-5">
                    <form onSubmit={handleSubmit(onSubmit)} className='form'>
                        <label className="form-label fw-bold h5 text-light mt-3">Age</label>
                        <input type="number" name='age' {...register('age')} className='form-control' />
                        <label className="form-label fw-bold h5 text-light mt-3">Date</label>
                        <input type="date" name="date" {...register('date')} className='form-control' />
                        <Link to="/view" className='btn btn-primary w-50 mt-3 mb-3'>next</Link>
                    </form>
                </div>
            </div>
        </div>
        
    </>
}