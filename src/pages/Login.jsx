import { useState } from "react";
// import {Form, Button, Container, Card} from "react-bootstrap" dikomen karena ini dipakai kalau mau pakai react bootstrap
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Car } from "lucide-react";
import Capybara from "@/assets/capybara.jpg";

export default function Login() {
  const navigate = useNavigate();
  const _initialForm = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(_initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    //prev: params ambil data sebelum ini
    console.log(`input change ${e.target.name} = ${e.target.value}`);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async(e) => {
    e.preventDefault(); //mencegah aksi bawaan yaitu mengsubmit
    setIsLoading(true);

    try{
      const res = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST", //dari postman
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
      })
      console.log(res)
      const result = await res.json()
      if(!res.ok){
        throw new Error(result.message || 'Please check your email and password')
      }
      localStorage.setItem("", result.data.token)
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch(error) {
      console.log(error.message)
      setErrorMsg(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-start justify-center rounded-sm shadow">
              <img src={Capybara} alt="capybara" className="rounded-md" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">PPKD Jakarta Pusat</h1>
            <p className="text-sm text-muted">Point of Sales</p>
          </div>
          <Card className="shadow-lg border-border py-8 px-5  rounded-xl">
            <CardHeader className="space-y-1 pb-4 mb-4">
              <CardTitle className="text-lg font-semibold">Sign in Your Account</CardTitle>
              <CardDescription> Enter your credentials</CardDescription>
              {errorMsg && <p className="text-red-700 font-bold">{errorMsg}</p>}
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 mb-4">
                <div className="space-y-s ">
                  <Label>Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required autofocus border></Input>
                </div>
                <div className="space-y-s">
                  <Label>Password</Label>
                  <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required className="border-2 border-solid"></Input>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pt-3">
                <Button type="submit" className="w-full rounded-lg">
                  Sign in
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      {/* di bawah ini adalah kalau pake react bootstrap */}
      {/* <Container className="d-flex align-items-center justify-content-center min-vh-100">
          <div className="w-100 d-flex align-items-center justify-content-center">
            <Card className="shadow" style={{ width: "400px" }}>
              <Card.Body className="p-4">
                <h2 className="font-weight-bold text-center mb-4">Login Form</h2>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={formData.email} name="email" onChange={handleChange} type="email" required></Form.Control>
                  </Form.Group>
                  SSO
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={formData.password} name="password" onChange={handleChange} type="password" required></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit" className="w-100" onClick={handleLogin}>
                      {isLoading ? "Loading..." : "Sign In"}
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container> */}
    </>
  );
}
