import TaskItem from "./TasksItem";

export default function TaskList({ tasks, onToggle, onEdit }) {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-slate-300">
        Sem Tasks! Crie a Primeira.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} />
      ))}
    </div>
  );
}