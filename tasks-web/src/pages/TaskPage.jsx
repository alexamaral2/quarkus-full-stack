import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TaskForm from "../components/TasksForm";
import TaskList from "../components/TasksList";
import { createTask, listTasks, updateTask } from "../api/tasksApi";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    try {
      setError("");
      setLoading(true);
      const data = await listTasks();
      setTasks(data);
    } catch (e) {
      setError(e.message || "Erro ao carregar tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "open") return tasks.filter((t) => !t.done);
    if (filter === "done") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  async function handleCreate(payload) {
    await createTask(payload);
    await refresh();
  }

  async function handleToggle(task) {
    await updateTask(task.id, {
      title: task.title,
      description: task.description,
      done: !task.done,
    });
    await refresh();
  }

  async function handleEdit(task) {
    const newTitle = prompt("Novo título:", task.title);
    if (newTitle == null) return;

    await updateTask(task.id, {
      title: newTitle.trim() || task.title,
      description: task.description,
      done: task.done,
    });
    await refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-10">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <div className="flex gap-4 text-sm">
            <Link to="/" className="text-slate-400 hover:text-white">
              Home
            </Link>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <TaskForm onCreate={handleCreate} disabled={loading} />

          {error && (
            <div className="mt-4 rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-red-200">
              {error}
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={refresh}
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm hover:bg-slate-900"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Atualizar"}
            </button>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-slate-300">Filtro:</span>
              <select
                className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="open">Abertas</option>
                <option value="done">Concluídas</option>
              </select>
            </div>
          </div>
        </section>

        {/* Lista */}
        <section className="mt-6">
          <TaskList
            tasks={filtered}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        </section>
      </div>
    </div>
  );
}