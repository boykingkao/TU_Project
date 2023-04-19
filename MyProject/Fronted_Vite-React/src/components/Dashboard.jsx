import React, { useState, useEffect } from 'react'
import { products, users } from '../firebase'
import { addDoc, getDocs, query, where } from 'firebase/firestore'
import Edit from '../images/edit.png'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
    const [myProducts, setMyProducts] = useState([])
    const [allUsers, setallUsers] = useState([])
    const [myId, setMyId] = useState(localStorage.getItem('user_id'))
    const [searchProduct, setSearchProduct] = useState('')
    const [searchUser, setSearchUser] = useState('')
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

                // push doc data and id to array
                myProducts.push({ ...doc.data(), productId: doc.id });


            });
            setMyProducts(myProducts);
        }

        getProducts();


        async function getUsers() {
            const querySnapshot = await getDocs(users);
            const myUsers = [];
            querySnapshot.forEach((doc) => {

                // push doc data and id to array
                myUsers.push({ ...doc.data(), userId: doc.id });

            })

            setallUsers(myUsers);
        }

        getUsers()




    }, [myId, products]);

    function RedirecEditPage(productId) {
        navigate(`/product/${productId}`)
    }

    function RedirecProfilePage(userId) {
        navigate(`/profile/${userId}`)
    }
    function handleSearchProduct(e) {
        const search_data = e.target.value;
        setSearchProduct(search_data)

    }

    function handleSearchUser(e) {
        const search_user = e.target.value;
        setSearchUser(search_user)

    }


    return (
        <div className='pb-20'>
            <div className='md:px-16 rounded mx-auto bg-slate-50 w-fit py-4 my-8'>
                <h1 className='text-center font-semibold text-4xl '  >Dashboard</h1>
            </div>
            <div className=''>

                <div className='md:px-32 '>
                    <h1 className='font-semibold text-xl'  >Products</h1>
                </div>
                <div className="mb-3 bg-white max-w-[500px] my-8 md:mx-32">
                    <input
                        type="search"
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        id="exampleSearch"
                        placeholder="ค้นหาสินค้า"
                        onChange={handleSearchProduct}

                    />

                </div>

                <div className="md:px-32 py-4 w-full">

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
                                {myProducts
                                    .filter((product, i) =>
                                        searchProduct.toLocaleLowerCase().trim() === "" ? product :
                                            Object.values(product).some(prop =>
                                                prop.toString().toLowerCase().includes(searchProduct.toLowerCase().trim())
                                            )
                                    ).map((item, index) => (
                                        <tr key={index}>
                                            <td className="w-1/3 text-left py-3 px-4">{item.name}</td>
                                            <td className="w-1/3 text-left py-3 px-4">{item.price}</td>
                                            <td className="text-left py-3 px-4">{item.owner}</td>
                                            <td className="text-left py-3 px-4">{item.productId}</td>
                                            <td className="w-1/12 text-left py-3 px-4"><img className="hover:cursor-pointer" src={Edit} onClick={() => RedirecEditPage(item.productId)} /></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className=''>
                <div className='md:px-32 '>
                    <h1 className='font-semibold text-xl '  >Users</h1>
                </div>
                <div className="mb-3 bg-white max-w-[500px] my-8 md:mx-32">
                    <input
                        type="search"
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        id="exampleSearch"
                        placeholder="ค้นหาผู้ใช้"
                        onChange={handleSearchUser}

                    />

                </div>

                <div className="md:px-32 py-4 w-full">

                    <div className="shadow overflow-hidden rounded border-b border-gray-200">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User Type</th>
                                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">User_Id</th>
                                    <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Redirect</th>

                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {allUsers
                                    .filter((user, i) =>
                                        searchUser.toLocaleLowerCase().trim() === "" ? user :
                                            Object.values(user).some(prop =>
                                                prop.toString().toLowerCase().includes(searchUser.toLowerCase().trim())
                                            )
                                    ).map((item, index) => (
                                        <tr key={index}>
                                            <td className="w-1/3 text-left py-3 px-4">{item.name ? item.name : item.displayname_th}</td>
                                            <td className="w-1/3 text-left py-3 px-4">{item.userType}</td>
                                            <td className="text-left py-3 px-4">{item.email}</td>
                                            <td className="text-left py-3 px-4">{item.userId}</td>
                                            <td className="w-1/12 text-left py-3 px-4 "><img className="hover:cursor-pointer max-w-[36px]" src={Edit} onClick={() => RedirecProfilePage(item.userId)} /></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </div>
    )


}

export default Dashboard