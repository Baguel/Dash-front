import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function CryptoPrices({id}) {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState(5);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await axios('https://api.coincap.io/v2/assets');
      setCryptos(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const b = setInterval(() => {
            fetchData()
        }, timer * 1000)
        return () => { clearInterval(b) };
  }, [timer]);

  const filteredCryptos = cryptos
    .filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

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

  return (
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
                                    <h3 className="text-xl font-semibold text-gray-900">Crypto</h3>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="hidden sm:inline-block">Powered by&nbsp;</span>
                                    <span className="font-medium text-indigo-600">CryptAPI</span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="space-y-5">
                                    <div className="relative">
                                        <div className='space-y-5'>      
                                          <input
                                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
                                            type="text"
                                            placeholder="Rechercher une crypto..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                          />

                                          <table>
                                            <thead>
                                              <tr>
                                                <th className='p-2'>Rank</th>
                                                <th className='p-2'>Name</th>
                                                <th className='p-2'>Symbol</th>
                                                <th className='p-2'>Price USD</th>
                                                <th className='p-2'>Change 24H</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {filteredCryptos.map((crypto) => (
                                                <tr className='space-x-4' key={crypto.id}>
                                                  <td className='p-2'>{crypto.rank}</td>
                                                  <td className='p-2'>{crypto.name}</td>
                                                  <td className='p-2'>{crypto.symbol}</td>
                                                  <td className='p-2'>{parseFloat(crypto.priceUsd).toFixed(2)}</td>
                                                  <td className='p-2'>{parseFloat(crypto.changePercent24Hr).toFixed(4)}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Timer</p>
                                    <input className="w-10 rounded-md border p-1" type="number" name="timer" id="timer" value={timer} onChange={e => setTimer(e.target.value)}/>                                                    
                                    <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Seconds</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
    </div>
    </>
  );
}