import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
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
        console.log(row.productId)
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
            </div>
            {/* <div className="container">
                {isLoading}
                {(productList.length > 0) &&
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
                            {!isLoading && productList.map((product, idx) => (
                                <tr key={product.productId}>
                                    <td>{idx + 1}</td>
                                    <td>{product.productId}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {!status.error && !isLoading && productList.length === 0 && <div>No product found.</div>}
                {status.error && <div style={{ color: 'red' }}>{status.errorMessage}</div>}
            </div> */}
        </>
    )
}

export default ProductList
