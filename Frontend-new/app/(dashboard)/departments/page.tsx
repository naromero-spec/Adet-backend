
"use client";

import { useState, type FormEvent } from "react";
import {
  Building2,
  Plus,
  Search,
  X,
  Trash2,
  Pencil,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Department {
  department_id: number;
  department_name: string;
  location: string;
}

const initialForm = {
  department_name: "",
  location: "",
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initialForm);

  // OPEN ADD FORM
  const handleAdd = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
  };

  // OPEN EDIT FORM
  const handleEdit = (department: Department) => {
    setEditingId(department.department_id);
    setForm({
      department_name: department.department_name,
      location: department.location,
    });
    setShowForm(true);
  };

  // SAVE DEPARTMENT
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId !== null) {
      setDepartments((previous) =>
        previous.map((department) =>
          department.department_id === editingId
            ? {
                ...department,
                department_name: form.department_name,
                location: form.location,
              }
            : department
        )
      );
    } else {
      const newDepartment: Department = {
        department_id: Date.now(),
        department_name: form.department_name,
        location: form.location,
      };

      setDepartments((previous) => [
        newDepartment,
        ...previous,
      ]);
    }

    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  // DELETE DEPARTMENT
  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) return;

    setDepartments((previous) =>
      previous.filter(
        (department) => department.department_id !== id
      )
    );
  };

  // SEARCH
  const filteredDepartments = departments.filter((department) =>
    `${department.department_name} ${department.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-5rem)] space-y-7 bg-[#0B1220] p-5 md:p-8">

      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Departments
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage hospital departments and their locations.
          </p>
        </div>


        <Button
        onClick={handleAdd}
        className="
            gap-2 rounded-lg
            border border-teal-400/20
            bg-gradient-to-r from-[#0B1220] via-[#115E59] to-[#0D9488]
            text-white shadow-md shadow-teal-900/20
            transition-all duration-200
            hover:-translate-y-0.5
            hover:brightness-110
            hover:shadow-lg hover:shadow-teal-500/20
            active:scale-95
        "
        >
  <Plus size={18} />
  Add Department
</Button>

      </div>

      {/* TOTAL DEPARTMENTS */}
      <div className="rounded-xl border border-slate-700 bg-[#172337] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Total Departments
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              {departments.length}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Registered hospital departments
            </p>
          </div>

          <div className="rounded-xl bg-teal-500/10 p-4 text-teal-400">
            <Building2 size={28} />
          </div>
        </div>
      </div>

      {/* DEPARTMENT TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#172337]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 p-5">
          <div>
            <h2 className="font-semibold text-white">
              Department List
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              View and manage registered departments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Search size={18} className="text-slate-400" />
            <Input
              placeholder="Search departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 border-slate-600 bg-[#0B1220] text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="p-4">Department ID</th>
                <th className="p-4">Department Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department) => (
                  <tr
                    key={department.department_id}
                    className="border-b border-slate-700/60 hover:bg-slate-700/20"
                  >
                    <td className="p-4 text-slate-400">
                      {department.department_id}
                    </td>

                    <td className="p-4 font-medium text-white">
                      {department.department_name}
                    </td>

                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <MapPin size={15} className="text-teal-400" />
                        {department.location}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(department)}
                          className="border-teal-600/50 bg-transparent text-teal-400 hover:bg-teal-500/10 hover:text-teal-300"
                        >
                          <Pencil size={15} />
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleDelete(department.department_id)
                          }
                          className="border-red-600/50 bg-transparent text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 size={15} />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-12 text-center text-slate-500"
                  >
                    <Building2
                      size={32}
                      className="mx-auto mb-3 text-slate-600"
                    />
                    {search
                      ? "No matching departments found."
                      : "No departments available yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg rounded-2xl border border-slate-700 bg-[#172337]">

            <div className="flex items-center justify-between border-b border-slate-700 p-5">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editingId !== null
                    ? "Edit Department"
                    : "Add New Department"}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Enter department information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5 p-5">
                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Department Name *
                  </Label>
                  <Input
                    required
                    value={form.department_name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        department_name: e.target.value,
                      })
                    }
                    placeholder="e.g. Cardiology"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Location *
                  </Label>
                  <Input
                    required
                    value={form.location}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        location: e.target.value,
                      })
                    }
                    placeholder="e.g. 2nd Floor"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-700 p-5 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#0B1220] via-[#115E59] to-[#0D9488] text-white hover:brightness-110"
                >
                  {editingId !== null
                    ? "Save Changes"
                    : "Add Department"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
