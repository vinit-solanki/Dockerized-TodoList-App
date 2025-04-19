import React from 'react'

function AddTask({ task, handleAddTask }) {
  const [inputTask, setInputTask] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputTask.trim()) return;
    handleAddTask(inputTask);
    setInputTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 my-8">
      <input
        type="text"
        value={inputTask}
        onChange={(e) => setInputTask(e.target.value)}
        placeholder="Add a new task..."
        className="focus:border-0 shadow-2xl shadow-gray-500 px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:border-blue-500 flex-grow"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 rounded-lg font-semibold hover:shadow-blue-500 shadow-2xl transition-smooth duration-500"
      >
        Add
      </button>
    </form>
  )
}

export default AddTask