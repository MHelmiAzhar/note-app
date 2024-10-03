import { useState } from 'react'
import Navbar from './component/navbar'
import Card from './component/card'
import { useEffect } from 'react'

function App() {
  const loadFromLocalStorage = () => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  }

  // State untuk menyimpan catatan, dengan nilai awal dari localStorage
  const [datas, setDatas] = useState(loadFromLocalStorage)

  // Simpan data ke localStorage setiap kali `datas` berubah
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(datas))
  }, [datas])

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addData = () => {
    const newData = {
      id: Date.now(),
      title,
      body,
      archived: false,
      createdAt: Date()
    }
    setDatas((prevData) => [...prevData, newData])
    setTitle('')
    setBody('')
  }

  const archiveData = (id) => {
    const updatedDatas = datas.map((data) =>
      data.id === id ? { ...data, archived: !data.archived } : data
    )
    setDatas(updatedDatas) // Update state dengan data yang sudah diarsipkan/unarsipkan
  }

  // Fungsi untuk menghapus data
  const deleteData = (id) => {
    const updatedDatas = datas.filter((data) => data.id !== id)
    setDatas(updatedDatas) // Update state tanpa data yang dihapus
  }

  // Pisahkan data yang diarsipkan dan data aktif
  const activeNotes = datas.filter((data) => !data.archived)
  const archivedNotes = datas.filter((data) => data.archived)
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-3 text-white text-center px-4">
        <div className="lg:col-start-2">
          <p className="pt-10 mb-6 text-2xl font-semibold">Buat Catatan</p>
          <input
            type="text"
            placeholder="Ini adalah catatan ..."
            className="border p-2 w-full rounded-md font-medium text-sm"
            style={{ backgroundColor: 'rgb(26, 26, 26)' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Tuliskan catatanmu disini ..."
            className="border p-2 mt-4 w-full h-48 rounded-md font-medium text-sm"
            style={{ backgroundColor: 'rgb(26, 26, 26)' }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            className="border p-2 mt-4 w-full rounded-md"
            onClick={addData}
          >
            Buat
          </button>
        </div>
      </div>
      {/* Catatan Aktif */}
      <div className="grid grid-cols-6 text-white mt-6">
        <h3 className="col-start-2 text-2xl font-semibold">Catatan Aktif</h3>
      </div>
      <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 lg:px-64">
        {activeNotes.length > 0 ? (
          activeNotes.map((data) => (
            <Card
              key={data.id}
              id={data.id}
              title={data.title}
              body={data.body}
              archived={data.archived}
              createdAt={data.createdAt}
              onDelete={deleteData} // Kirim fungsi delete
              onArchive={archiveData} // Kirim fungsi archive
            />
          ))
        ) : (
          <p className="col-span-4 text-center">Tidak ada catatan aktif</p>
        )}
      </div>

      {/* Catatan Arsip */}
      <div className="grid grid-cols-6 text-white mt-6">
        <h3 className="col-start-2 text-2xl font-semibold">Catatan Arsip</h3>
      </div>
      <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 lg:px-64">
        {archivedNotes.length > 0 ? (
          archivedNotes.map((data) => (
            <Card
              key={data.id}
              id={data.id}
              title={data.title}
              body={data.body}
              archived={data.archived}
              createdAt={data.createdAt}
              onDelete={deleteData} // Kirim fungsi delete
              onArchive={archiveData} // Kirim fungsi archive
            />
          ))
        ) : (
          <p className="col-span-4 text-center">
            Tidak ada catatan yang diarsipkan
          </p>
        )}
      </div>
    </>
  )
}

export default App
