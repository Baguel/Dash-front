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

import { Chucks } from '@/components/chuckNorris';
import { WeatherLocation } from "./components/weatherdefault";
import { WeatherWidget } from "./components/weather";
import {  Widget } from "./components/citation";
import { Deux } from "./components/foodAPi";
import { CryptoPrices } from "./components/cryptoprices";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dog } from "./components/DogApi";
import { Film } from "./components/filmAPi";
import { Undraw } from "./components/Undraw";
import { Postit } from "./components/Postit";
import { NewsDateComponent } from "./components/personal";

export default function Index() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(0);
  const [service, setService] = useState([]);


  function getUserService() {
    axios.get('https://dash-back-2n4t.onrender.com/user/myService', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      setService(res.data.message)
    })
    .catch((err) => {
        console.log(err);
    });
  }

  function logoutUser() {
    localStorage.removeItem("token");
    navigate('/login');
  }

  useEffect(() => {
    if (token) {
      axios.get('https://dash-back-2n4t.onrender.com/user/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
         setUser(res.data.message.isAdmin);
      })
      .catch((err) => {
          navigate('/login');
      });
    } else {
      navigate('/login');
    }

    getUserService()
  }, [])

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
        <div className="flex justify-end mr-5 mb-2 space-x-8">
        <button onClick={logoutUser} className="text-white bg-black p-2 rounded-md hover:cursor-pointer">Logout</button>
          {user == 1 && (
                <a href="/dash" className="text-white bg-black p-2 rounded-md hover:cursor-pointer">Dashboard</a>
          )}
        </div>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="items-start grid auto-rows-min gap-4 md:grid-cols-3">
          {service.map(item => (
            <div className="group" key={item._id}>
              {item.service_id.name  == "Realtime Meteo" && (
                <WeatherWidget id={item._id} />
              )}
              {item.service_id.name  == "Local Meteo" && (
                <WeatherLocation id={item._id}/>
              )}
              {item.service_id.name  == "Citations" && (
                <Widget id={item._id} />
              )}
              {item.service_id.name  == "ChuckNorris Jokes" && (
                <Chucks id={item._id} />
              )}
              {item.service_id.name  == "food" && (
                <Deux id={item._id} />
              )}
              {item.service_id.name  == "crypto" && (
                <CryptoPrices id={item._id} />
              )}
              {item.service_id.name  == "dog" && (
                <Dog id={item._id} />
              )}
              {item.service_id.name  == "Film" && (
                <Film id={item._id} />
              )}
              {item.service_id.name  == "Undraw" && (
                <Undraw id={item._id} />
              )}
              {item.service_id.name  == "Postit" && (
                <Postit id={item._id} />
              )}
              {item.service_id.name  == "Date" && (
                <NewsDateComponent id={item._id} />
              )}
            </div>
          ))}
            </div>
        </div>
        </SidebarInset>
    </SidebarProvider>
  )
}
