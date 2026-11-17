
interface ModulePageProps {
  title: string;
  description: string;
  columns: string[];
}

export default function ModulePage({
  title,
  description,
  columns,
}: ModulePageProps) {
  return (
    <div className="min-h-[calc(100vh-5rem)] space-y-7 bg-[#0B1220] p-5 md:p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {description}
        </p>
      </div>

      {/* Overview Card */}
      <div className="rounded-xl border border-slate-700 bg-[#172337] p-6">
        <p className="text-sm text-slate-400">
          {title} Management
        </p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          Manage {title}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          View and organize your hospital {title.toLowerCase()} information.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#172337]">
        <div className="border-b border-slate-700 p-5">
          <h2 className="font-semibold text-white">
            {title} List
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Registered {title.toLowerCase()} records
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                {columns.map((column) => (
                  <th key={column} className="p-4 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-12 text-center text-slate-500"
                >
                  No {title.toLowerCase()} records available yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
