import { useEffect } from "react";
import React, { useState } from "react";
import moment from 'moment';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function NewsDateComponent({id}) {
  const [date, setDate] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
  const [timer, setTimer] = useState(5);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const b = setInterval(() => {
        setDate(moment().format('MMMM Do YYYY, h:mm:ss a'));
   }, 1000 * timer);
   return () => { clearInterval(b) };
}, [timer])
  
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

  return (
    <div className="rounded-xl bg-muted/50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-end">
            <p onClick={() => alert(id)} className="text-red-500 font-semibold hover:cursor-pointer">x</p>
        </div>
        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
          <div className="p-6 pb-2 flex flex-row items-center justify-between border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Date</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-5">
              <div className="rounded-xl bg-gray-50">
                {/* <p>{date.toDateString()}</p> */}
                <p className="text-xl font-bold">{date}</p>
              </div>
                <div className="flex justify-between gap-3 pt-2 pb-2 px-6">
                    <div className="flex gap-2">
                        <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Timer</p>
                        <input className="w-24 rounded-md border p-1" type="number" name="timer" id="timer" value={timer} onChange={e => setTimer(e.target.value)}/>                                                    <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Seconds</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
