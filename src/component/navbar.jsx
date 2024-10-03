function Navbar() {
  return (
    <div>
      <div className="w-full flex p-4 justify-between border-b-2">
        <h1 className="text-2xl text-white font-bold">Notes</h1>
        <input
          type="text"
          placeholder="Cari catatan"
          className="border p-2 w-1/4 rounded-md"
          style={{ backgroundColor: 'rgb(26, 26, 26)' }}
        />
      </div>
    </div>
  )
}

export default Navbar
