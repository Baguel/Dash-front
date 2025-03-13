import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get('https://dash-back-2n4t.onrender.com/user/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
        navigate('/login');
      });
    getServices()
  }, [])

  function getServices() {
    axios.get('https://dash-back-2n4t.onrender.com/user/service', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  };

  function notify(message) {
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const addtodash = (id) => {
    axios.post(`https://dash-back-2n4t.onrender.com/user/addService/${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.data.message == "Service Add to the Dash") {
        notify('Service add successfully')
        navigate('/home')
      }
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator orientation="vertical" className="mr-2 h-4" />
                    </div>
                  </header>
                  <div className='bg-gray-50 min-h-screen p-6 md:p-12'>
                    <ToastContainer />
                    <div className="max-w-7xl mx-auto">
                      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Modules d'Applications</h1>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {data.map(item => (
                          <div onClick={() => addtodash(item._id)} className="group" key={item._id}>
                            <div className="bg-white rounded-xl shadow-elegant p-6 flex items-center justify-center transition-all duration-300 group-hover:shadow-hover group-hover:-translate-y-1 cursor-pointer">
                              <div className="w-18 h-18 rounded-md bg-center bg-cover">
                                <img className='rounded-md' src={"https://dash-back-2n4t.onrender.com/" + item.picture} alt="fokfoskfosko" />
                              </div>
                            </div>
                            <p className="mt-3 text-center text-sm font-medium text-gray-700">{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  </SidebarInset>
              </SidebarProvider>
  )
}

export default Home
