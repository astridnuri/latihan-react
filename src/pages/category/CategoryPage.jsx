import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import { useState } from "react";
import AppModal from "../../components/AppModal";

const dataCategories = [
  {
    id: 1,
    name: "Coffee",
    status: "Active",
  },
  {
    id: 2,
    name: "Tea",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Dessert",
    status: "Active",
  },
];

const ListCategory = () => {
  const _initForm = {
    id: null,
    name: "",
    status: "Active",
  };
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState(dataCategories);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (category) => {
    console.log(formData.status);
    setShowModal(true);
    setIsEdit(true);
    setFormData(category);
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
      setCategories(categories.map((category) => (category.id === formData.id ? formData : category)));
    } else {
      const newCategory = {
        ...formData,
        id: Date.now(),
      };
      setCategories([...categories, newCategory]);
      setFormData(_initForm);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      //filter: users
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Categories</h4>
            </div>
            <Button variant="primary" onClick={handleOpenModal}>
              Add New Category
            </Button>
          </div>
          <Table striped responsive hover className="align-middle mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.status}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditModal(category)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(category.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit Category" : "Add New Category"} onSubmit={handleSubmit} submitLabel={isEdit ? "Save Changes" : "Save"}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control value={formData.name} type="text" name="name" placeholder="Category Name" onChange={handleChange}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={formData.status} name="status" onChange={handleChange}>
              <option>Open this select menu</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control value={formData.password} type="password" name="password" placeholder="Enter password" onChange={handleChange}></Form.Control>
          </Form.Group> */}
        </Form>
      </AppModal>
    </>
  );
};

export default ListCategory;
