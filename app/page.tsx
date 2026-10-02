import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="h-16 border-b border-[#eaeaea] flex items-center justify-between px-5 md:px-10">
        <div className="font-semibold tracking-tight flex items-center gap-2">
          <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">▲</span>
          DeployX
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-black">Dashboard</Link>
          <Link href="/new" className="text-sm bg-black text-white px-4 py-2 rounded-md">Start Deploying</Link>
        </div>
      </nav>

      <section className="min-h-[calc(100vh-64px)] grid-bg flex items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-[#ddd] rounded-full px-3 py-1.5 text-xs text-gray-600 bg-white mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"/> Deployment platform for modern teams
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-[0.98]">
            Ship your projects<br/>faster than ever.
          </h1>
          <p className="mt-6 text-gray-600 max-w-xl mx-auto text-lg">
            Import a repository, configure your project, and deploy it with a clean workflow inspired by the tools modern developers use.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/new" className="bg-black text-white px-5 py-3 rounded-md text-sm font-medium">Start Deploying</Link>
            <Link href="/dashboard" className="border border-[#ddd] px-5 py-3 rounded-md text-sm font-medium bg-white">View Dashboard</Link>
          </div>

          <div className="mt-16 mx-auto max-w-3xl card shadow-[0_20px_70px_rgba(0,0,0,0.08)] overflow-hidden text-left">
            <div className="h-10 border-b flex items-center gap-1 px-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ddd]"/><span className="w-2.5 h-2.5 rounded-full bg-[#ddd]"/><span className="w-2.5 h-2.5 rounded-full bg-[#ddd]"/>
            </div>
            <div className="p-6 font-mono text-xs md:text-sm">
              <div className="text-gray-400">$ deployx deploy</div>
              <div className="mt-3">✓ Installing dependencies...</div>
              <div>✓ Building application...</div>
              <div>✓ Optimizing assets...</div>
              <div className="text-green-600">✓ Deployment ready</div>
              <div className="mt-4 text-gray-500">https://portfolio.deployx.app</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}