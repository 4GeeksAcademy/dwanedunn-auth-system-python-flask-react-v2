const login = async (email, password) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.access_token);
  }
  return { data, status: response.status, ok: response.ok };
};

const signup = async (email, password) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    console.log('Signup failed:', data);
  }
};

const protectedRoute = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { ok: false, message: 'Not token found' };
  }
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/private`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    return { ok: true, data: await response.json() };
  } else {
    return { ok: false, message: 'Access denied' };
  }
  const data = await response.json();
  return { data, ok: response.ok, status: response.status };
};

const logout = () => {
  localStorage.removeItem('token');
};

export { login, signup, logout, protectedRoute };
