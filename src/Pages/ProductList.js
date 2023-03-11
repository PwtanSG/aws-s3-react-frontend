import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
// import { useParams } from 'react-router'

const ProductList = () => {
    const [productList, setProductList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const initStatus = {
        error: false,
        errorMessage: ''
    }
    const [status, setStatus] = useState(initStatus)
    const API_URL = process.env.REACT_APP_BACKEND_DOMAIN
    const navigate = useNavigate();

    // const { id } = useParams()
    // console.log('id', id)

    const getData = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: API_URL,
            })
            setProductList(response.data.products)
            // console.log(response.data.products)
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

    }, [API_URL])

    const columns = [
        // {
        //     name: 'ID',
        //     selector: row => row._id,
        //     sortable: true,
        // },
        {
            name: 'Product Id',
            selector: row => row.productId,
            sortable: true,
        },
        {
            name: 'Product Name',
            selector: row => row.productName,
            sortable: true,
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            sortable: true,
        },
    ];

    const conditionalRowStyles = [
        {
            when: row => row.toggleSelected,
            style: {
                backgroundColor: "green",
                userSelect: "none"
            }
        }
    ];

    const handleRowClicked = row => {
        if (row.productId) {
            navigate('product/' + row.productId)
        }
        // const updatedData = productList.map(item => {
        //     if (row.productId !== item.productId) {
        //         return item;
        //     }

        //     return {
        //         ...item,
        //         toggleSelected: !item.toggleSelected
        //     };
        // });

        // setProductList(updatedData);
    };

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
                    <DataTable
                        title="Product List"
                        columns={columns}
                        data={productList}
                        defaultSortField="productName"
                        pagination
                        onRowClicked={handleRowClicked}
                        conditionalRowStyles={conditionalRowStyles}
                    />
                    {!isLoading && <Button variant="primary" onClick={() => navigate('/product/create')}>Add</Button>}
                </div>
            </div>
        </>
    )
}

export default ProductList
