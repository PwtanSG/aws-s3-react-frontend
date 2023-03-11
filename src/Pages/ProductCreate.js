import { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProductCreate = () => {
    const initFormData = {
        productId: '',
        productName: '',
        qty: 0,
    }
    const [formData, setFormData] = useState(initFormData)

    const initStatus = {
        error: false,
        errorMessage: ''
    }
    const [status, setStatus] = useState(initStatus)

    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_BACKEND_DOMAIN1

    const onChangeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        })
        )
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            console.log(API_URL)
            setLoading(true)
            const response = await axios.post(`${API_URL}`, formData)
            if (response.status === 200) {
                setStatus(initStatus)
                setFormData(initFormData)
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

                    <section className='heading'>
                        <h1>Add New Product</h1>
                    </section>
                    <section className='form'>
                        <form onSubmit={onSubmitHandler}>
                            <div className='form-group m-2'>
                                <input
                                    type='text'
                                    id='productId'
                                    name='productId'
                                    value={formData.productId}
                                    placeholder='Enter product Id'
                                    onChange={onChangeHandler}
                                ></input>
                            </div>
                            <div className='form-group m-2'>
                                <input
                                    type='text'
                                    id='productName'
                                    name='productName'
                                    value={formData.productName}
                                    placeholder='Enter product name'
                                    onChange={onChangeHandler}
                                ></input>
                            </div>
                            <div className='form-group m-2'>
                                <input
                                    type='number'
                                    id='qty'
                                    name='qty'
                                    value={formData.qty}
                                    placeholder='Enter quantity'
                                    onChange={onChangeHandler}
                                ></input>
                            </div>
                            <Button type='submit' className='primary m-2'>Submit</Button>
                            <Button variant='primary' onClick={() => navigate('/')}>Go Back</Button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ProductCreate
