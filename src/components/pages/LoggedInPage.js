import React, { useEffect, useState } from 'react'
import { Alert, Col } from 'react-bootstrap'
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon
} from 'mdb-react-ui-kit';
import Repository from '../../services/Repository';
import { useSignIn } from 'react-auth-kit';
import { ic_facebook } from 'react-icons-kit/md/ic_facebook'
import Icon from 'react-icons-kit';
import Values from '../imgz/Values.JPG'
function LoggedInPage() {



  const [userName, setUsername] = useState()
  const [password, setPassword] = useState()
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginClick, setLoginClick] = useState(false)

  const signIn = useSignIn()

  const loginHandler = (e) => {
    e.preventDefault()
    const AuthRequest = {
      userName: userName,
      password: password
    }

    try {
      const response = Repository.Login(AuthRequest).then((res) => {
        console.log('Login status below')
        setLoginClick(true)
        if (res.data.stat !== 'fail') {
          console.log('---------------------user ---------------------')
          console.log(res.data.token)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userid', res.data.userDetails.id)
          localStorage.setItem('catname', res.data.userDetails.catname)

          setLoginStatus(true)
          signIn({
            token: res.data,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: { username: AuthRequest.userName }
          })
          const token = localStorage.getItem('token')
          if (token) {
            window.location.replace('/admin')
          }
        } else {

          setLoginStatus(false)

        }
      })
    } catch (err) {

    }

  }


  const loginNg = {
    backgroundColor: '#cff4dde8', borderRadius: '1rem', maxWidth: '400px',
    boxShadow: '0px 0px 5px #000',
    border: '1px solid #fff',
    color: '#000'
  }
  useEffect(() => {
    

    document.body.classList.add(
      'loginBg', 'removescrol'
    );
  })
  return (<>


    <MDBContainer fluid >
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol col='12'>

          <MDBCard className='  my-5 mx-auto' style={loginNg}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h4 className="fw-bold text-uppercase">Login</h4 >
              <p className=" mb-5">Enter your username and password !</p>
              {!loginStatus && loginClick &&
                <Alert variant='danger'>
                  Login Failed
                </Alert>
              }

              <MDBInput wrapperClass=' mx-5 w-100' onChange={(e) => setUsername(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg" />
              <MDBInput wrapperClass=' mx-5 w-100' onChange={(e) => setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg" />

              <p className="small  pb-lg-2"><a href="#!">Forgot password?</a></p>
              <MDBBtn outline onClick={loginHandler} className='mx-2 px-5' style={{ color: '#000' }} color='white' size='lg'>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-1 mb-2'>
                <Icon icon={ic_facebook} className='mx-2' size={27} />

              </div>


            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  </>
  );
}




export default LoggedInPage