import { useState } from "react";

export default function TaskForm({ onCreate, disabled }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await onCreate({
      title: title.trim(),
      description: description.trim(),
      done: false,
    });

    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-2">
        <label className="text-sm text-slate-300">Título</label>
        <input
          className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none focus:border-slate-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Estudar Quarkus"
          disabled={disabled}
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-slate-300">Descrição</label>
        <input
          className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none focus:border-slate-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Opcional"
          disabled={disabled}
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-950 hover:bg-slate-200 disabled:opacity-50"
        disabled={disabled}
      >
        Criar
      </button>
    </form>
  );
}