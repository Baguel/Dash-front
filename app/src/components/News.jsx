import { useEffect, useState } from "react";
import axios from "axios";

export function New() {
    const [news, setNews] = useState([]);
    const [categorie, setCategorie] = useState('');
    const [timer, setTimer] = useState(5);

    function getNews() {
        axios.get("https://newsapi.org/v2/everything?domains=wsj.com&apiKey=9680738f46394fb49ca7f25d2a49194a").then((response) => {
            setNews(response.data.articles)
            console.log(response.data.articles)
        }).catch((error) => {
            console.log(error)
        })
    }

    function submit(event) {
        event.preventDefault();
        axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=9680738f46394fb49ca7f25d2a49194a`).then((response) => {
            setNews(response.data.articles)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        const b = setInterval(() => {
            getNews();
       }, 1000 * timer);
       return () => { clearInterval(b) };
    }, [timer])

  return (
    <div className="aspect-video rounded-xl bg-muted/50">
                    <div className="max-w-2xl mx-auto p-4">
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
                                    <h3 className="text-xl font-semibold text-gray-900">News</h3>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="hidden sm:inline-block">Powered by&nbsp;</span>
                                    <span className="font-medium text-indigo-600">NewsAPi</span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="space-y-5">
                                    <div className="relative">
                                        <form>
                                            <label for="countries" className="block mb-2 text-sm font-medium text-gray-700">Search Anything that you want</label>
                                            <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" />
                                            <div className="flex justify-between gap-3 pt-2 pb-2 px-6">
                                                <div className="flex gap-2">
                                                    <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Timer</p>
                                                    <input className="w-24 rounded-md border p-1" type="number" name="timer" id="timer" value={timer} onChange={e => setTimer(e.target.value)}/>                                                    <p className="my-auto block mb-2 text-sm font-medium text-gray-700">Seconds</p>
                                                </div>
                                                <button class="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-xl transition-all">
                                                    Search
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="rounded-xl bg-gray-50">
                                        {news.map((item) => (
                                            <p key={item.author} className="text-gray-700 leading-relaxed">
                                                {item.author}
                                            </p>     
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
    </div>
  )
}
