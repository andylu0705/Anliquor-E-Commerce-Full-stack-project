import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import Meta from "../components/Meta"
import {useDispatch,useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from "../components/Product"
import Message from '../components/Message'
import Loader from '../components/Loader'
import CategoryPaginate from '../components/CategoryPaginate'

import {listProductCategory} from '../actions/productAction'


const HomeScreen = ({match}) => {
    const category = match.params.category
    const pageNumber = match.params.pageNumber || 1


    const dispatch = useDispatch()

    useEffect(() =>{
       dispatch(listProductCategory(category,pageNumber))
    },[dispatch,category,pageNumber])
    
    const productCATEGORY = useSelector(state => state.productCATEGORY)
    const {loading, error, products,page,pages } = productCATEGORY


    return (
    <> 
  
 
    < h1 > {category}</h1> 
    {loading? <Loader/> : 
    error ? <Message variant='danger'>{error}</Message>
    
    : <>
    < Row > 
    {products.map(product => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
        </Col>
    ))}
    </Row>
    </>}
    <CategoryPaginate pages={pages} page={page} category={category}/>
    
    </>
    )}

export default HomeScreen
