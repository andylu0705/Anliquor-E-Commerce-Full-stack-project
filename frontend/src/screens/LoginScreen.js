import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Row,Col, Form, Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import React from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'

const LoginScreen = ({history,location}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const redirect = location.serach ? location.search.split('=')[1] :'/'
    const dispatch =useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading,error,userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler= (e) =>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading &&<Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type='email' 
                    placeholder='Enter email' value={email} 
                    onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>password</Form.Label>
                    <Form.Control type='password' 
                    placeholder='Enter password' value={password} 
                    onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='loginregister'>
                <Col>
                    New Customer? 
                    <Link to={redirect ? `/register? redirect=${redirect}` : '/register'}>
                    Register</Link>
                </Col>

            </Row>

        </FormContainer>
    )
}

export default LoginScreen
