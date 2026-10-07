import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import { useState } from "react";
import AppModal from "../../components/AppModal";

const dataProducts = [
  {
    id: 1,
    name: "Espresso",
    category: "Coffee",
    status: "Active"
  },
  {
    id: 2,
    name: "Bubble Tea",
    category: "Tea",
    status: "Inactive"
  },
  {
    id: 3,
    name: "Tiramisu",
    category: "Dessert",
    status: "Active"
  },
];

const ListProduct = () => {
  const _initForm = {
    id: null,
    name: "",
    category: "",
    status: "Active",
  };
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState(dataProducts);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (product) => {
    console.log(formData.status);
    setShowModal(true);
    setIsEdit(true);
    setFormData(product);
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
      setProducts(products.map((product) => (product.id === formData.id ? formData : product)));
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
      };
      setProducts([...products, newProduct]);
      setFormData(_initForm);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      //filter: users
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Products</h4>
            </div>
            <Button variant="primary" onClick={handleOpenModal}>
              Add New Product
            </Button>
          </div>
          <Table striped responsive hover className="align-middle mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.status}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditModal(product)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit Product" : "Add New Product"} onSubmit={handleSubmit} submitLabel={isEdit ? "Save Changes" : "Save"}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product</Form.Label>
            <Form.Control value={formData.name} type="text" name="name" placeholder="Product Name" onChange={handleChange}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select value={formData.status} name="category" onChange={handleChange}>
              <option>Open this select menu</option>
              <option value="Coffee">Coffee</option>
              <option value="Tea">Tea</option>
              <option value="Dessert">Dessert</option>
            </Form.Select>
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

export default ListProduct;
