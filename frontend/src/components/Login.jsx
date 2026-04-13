import { useState } from 'react';
import { loginUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');

    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded">
        <h2 className="text-xl mb-4">Login</h2>

        <input name="email" placeholder="Email" onChange={handleChange} className="block mb-2 border p-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block mb-2 border p-2" />

        <button className="bg-green-500 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
}