import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

export function Dashboard() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    function getAllusers() {
        axios.get('http://localhost:3000/admin/getUser', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res) => {
                setUser(res.data.message)
            })
            .catch((err) => {
                console.log(err);
                navigate('/login');
            });
    }

    function deleteUser(id) {
        axios.delete(`http://localhost:3000/admin/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
                navigate('/login');
            });
    }
    
    useEffect(() => {
        axios.get('http://localhost:3000/user/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then((res) => {
            if (res.data.message.isAdmin == 0) {
                navigate('/login');
            }
        })
        .catch((err) => {
            console.log(err);
            navigate('/login');
        });

    }, [])

    getAllusers()
    return (
    <div className="mx-auto p-25">
            <div className="flex justify-end mr-5 mb-2 hover:cursor-pointer">
              <a href="/home" className="text-white bg-black p-2 rounded-md">Home</a>
            </div>
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
    <thead className="bg-gray-50">
        <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
            </th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        {user.map(item => (
            <tr key={item._id}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {item.username}
                        </div>
                        <div className="text-sm text-gray-500">
                            {item.email}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.username}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                <Link to={`/admin/update/${item._id}`}  className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                <button onClick={() => deleteUser(item._id)} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
            </td>
            </tr>
        ))}
    </tbody>
        </table>
    </div>
)}