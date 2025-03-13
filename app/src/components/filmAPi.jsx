import axios from "axios"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Film({id}){

  var [valRef, setvalRef] = useState('');
  const [timer, setTimer] = useState(5);
  const [year, setYear] = useState("");
  const [value, setValue] = useState({});
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handelSubmit=(event)=>{
    event.preventDefault()
    plat()
  }

    var plat=async()=>{
        await axios.get(`http://www.omdbapi.com/?t=${valRef}&y=${year}&plot=full&apikey=f40a6c21`).then((res)=>{ 
            setValue(res.data)
        })
    }

    function alert(id) {
        axios.delete(`https://dash-back-2n4t.onrender.com/user/deleteService/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then((res) => {
             navigate("/home")
          })
          .catch((err) => {
              console.log(err)
          });
    }
    
return(
    
     <>
        <div className="aspect-video rounded-xl bg-muted/50">
                    <div className="max-w-2xl mx-auto p-4">
                        <div className="flex justify-end">
                            <p onClick={() => alert(id)} className="text-red-500 font-semibold hover:cursor-pointer">x</p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"> 
                            <div className="p-6 pb-2 flex flex-row items-center justify-between border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                            <line x1="9" y1="9" x2="9.01" y2="9" />
                                            <line x1="15" y1="9" x2="15.01" y2="9" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">FilmApi</h3>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="hidden sm:inline-block">Powered by&nbsp;</span>
                                    <span className="font-medium text-indigo-600">FilmApi</span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="space-y-5">
                                    <div className="relative">
                                        <form onSubmit={handelSubmit} >
                                            <div className="flex gap-6">
                                                <div>
                                                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-700">Search By Letters</label>
                                                    <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" onChange={(e)=>(setvalRef(e.target.value))} />
                                                </div>
                                                <div>
                                                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-700">Year</label>
                                                    <input type="number" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" onChange={(e)=>(setYear(e.target.value))} />
                                                </div>
                                            </div>
                                            <div className="flex justify-between gap-3 pt-2 pb-2 px-6"> 
                                                <button class="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-xl transition-all">
                                                    Search
                                                </button>
                                            </div>
                                        </form>
                                        <div>
                                            { (!value) ?(
                                            <p class="text-red-200">Le plat n'existe pas</p>
                                            ):(
                                                <div class="flex items-center justify-center">
                                                    <div>
                                                        <p className="text-black">Title: {value.Title}</p>
                                                        <p className="text-black">Description: {value.Plot}</p>
                                                        <div className="flex items-center justify-center">
                                                            <img className="max-w-50 bg-center bg-cover" src={value.Poster}/></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
    </div>
     </>
)
}