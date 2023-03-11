import { useState, useEffect } from 'react'
import axios from 'axios'
// import DataTable from 'react-data-table-component'
import { useParams, useNavigate } from 'react-router'
import { Button, Card } from 'react-bootstrap';
import placeholderImg from '../assets/img-product-placeholder.png'

const ProductView = () => {
    const [product, setProduct] = useState([])
    const [isLoading, setLoading] = useState(false)

    const initStatus = {
        error: false,
        errorMessage: ''
    }

    const navigate = useNavigate()
    const [status, setStatus] = useState(initStatus)
    const API_URL = process.env.REACT_APP_BACKEND_DOMAIN2
    const API_URL_PRODUCT = process.env.REACT_APP_BACKEND_DOMAIN1

    const { id } = useParams()

    const onDeleteHandler = async (pid) => {
        try {
            setLoading(true)
            const response = await axios.delete(`${API_URL_PRODUCT}`, { data: { productId: pid } })
            // console.log(response)
            if (response.status === 200) {
                setStatus(initStatus)
                navigate('/')
            } else {
                setStatus({
                    ...status,
                    error: true,
                    errorMessage: response.message
                })
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setStatus({
                error: true,
                errorMessage: error.response.data.message
            })
            setLoading(false)
        }
    }

    const getData = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: API_URL + id,
            })
            setProduct(response.data)
            // console.log(response.data)
        } catch (err) {
            // console.log('err', err)
            setStatus({
                ...status,
                error: true,
                errorMessage: err.response.data.message
            })
        }
    }

    useEffect(() => {
        setLoading(true)
        getData()
        setLoading(false)

    }, [API_URL, id])

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <div className='container'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={product.productImage ? product.productName : placeholderImg} />
                        <Card.Body>
                            <Card.Title>{product.productName}</Card.Title>
                            <Card.Text>
                                Product Id : {product.productId}<br />
                                Qty : {product.qty}
                            </Card.Text>
                            <Button variant="primary" className='m-2' onClick={() => navigate('/')}>Go Back</Button>
                            <Button variant="primary" className='m-2' onClick={() => onDeleteHandler(product.productId)}>Delete</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default ProductView
