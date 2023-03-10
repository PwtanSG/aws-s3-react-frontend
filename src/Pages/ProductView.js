import { useState, useEffect } from 'react'
import axios from 'axios'
// import DataTable from 'react-data-table-component'
import { useParams, useNavigate } from 'react-router'
import { Button } from 'react-bootstrap';

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

    const { id } = useParams()

    const getData = async () => {
        try {
            console.log(API_URL)
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
            {/* <div className='container'>
                <DataTable
                    title="Product List"
                    columns={columns}
                    data={productList}
                    defaultSortField="productName"
                    pagination
                    onRowClicked={handleRowClicked}
                    conditionalRowStyles={conditionalRowStyles}
                />
            </div> */}
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.qty}</td>
                        </tr>
                    </tbody>
                </table>
                <Button className='pl-5 pr-5' onClick={() => navigate('/')}>Back</Button>
            </div>
        </>
    )
}

export default ProductView
