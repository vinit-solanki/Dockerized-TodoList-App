import React from 'react'

function TaskList({ tasks, handleDelete, handleEdit, isEditing }) {
  const [editId, setEditId] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    handleEdit(id, editText);
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="w-full max-w-2xl space-y-3">
      {tasks && tasks.map((task) => (
        <div 
          key={task._id} 
          className="flex items-center justify-between p-4 bg-gray-800 rounded-lg group hover:bg-gray-700 transition-colors duration-200"
        >
          {editId === task._id ? (
            <div className="flex gap-2 flex-grow">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="px-3 py-1 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500 flex-grow"
              />
              <button
                onClick={() => saveEdit(task._id)}
                className="px-4 py-1 bg-green-600 rounded hover:bg-green-700 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <span className="flex-grow">{task.text}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => startEdit(task._id, task.text)}
                  className="px-4 py-1 bg-yellow-600 rounded hover:bg-yellow-700 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      {(!tasks || tasks.length === 0) && (
        <p className="text-center text-gray-400">No tasks yet. Add some tasks to get started!</p>
      )}
    </div>
  )
}

export default TaskList