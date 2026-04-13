import { useEffect, useState } from 'react';
import { getItems, createItem, deleteItem } from '../api/itemApi';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'active'
  });

  // load items
  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // handle form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // create item
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem(form);
    setForm({ title: '', description: '', status: 'active' });
    fetchItems();
  };

  // delete item
  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 mr-2" />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 mr-2" />
        
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 mr-2">
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2">Add</button>
      </form>

      {/* Items List */}
      <div>
        {items.map((item) => (
          <div key={item.id} className="border p-3 mb-2 flex justify-between">
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p>{item.description}</p>
              <span>{item.status}</span>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}