import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Bem-vindo</h1>
        <p className="mt-4 text-slate-400">
          Projeto Fullstack Quarkus + React
        </p>

        <Link
          to="/tasks"
          className="inline-block mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-200"
        >
          Ir para Tasks
        </Link>
      </div>
    </div>
  );
}