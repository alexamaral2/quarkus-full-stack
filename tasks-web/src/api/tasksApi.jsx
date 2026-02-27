const API = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

async function request(path, options) {
  const url = `${API}${path}`;
  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Erro HTTP ${res.status}`);
  }

  return res.json();
}

export function listTasks() {
  return request("/tasks");
}

export function createTask(payload) {
  return request("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updateTask(id, payload) {
  return request(`/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}