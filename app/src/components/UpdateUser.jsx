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
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function UserUpdate() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [errors, setErrors] = useState("")
  const [old, setOld] = useState("")
  const [newpass, setNewpass] = useState("")
  const [confirmpass, setConfirm] = useState("")
  const navigate = useNavigate();

  let token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`https://dash-back-2n4t.onrender.com/user/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then((res) => {
            setEmail(res.data.message.email);
            setUsername(res.data.message.username);
        })
        .catch((err) => {
            console.log(err);
            navigate('/login');
        });
}, [])

function updateUser(e) {
  e.preventDefault();
  axios.put(`https://dash-back-2n4t.onrender.com/user/update`,{
    username,
    email,
    password,
  }, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
    })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
      setError(err.response.data.message);
    });
}

function updateUserPass(e) {
  e.preventDefault();
  axios.put(`https://dash-back-2n4t.onrender.com/user/update/pass`,{
    old: old,
    newpass: newpass,
    confirmpass: confirmpass,
  }, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
    })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
      setErrors(err.response.data.message);
    });
}
    return (
        <>
          <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator orientation="vertical" className="mr-2 h-4" />
                    </div>
                  </header>
                  <div class="mt-5 md:mt-0 md:flex-grow">
                    <div class="bg-white shadow rounded-lg overflow-hidden">
                      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                          <h2 class="text-lg font-medium text-gray-900">Modifier l'utilisateur</h2>
                          <a href="/home"class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Retour à la liste
                          </a>
                        </div>
                      </div>

                      <form class="p-6" onSubmit={updateUser}>
                        <div class="space-y-6">
                          <div>
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
                            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                              <div class="sm:col-span-3">
                                <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                                <div class="mt-1">
                                  <input type="text" name="username" id="username" value={username}  onChange={(e) =>(setUsername(e.target.value))} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" require />
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <div class="mt-1">
                                  <input type="email" name="email" id="email" value={email}  onChange={(e) =>(setEmail(e.target.value))} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" require />
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <label for="email" class="block text-sm font-medium text-gray-700">Password</label>
                                <div class="mt-1">
                                  <input type="password" name="password" id="password" value={password}  onChange={(e) =>(setPassword(e.target.value))} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" require />
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        {error && (
                          <p className="mt-5 text-red-500 font-semibold">{error}</p>
                        )}
                        <div class="pt-5 mt-6 border-t border-gray-200">
                          <div class="flex justify-end">
                            <a href="/home" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Annuler
                            </a>
                            <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      </form>

                      <form class="p-6" onSubmit={updateUserPass}>
                        <div class="space-y-6">
                          <div>
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Changer son mot de passe</h3>
                            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                              <div class="sm:col-span-3">
                                <label for="username" class="block text-sm font-medium text-gray-700">Old password</label>
                                <div class="mt-1">
                                  <input type="password" name="old" id="old" value={old}  onChange={(e) =>(setOld(e.target.value))} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <label for="email" class="block text-sm font-medium text-gray-700">New password</label>
                                <div class="mt-1">
                                  <input type="password" name="newpass" id="newpass" value={newpass}  onChange={(e) =>(setNewpass(e.target.value))} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <label for="email" class="block text-sm font-medium text-gray-700">Confirm password</label>
                                <div class="mt-1">
                                  <input type="password" name="confirm" id="confirm" value={confirmpass}  onChange={(e) =>(setConfirm(e.target.value))} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        {errors && (
                          <p className="mt-5 text-red-500 font-semibold">{errors}</p>
                        )}
                        <div class="pt-5 mt-6 border-t border-gray-200">
                          <div class="flex justify-end">
                            <a href="/home" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Annuler
                            </a>
                            <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  </SidebarInset>
              </SidebarProvider>
        </>
    )
}