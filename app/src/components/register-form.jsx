import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState
  
 } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email( {
    message: "This is not a valid email.",
  }),
  password: z.string().min(8, {
    message: "The password must contaid 8 character.",
  }),
})

export function RegisterForm({
  className,
  ...props
}) {

  const [error, setError] = useState('');
  const nagivate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values) {
    const username = values.username;
    const email = values.email;
    const password = values.password;
    axios.post("http://localhost:3000/auth/register", {
      username,
      email,
      password
    }).then((response) => {
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token)
        nagivate("/login");
      }
    }).catch(error => {
      if (error.status == 401) {
        setError(error.response.data.message);
      }
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-red-500 font-semibold">{error}</p>
        <Button type="submit">Submit</Button>
        <div className="flex space-x-2">
            <p>I have an account</p>
            <Link to="/login" >Login</Link>
        </div>
      </form>
    </Form>
  )
}
