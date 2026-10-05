import { useState, useEffect } from "react";

const FormPeserta = ({ onSimpan, onCancel, pesertaEdit }) => {
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [error, setError] = useState("");

  //useEffect hasil request dari server mghasilkn sbuah data, dirender cuma 1x (tdk ada perubahan)
  //useEffect bentukny arrow function

  useEffect(() => {
    if (pesertaEdit) {
      setNama(pesertaEdit.nama);
      setJurusan(pesertaEdit.jurusan);
    } else {
      //tambah
      setNama("");
      setJurusan("");
    }
  }, [pesertaEdit]);

  const handleSimpan = (e) => {
    e.preventDefault();
    if (!nama.trim() || !jurusan.trim()) {
      setError("Mohon isi nama & jurusan");
      alert("Mohon isi nama & jurusan");
      return;
    }
    //jika dia edit
    //jika dia tambah
    onSimpan({
      id: pesertaEdit ? pesertaEdit.id : Date.now(),
      nama, //maxutnya nama: nama;
      jurusan,
    });
    setNama("");
    setJurusan("");
  };

  return (
    <form
      onSubmit={handleSimpan}
      method="post"
      style={{
        background: "#f5f6f8",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h3>Tambah Peserta</h3>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Nama Peserta"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={{
            padding: "8px",
          }}
        />
        <input
          type="text"
          placeholder="Jurusan"
          value={jurusan}
          onChange={(e) => setJurusan(e.target.value)}
          style={{
            padding: "8px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#291af7",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            padding: "8px 16px",
          }}
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default FormPeserta;
