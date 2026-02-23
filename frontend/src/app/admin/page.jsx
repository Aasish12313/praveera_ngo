'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Sun, Moon } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Check login status and theme preference
  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      router.replace('/admin/dashboard');
    }

    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme === 'true') setDarkMode(true);
  }, [router]);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   if (email === 'admin@gmail.com' && password === 'admin123') {
  //     localStorage.setItem('adminLoggedIn', 'true');
  //     localStorage.setItem('adminEmail', email);
  //     router.push('/admin/dashboard');
  //   } else {
  //     setError('❌ Invalid email or password');
  //   }
  // };
const handleLogin = async (e) => {
  e.preventDefault();
  setError(''); // Clear previous error

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || '❌ Invalid credentials');
      return;
    }

    // Assume server returns a JWT token
    localStorage.setItem('adminToken', data.token); // optional
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminEmail', email);

    router.push('/admin/dashboard');
  } catch (err) {
    setError('⚠ Server error. Please try again later.');
  }
};
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative shadow-2xl rounded-xl p-8 w-full max-w-md border backdrop-blur-md transition-all duration-500 ${
          darkMode
            ? 'bg-black/40 border-gray-700'
            : 'bg-white border-purple-200'
        }`}
      >
        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-black shadow-md transition-all"
        >
          {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
        </button>

        {/* Logo + NGO Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 mb-2">
            <img
              src="/app/admin/images/bg.png"
              alt="Praveera Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className={`text-2xl font-bold text-center leading-tight ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
            Praveera Socio Culture Welfare Foundation
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300 text-center">Admin Login Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            className={`w-full px-4 py-2 border rounded-md placeholder-black focus:ring-2 outline-none transition duration-300 ${
              darkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-white focus:ring-purple-600'
                : 'bg-white border-gray-300 text-black focus:ring-purple-300'
            }`}
            required
          />

          <div className="relative">
            <motion.input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              className={`w-full px-4 py-2 border rounded-md pr-10 placeholder-black focus:ring-2 outline-none transition duration-300 ${
                darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-white focus:ring-purple-600'
                  : 'bg-white border-gray-300 text-black focus:ring-purple-300'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <motion.p
              className="text-sm text-red-500 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-md shadow-md hover:shadow-xl transition-all"
          >
            🚀 Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-center text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Praveera Socio Culture Welfare Foundation. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
