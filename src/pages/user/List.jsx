// import { Card, Form, Button, Table, Modal } from "react-bootstrap"; ini klo mw pake bootstrap
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { useState, useEffect } from "react";
import AppModal from "../../components/AppModal";
import api from "../../services/api.js";

// const dataUsers = [
//   {
//     id: 1,
//     name: "Reza",
//     email: "reza@abc.com",
//     status: "Active",
//     password: 123456,
//   },
//   {
//     id: 2,
//     name: "Tri",
//     email: "tri@abc.com",
//     status: "Active",
//     password: 234567,
//   },
//   {
//     id: 3,
//     name: "Inas",
//     email: "inas@abc.com",
//     status: "Active",
//     password: 345678,
//   },
// ];

const ListUser = () => {
  const _initForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    is_active: "1",
  };
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]); //supaya di awal muncul tabel kosongan
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);
  const fetchUser = async() => {
    try {
      const response = await api.get("/user")
      setUsers(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchUser()
  },[])

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (user) => {
    setShowModal(true);
    setIsEdit(true);
    setFormData(user);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_active: formData.is_active
      }
      //jika edit data
      if (isEdit) {
        await api.put(`/user/${formData.id}`, payload);
        // setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
      } else {
        await api.post("/user", payload)
        // const newUser = {
        //   ...formData,
        //   id: Date.now(),
        // };
        // setUsers([...users, newUser]);
      }
      setFormData(_initForm);
    } catch (error) {
      const errMsg= error.message
      console.log(errMsg)
    } finally {
      fetchUser()
      setShowModal(false);
    }
  };

  const handleDelete = async(id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      //filter: users
      await api.delete(`/user/${id}`)
      fetchUser()
      // setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data User</CardTitle>
          </div>
          <Button variant="primary" onClick={handleOpenModal}>
            Create New User
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {/* <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Data User</h4>
            </div>
          </div> */}
          <table striped responsive hover className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="px-6">
                    <span className={`border rounded-sm py-1 px-2 ${user.is_active === 1 ? "bg-green-600" : "bg-red-600"} text-white`}>{user.is_active === 1 ? "Active" : "Inactive"}</span>
                  </td>
                  <td className="px-4 py-6 text-right whitespace-nowrap">
                    <Button variant="warning" size="sm" className="me-2 bg-blue-500 text-white rounded-sm" onClick={() => handleEditModal(user)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="me-2 rounded-sm" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={formData.name} type="text" name="name" placeholder="Full Name" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={formData.email} type="email" name="email" placeholder="Account@mail.com" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control value={formData.password} type="password" name="password" placeholder="Enter password" onChange={handleChange}></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit User" : "Create New User"} onSubmit={handleSubmit} submitLabel={isEdit ? "Save Changes" : "Save"}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name"></Input>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email"></Input>
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required={isEdit ? false : true} placeholder="Enter your password"></Input>
          </div>
          {isEdit ? (
            <RadioGroup value={String(formData.is_active)} onValueChange={(val) => setFormData({ ...formData, is_active: parseInt(val) })} className="w-fit flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="inactive" />
                <Label htmlFor="inactive">Inactive</Label>
              </div>
            </RadioGroup>
          ) : (
            ""
          )}
        </div>
        {/* <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={formData.name} type="text" name="name" placeholder="Full Name" onChange={handleChange}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control value={formData.email} type="email" name="email" placeholder="Account@mail.com" onChange={handleChange}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control value={formData.password} type="password" name="password" placeholder="Enter password" onChange={handleChange}></Form.Control>
          </Form.Group>
        </Form> */}
      </AppModal>
    </>
  );
};

export default ListUser;
