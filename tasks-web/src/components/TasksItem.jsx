export default function TaskItem({ task, onToggle, onEdit }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 flex items-start gap-4">
      <button
        onClick={() => onToggle(task)}
        className={[
          "mt-1 h-6 w-6 rounded-lg border",
          task.done
            ? "bg-emerald-400 border-emerald-300"
            : "bg-slate-950 border-slate-700 hover:border-slate-500",
        ].join(" ")}
        title="Alternar concluído"
      />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={[
              "font-semibold",
              task.done ? "line-through text-slate-400" : "text-slate-100",
            ].join(" ")}
          >
            {task.title}
          </h3>
          <span className="text-xs text-slate-500">#{task.id}</span>
        </div>

        {task.description && (
          <p className={["mt-1 text-sm", task.done ? "text-slate-500" : "text-slate-300"].join(" ")}>
            {task.description}
          </p>
        )}
      </div>

      <button
        onClick={() => onEdit(task)}
        className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm hover:bg-slate-900"
      >
        Editar
      </button>
    </div>
  );
}