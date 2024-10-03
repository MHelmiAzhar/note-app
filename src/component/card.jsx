export default function Card({
  id,
  title,
  body,
  archived,
  createdAt,
  onDelete,
  onArchive
}) {
  const time = createdAt.split('T')[0]

  return (
    <div className="border rounded-md mt-6 flex flex-col justify-between">
      <div className="p-4">
        <p className="font-bold text-xl">{title}</p>
        <p className="font-extralight text-xs text-gray-200 my-1">{time}</p>
        <p>{body}</p>
      </div>

      <div className="border-t grid grid-cols-2">
        <button
          className="border-r font-medium text-red-600 py-1"
          onClick={() => onDelete(id)} // Menghubungkan fungsi delete
        >
          Delete
        </button>
        <button
          className="font-medium text-yellow-300 py-1"
          onClick={() => onArchive(id)} // Menghubungkan fungsi archive
        >
          {archived ? 'Unarchive' : 'Arsipkan'}
        </button>
      </div>
    </div>
  )
}
