  "use client";

import { useEffect, useState } from "react";
import {
  BedDouble,
  Plus,
  Search,
  Trash2,
  X,
  CheckCircle,
  Clock,
  DoorOpen,
} from "lucide-react";

import { apiClient } from "@/lib/api";

interface room {
  room_id: number;
  room_number: string;
  room_type: string;
  status: string;
  daily_rate: number;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    const fetchRooms = async () => {
      try {
        const data = await apiClient<room[]>("/room", {
          method: "GET",
          requiresAuth: true,
        });

        if (active) {
          setRooms(data);
          setError("");
        }
      } catch (err: unknown) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load rooms. Please check your connection."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchRooms();
    return () => {
      active = false;
    };
  }, []);

  // ADD ROOM
 
const handleAddRoom = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!roomNumber.trim()) {
    setError("Please enter a room number.");
    return;
  }

  try {
    setError("");
    setSuccess("");

    const newRoom = await apiClient<room>("/room", {
      method: "POST",
      requiresAuth: false,
      body: JSON.stringify({
        room_number: roomNumber.trim(),
        room_type: "General",
        status: "Available",
        daily_rate: 0,
      }),
    });

    setRooms((previous) => [newRoom, ...previous]);

    setRoomNumber("");
    setShowForm(false);
    setSuccess("Room added successfully!");

  } catch (err: unknown) {
    setError(
      err instanceof Error
        ? err.message
        : "Failed to add room. Please try again."
    );
  }
};

  // DELETE ROOM
  const handleDeleteRoom = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await apiClient(`/room/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      });

      setRooms((previous) =>
        previous.filter((room) => room.room_id !== id)
      );

      setSuccess("Room deleted successfully!");

    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete room."
      );
    }
  };

  // SEARCH
  const filteredRooms = rooms.filter((room) =>
    `${room.room_number} ${room.room_type} ${room.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // SUMMARY
  const totalRooms = rooms.length;

  const availableRooms = rooms.filter(
    (room) => room.status?.toLowerCase() === "available"
  ).length;

  const occupiedRooms = rooms.filter(
    (room) => room.status?.toLowerCase() === "occupied"
  ).length;

  return (
    <div className="min-h-screen bg-[#0B1220] p-6 text-white">

      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold">Rooms</h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage and monitor hospital rooms.
          </p>
        </div>

        <button
          onClick={() => {
            setError("");
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B1220] via-[#115E59] to-[#0D9488] px-5 py-3 font-semibold transition hover:opacity-90"
        >
          <Plus size={19} />
          Add Room
        </button>

      </div>

      {/* MESSAGES */}
      {error && (
        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-lg border border-teal-500/30 bg-teal-500/10 p-3 text-sm text-teal-400">
          {success}
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-700 bg-[#172337] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Rooms</p>
              <h2 className="mt-2 text-3xl font-bold">{totalRooms}</h2>
            </div>
            <div className="rounded-xl bg-teal-500/10 p-4 text-teal-400">
              <BedDouble size={27} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-[#172337] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Available Rooms</p>
              <h2 className="mt-2 text-3xl font-bold">{availableRooms}</h2>
            </div>
            <div className="rounded-xl bg-teal-500/10 p-4 text-teal-400">
              <CheckCircle size={27} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-[#172337] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Occupied Rooms</p>
              <h2 className="mt-2 text-3xl font-bold">{occupiedRooms}</h2>
            </div>
            <div className="rounded-xl bg-teal-500/10 p-4 text-teal-400">
              <Clock size={27} />
            </div>
          </div>
        </div>

      </div>

      {/* ROOM TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#172337]">

        {/* TABLE HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-700 p-6 md:flex-row md:items-center">

          <div>
            <h2 className="text-lg font-bold">Room List</h2>
            <p className="mt-1 text-sm text-slate-400">
              View and manage all hospital rooms.
            </p>
          </div>

          <div className="relative">
            <Search
              size={19}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search rooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-600 bg-[#0B1220] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-teal-500 md:w-64"
            />
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="border-b border-slate-700 text-slate-400">
              <tr>
                <th className="px-6 py-5">Room Number</th>
                <th className="px-6 py-5">Room Type</th>
                <th className="px-6 py-5">Daily Rate</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-700">

              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    Loading rooms...
                  </td>
                </tr>
              ) : filteredRooms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No rooms found.
                  </td>
                </tr>
              ) : (
                filteredRooms.map((room) => (
                  <tr
                    key={room.room_id}
                    className="transition hover:bg-slate-700/20"
                  >
                    <td className="px-6 py-5 font-semibold">
                      {room.room_number}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {room.room_type}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      ₱{Number(room.daily_rate).toLocaleString("en-PH")}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          room.status?.toLowerCase() === "available"
                            ? "bg-teal-500/10 text-teal-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() => handleDeleteRoom(room.room_id)}
                        className="flex items-center gap-2 rounded-lg border border-red-500/40 px-3 py-2 text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>

        </div>
      </div>

      {/* ADD ROOM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#172337] p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Room</h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleAddRoom}>

              <label className="mb-2 block text-sm text-slate-300">
                Room Number
              </label>

              <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="Example: 101"
                className="mb-5 w-full rounded-xl border border-slate-600 bg-[#0B1220] p-3 text-white outline-none focus:border-teal-500"
                required
              />

              <div className="mb-5 rounded-xl bg-[#0B1220] p-4 text-sm text-slate-400">
                <p>Room Type: General</p>
                <p className="mt-2">Initial Status: Available</p>
                <p className="mt-2">Daily Rate: ₱0</p>
              </div>

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-slate-600 px-4 py-2 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-teal-600 px-5 py-2 font-semibold hover:bg-teal-500"
                >
                  Save Room
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
