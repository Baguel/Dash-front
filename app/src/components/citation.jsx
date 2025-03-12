import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

export function Widget({id}){
  
    const [values, setValue] = useState([]);
    var [valRef, setvalRef] = useState('');
    const [pagesName,setPaginateNumber]=useState(1)
    const [timer, setTimer] = useState(5);
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

    const cosParPage=2
    const handleClick=(event)=>{
      event.preventDefault();
      setPaginateNumber(1)
      blague(1);
    }

    const blague=async(page)=>{
        await axios.get(`https://luciferquotes.shadowdev.xyz/api/quotes/${valRef}`).then((res)=>{ 
            const values=res.data
            setValue(values)
            setPaginateNumber(page)
        }) 
    }
    
    const newblague=async(page)=>{
        const number = 1;
        await axios.get(`https://luciferquotes.shadowdev.xyz/api/quotes/${number}`).then((res)=>{ 
            const value=res.data
            setValue(value)
            setPaginateNumber(page)
        }) 
    }

    useEffect(()=>{
        blague();
        const b = setInterval(() => {
            newblague(1);
        }, timer * 1000)
        return () => { clearInterval(b) };
    }, [timer]);
   
   const startIndex = (pagesName - 1) * cosParPage;
   const endIndex = startIndex + cosParPage;
   const currentItems = values.slice(startIndex, endIndex);
  
   function alert(id) {
    axios.delete(`http://localhost:3000/user/deleteService/${id}`, {
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
                                    <h3 className="text-xl font-semibold text-gray-900">Citations</h3>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="hidden sm:inline-block">Powered by&nbsp;</span>
                                    <span className="font-medium text-indigo-600">CitationAPI</span>
                                </div>
                            </div>
                            <div>
                            <div class="text-black">
                                <form action="" >
                                    <div class="p-5">
                                        <input type="number" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" value={valRef} onChange={(e) =>(setvalRef(e.target.value))}/>
                                    </div>
                                    <div className="flex justify-end pr-5">
                                        <button className="bg-blue-500 rounded-md p-1" onClick={handleClick}>Envoyer</button>
                                    </div>
                                </form>
                                <div className="flex gap-2 mb-5 pl-5">
                                    <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Timer</p>
                                    <input className="w-24 rounded-md border p-1" type="number" name="timer" id="timer" value={timer} onChange={e => setTimer(e.target.value)}/>
                                    <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Seconds</p>
                                </div>
                            </div>

                            <div>
                            {currentItems.length > 0 ? (
                                    currentItems.map((value, index) => (
                                        <p key={index} className="text-black p-4 border-2 border-white mt-2">
                                        {value.quote}
                                        </p>
                                    ))
                                    ) : (
                                    <p className="text-gray-400 mt-2">Aucune citation</p>
                                    )}

                                    {values.length > cosParPage && (
                                    <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => setPaginateNumber((prev) => Math.max(prev - 1, 1))}
                                        disabled={pagesName === 1}
                                        className={`px-4 py-2 border rounded ${
                                        pagesName === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-indigo-500 text-white'
                                        }`}
                                    >
                                        Précédent
                                    </button>

                                    <span className="text-white">Page {pagesName}</span>

                                    <button
                                        onClick={() => setPaginateNumber((prev) => (endIndex < values.length ? prev + 1 : prev))}
                                        disabled={endIndex >= values.length}
                                        className={`px-4 py-2 border rounded ${
                                        endIndex >= values.length ? 'opacity-50 cursor-not-allowed' : 'bg-indigo-500 text-white'
                                        }`}
                                    >
                                        Suivant
                                    </button>
                                    </div>
                                )}
                            </div>
</div> 
                        </div>
                    </div>
    </div>
    </>
 );
}
