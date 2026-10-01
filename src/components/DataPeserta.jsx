function DataPeserta({ peserta, onHapus, onEdit}) {
  return (
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      margin: "8px",
      boxShadow: "0 2px 4px #000",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <h4 style={{ margin: "0 0 6px 0", fontSize: "18px" }}>{peserta.nama}</h4>
      <p>Jurusan: {peserta.jurusan}</p>
    </div>
    <div
      style={{ 
        display:"flex",
        gap:"8px",
        
       }}
    >
      <button onClick={() => onEdit(peserta) }>Edit</button>
      <button onClick={() => onHapus(peserta.id)}>Hapus</button>
    </div>
  </div>
  )
}

export default DataPeserta
