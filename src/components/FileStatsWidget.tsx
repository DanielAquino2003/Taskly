import { MoreHorizontal } from 'lucide-react'

export function FileStatsWidget() {
  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold">File Statistics</h2>
        <button className="text-zinc-400 hover:text-white transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div>
          <span className="text-4xl font-bold text-orange-500">156</span>
          <p className="text-sm text-zinc-400">Total Files</p>
        </div>
        <div>
          <span className="text-4xl font-bold text-orange-500">3</span>
          <p className="text-sm text-zinc-400">Projects</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <span className="text-2xl font-bold text-white">98</span>
          <p className="text-sm text-zinc-400">JS Files</p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <span className="text-2xl font-bold text-white">58</span>
          <p className="text-sm text-zinc-400">CSS Files</p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <span className="text-2xl font-bold text-white">12</span>
          <p className="text-sm text-zinc-400">KB Avg Size</p>
        </div>
      </div>
    </div>
  )
}

