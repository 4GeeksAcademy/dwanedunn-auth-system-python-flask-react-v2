const login = async (email, password) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.access_token);
  }
  return { data, status: response.status, ok: response.ok };
};

export { login };
