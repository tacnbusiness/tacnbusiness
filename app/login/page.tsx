export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-md p-8 bg-[var(--secondary)] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[var(--foreground)] mb-6">
          Welcome Back
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-[var(--background)] text-[var(--foreground)] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-[var(--background)] text-[var(--foreground)] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <button
            type="submit"
            className="w-full py-2 bg-[var(--primary)] text-white rounded hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Forgot your password? <a href="#" className="text-[var(--accent)] hover:underline">Reset it</a>
        </p>
      </div>
    </div>
  );
}
