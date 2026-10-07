// import { Card, Form, Button, Table, Modal } from "react-bootstrap"; ini klo mw pake bootstrap
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import AppModal from "../../components/AppModal";

const dataUsers = [
  {
    id: 1,
    name: "Reza",
    email: "reza@abc.com",
    password: 123456,
  },
  {
    id: 2,
    name: "Tri",
    email: "tri@abc.com",
    password: 234567,
  },
  {
    id: 3,
    name: "Inas",
    email: "inas@abc.com",
    password: 345678,
  },
];

const ListUser = () => {
  const _initForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    status: "Active",
  };
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(dataUsers);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    //jika edit data
    if (isEdit) {
      setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
    } else {
      const newUser = {
        ...formData,
        id: Date.now(),
      };
      setUsers([...users, newUser]);
      setFormData(_initForm);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      //filter: users
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardContent className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Data User</h4>
            </div>
            <Button variant="primary" onClick={handleOpenModal}>
              Create New User
            </Button>
          </div>
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
                  <td>{user.status}</td>
                  <td className="px-4 py-6 text-right whitespace-nowrap">
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditModal(user)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(user.id)}>
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
        <h1>tes</h1>
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
