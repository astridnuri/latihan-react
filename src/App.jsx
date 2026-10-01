import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import { Peserta } from "./components/Peserta";
import "./App.css";
import DataPeserta from "./components/DataPeserta";
import FormPeserta from "./components/FormPeserta";

function App() {
  //destruct
  // const siswa = {
  //   name: "Reza",
  //   nilai:50
  // }

  // const {name, nilai} siswa
  // console.log(name)
  // console.log(nilai)

  const [listPeserta, setListPeserta] = useState(Peserta);
  const [editPeserta, setEditPeserta] = useState(null);
  //const listPeserta = Peserta

  const handleSubmit = (dataForm) => {
    if (editPeserta) {
      setListPeserta(listPeserta.map((item) => (item.id === dataForm.id ? dataForm : item)));
      setEditPeserta(null);
    } else {
      setListPeserta([...listPeserta, dataForm]);
    }
  };

  const handleHapus = (id) => {
    setListPeserta(listPeserta.filter((item) => item.id !== id));
    if (id === editPeserta.id) {
      setEditPeserta(null);
    }
  };
  // //mengubah data jd dinamis dgn aksi
  // //getter, setter: count, setCount

  // //1 function component & class component. yg lbh sering dipake function component
  // function Peserta({nama, kelas, nilai}) {
  //   return (
  //     <div style={{ border: "1px solid #ccc", padding: "13px", borderRadius:"8px", margin:"8px"
  //      }}>
  //       <h3>{nama}</h3>
  //       <p>{kelas}</p>
  //       <p>{nilai}</p>
  //     </div>
  //   )
  // }

  //props: property
  // return (
  //   <>
  //     <Peserta nama="Wawan" kelas="Web Programming" nilai= "90" />
  //     <Peserta nama="Budi" kelas="Tekom" />
  //     <Peserta nama="Ratna" kelas="TKJ" />

  //     <p>Total data: {count}</p>
  //     <button onClick={()=> setCount(count+1)}>Tambah</button>
  //     <button onClick={()=> setCount(count-1)}>Kurang</button>
  //   </>
  // )
  return (
    <>
      <FormPeserta onSimpan={handleSubmit} pesertaEdit={editPeserta} />
      {/* {pake looping map} */}
      {listPeserta.map((item) => (
        <DataPeserta key={item.id} peserta={item} onEdit={setEditPeserta} onHapus={handleHapus} />
      ))}
      {/* listPeserta.map((item) => {

    <DataPeserta key={item.id} nama={item.nama} jurusan={item.jurusan} />
    }) */}
    </>
  );
}

export default App;
