import React, { useState, useEffect } from 'react'
import { products } from '../firebase'
import { addDoc, getDocs, query, where } from 'firebase/firestore'
import Edit from '../images/edit.png'
import { useNavigate } from 'react-router-dom'


function MyProducts() {
    const [myProducts, setMyProducts] = useState([])
    const [myId, setMyId] = useState(localStorage.getItem('user_id'))
    const navigate = useNavigate()

    useEffect(() => {
        const id = localStorage.getItem('user_id');
        if (id) {
            setMyId(id);
        }
    }, []);

    useEffect(() => {
        async function getProducts() {
            const querySnapshot = await getDocs(products);
            const myProducts = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().owner === myId) {

                    // push doc data and id to array
                    myProducts.push({ ...doc.data(), productId: doc.id });

                }
            });
            setMyProducts(myProducts);
        }
        if (myId) {
            getProducts();
        }
        console.log(myProducts)
    }, [myId, products]);

    function RedirecEditPage(productId) {
        navigate(`/product/${productId}`)
    }

    function RedirecProfilePage() {
        navigate(`/profile/${localStorage.getItem('user_id')}`)
    }



    return (
        <>


            <div className=''>
                <div className='md:px-16 rounded mx-auto bg-slate-50 w-fit py-4 my-8 '>
                    <h1 className='text-center font-semibold text-4xl '  >Products</h1>
                </div>
                <div className="md:px-32 py-8 w-full">
 
                    <div className='p-4 bg-white w-fit rounded-3xl my-4 hover:cursor-pointer' onClick={RedirecProfilePage}>
                        <p className='text-xl'>My profile</p>
                    </div>

                    <div className="shadow overflow-hidden rounded border-b border-gray-200">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Product name</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Price (baht)</th>
                                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">owner_id</th>
                                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">product_id</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">edit</th>

                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {myProducts.map((item, index) => (
                                    <tr key={index}>
                                        <td className="w-1/3 text-left py-3 px-4">{item.name}</td>
                                        <td className="w-1/3 text-left py-3 px-4">{item.price}</td>
                                        <td className="text-left py-3 px-4">{item.owner}</td>
                                        <td className="text-left py-3 px-4">{item.productId}</td>
                                        <td className="text-left py-3 px-4"><img className="hover:cursor-pointer" src={Edit} onClick={() => RedirecEditPage(item.productId)} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>
    )


}

export default MyProducts