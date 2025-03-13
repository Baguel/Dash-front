import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Update() {
    let params = useParams()

    let token = localStorage.getItem('token');
    const [user, setUser] = useState({})
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [isAdmin, setIsAdmin] = useState(0)    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://dash-back-2n4t.onrender.com/admin/user/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res) => {
                setEmail(res.data.message.email);
                setUsername(res.data.message.username);
                setIsAdmin(res.data.message.isAdmin)
            })
            .catch((err) => {
                console.log(err);
                navigate('/login');
            });
    }, [])

    function updateUser(event) {
        event.preventDefault();
        axios.put(`https://dash-back-2n4t.onrender.com/admin/update/${params.id}`, {
            username,
            email,
            isAdmin,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res) => {
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
                navigate('/login');
            });
    }
    return (
        <>
            <div class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
                <div class="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="p-6 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <polyline points="16 11 18 13 22 9"></polyline>
                        </svg>
                        Modifier le profil utilisateur
                    </h2>
                    <p class="text-sm text-gray-500 mt-1">Modifiez les informations de l'utilisateur ci-dessous</p>
                    </div>
                    
                    <form class="p-6">
                    <div class="space-y-4">
                        <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={username} 
                            onChange={(e) =>(setUsername(e.target.value))}
                            required
                        />
                        </div>
                        
                        <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} onChange={(e) =>(setEmail(e.target.value))}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        </div>
                        
                        <div>
                        <label for="isAdmin" class="block text-sm font-medium text-gray-700 mb-1">Administrateur</label>
                        <select 
                            id="isAdmin" 
                            name="isAdmin"
                            value={isAdmin} onChange={(e) =>(setIsAdmin(e.target.value))}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="0">Non</option>
                            <option value="1" selected>Oui</option>
                        </select>
                        </div>
                    </div>
                    
                    <div class="mt-6 flex justify-end gap-3">
                        <a 
                        href="/dash"
                        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                        Annuler
                        </a>
                        <button 
                        onClick={updateUser}
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                        Enregistrer les modifications
                        </button>
                    </div>
                    </form>
                </div>
                </div>
        </>
    )
}