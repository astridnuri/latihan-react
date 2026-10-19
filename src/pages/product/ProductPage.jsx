import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import AppModal from "../../components/AppModal";
import api from "../../services/api.js";

// const dataProducts = [
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

const ListProduct = () => {
  const _initForm = {
    id: null,
    category_id:"",
    name: "",
    price: "",
    stock: "",
    description: "",
    is_active: "1",
  };
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]); //supaya di awal muncul tabel kosongan
  const [categories, setCategories] = useState([]); //sebut tabel apa aja yg mw dipake
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product"); //samain ama nama backend
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCategories = async() => {
    try {
      const response = await api.get("/category")
      console.log(response)
      setCategories(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories()
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (product) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        category_id: formData.category_id,
        price: formData.price,
        description: formData.description,
        stock: formData.stock,
        is_active: parseInt(formData.is_active)
      };
      //jika edit data
      if (isEdit) {
        await api.put(`/product/${formData.id}`, payload);
        // setProducts(products.map((product) => (product.id === formData.id ? formData : product)));
      } else {
        await api.post("/product", payload);
        // const newProduct = {
        //   ...formData,
        //   id: Date.now(),
        // };
        // setProducts([...products, newProduct]);
      }
      setFormData(_initForm);
      fetchProducts();
    } catch (error) {
      const errMsg = error.message;
      console.log(errMsg);
    } finally {
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      //filter: products
      await api.delete(`/product/${id}`);
      fetchProducts();
      // setProducts(products.filter((u) => u.id !== id));
    }
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Product</CardTitle>
          </div>
          <Button variant="primary" onClick={handleOpenModal}>
            Create New Product
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {/* <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Data Product</h4>
            </div>
          </div> */}
          <table striped responsive hover className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category_name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`border rounded-sm px-2 py-1 ${product.is_active === 1 ? "bg-green-600":"bg-red-600"} text-white`}>{product.is_active ===1 ?"Active":"Inactive"}</span>
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap">
                    <Button variant="warning" size="sm" className="me-2 bg-blue-500 text-white rounded-sm" onClick={() => handleEditModal(product)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="me-2 rounded-sm" onClick={() => handleDelete(product.id)}>
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
          <Modal.Title>Add New Product</Modal.Title>
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

      <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit Product" : "Create New Product"} onSubmit={handleSubmit} submitLabel={isEdit ? "Save Changes" : "Save"}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select id="name" type="text" name="name" value={formData.category_id} onValueChange={(val)=> setFormData({...formData, category_id:val})} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter product name"></Input>
          </div>
          <div className="space-y-2">
            <Label>Price</Label>
            <Input id="price" type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="Enter product price"></Input>
          </div>
          <div className="space-y-2">
            <Label>Stock</Label>
            <Input id="stock" type="number" name="stock" value={formData.stock} onChange={handleChange} required placeholder="Enter product stock"></Input>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input id="description" type="text" name="description" value={formData.description} onChange={handleChange} required placeholder="Enter description"></Input>
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

export default ListProduct;
