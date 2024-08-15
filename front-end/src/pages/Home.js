import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSucess } from '../utils';

const Home = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoggedUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');

    handleSucess('Logout Successfully')
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  const fetchProducts = async () => {
    try {
      const url = "https://gov-project-api.vercel.app/products";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
      console.log(result);
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div>
      <div className='flex justify-center w-95'>
        <h1 className='text-xl font-bold first_capital'>Welcome {loggedUser}</h1>
      </div>
      <div className='flex justify-center'><table>
        {
          products.map((item,index) => 
            <>
                <tr key={index}>
                  <td>{index} : {item.name}</td>
                  <td>{item.price}</td>
                </tr> 
            </>
          )
        }
        </table>
      </div>
      <div className='flex justify-center'>
        <button className='bg-sky-500 p-2 text-white text-lg rounded-lg w-80 mt-5 mb-2' onClick={handleLogout}>Logout</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
