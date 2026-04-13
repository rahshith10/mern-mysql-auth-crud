import { useState } from 'react';
import { registerUser } from '../api/authApi';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded">
        <h2 className="text-xl mb-4">Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="block mb-2 border p-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="block mb-2 border p-2" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="block mb-2 border p-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block mb-2 border p-2" />

        <button className="bg-blue-500 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
}