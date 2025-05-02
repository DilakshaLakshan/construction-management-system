"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import jsPDF from "jspdf";

export default function PayrollPage() {
  const router = useRouter();

  // Query all payroll
  const allPayroll = useQuery(api.payroll.getPayroll);

  // CRUD Mutations
  const addPayroll = useMutation(api.payroll.addPayroll);
  const updatePayroll = useMutation(api.payroll.updatePayroll);
  const deletePayroll = useMutation(api.payroll.deletePayroll);

  // For creating a new payroll
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New payroll states
  const [workerId, setWorkerId] = useState("");
  const [baseSalary, setBaseSalary] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [paid, setPaid] = useState(false);

  // ➕ Overtime, EPF, ETF
  const [otHours, setOtHours] = useState(0);
  const [epf, setEpf] = useState(0);
  const [etf, setEtf] = useState(0);

  if (!allPayroll) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // CREATE
  const handleCreatePayroll = async (e) => {
    e.preventDefault();
    // Example totalPay calculation:
    // base + bonus + (OT rate * otHours) - epf - etf
    // Change OT rate or logic as needed
    const otRate = baseSalary/200;           // (basesalary/200 OT hour)
    const etf = baseSalary*3/100;           // (3% of base salary)
    const totalPay =
      Number(baseSalary) +
      Number(bonus) +
      otRate * Number(otHours) -
      Number(epf) -
      Number(etf);

    await addPayroll({
      workerId,
      baseSalary: Number(baseSalary),
      bonus: Number(bonus),
      totalPay,
      paid,
      otHours: Number(otHours),
      epf: Number(epf),
      etf: Number(etf),
    });

    // Clear states
    setShowCreateForm(false);
    setWorkerId("");
    setBaseSalary(0);
    setBonus(0);
    setPaid(false);
    setOtHours(0);
    setEpf(0);
    setEtf(0);
  };

  // UPDATE
  const handleUpdate = async (record) => {
    const newBase = prompt("New Base Salary?", record.baseSalary);
    if (newBase === null) return;

    const newBonus = prompt("New Bonus?", record.bonus);
    if (newBonus === null) return;

    const newOtHours = prompt("Overtime Hours?", record.otHours);
    if (newOtHours === null) return;

    const newEpf = prompt("EPF Amount?", record.epf);
    if (newEpf === null) return;

    const newEtf = prompt("ETF Amount?", record.etf);
    if (newEtf === null) return;

    const isPaid = confirm("Is Payment Done? OK=Yes, Cancel=No");

    // Recalculate total pay
    const otRate = 200; // example
    const totalPay =
      Number(newBase) +
      Number(newBonus) +
      otRate * Number(newOtHours) -
      Number(newEpf) -
      Number(newEtf);

    await updatePayroll({
      id: record._id,
      workerId: record.workerId,
      baseSalary: Number(newBase),
      bonus: Number(newBonus),
      totalPay,
      paid: isPaid,
      otHours: Number(newOtHours),
      epf: Number(newEpf),
      etf: Number(newEtf),
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this payroll record?")) {
      await deletePayroll({ id });
    }
  };

  // PDF
  const handlePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payroll Records", 20, 20);
    let y = 50;

    allPayroll.forEach((rec, i) => {
      doc.setFontSize(12);
      doc.text(`Record #${i + 1}`, 20, y); y += 14;
      doc.text(`Worker ID: ${rec.workerId}`, 20, y); y += 14;
      doc.text(`Base Salary: ${rec.baseSalary}`, 20, y); y += 14;
      doc.text(`Bonus: ${rec.bonus}`, 20, y); y += 14;
      doc.text(`OT Hours: ${rec.otHours}`, 20, y); y += 14;
      doc.text(`EPF: ${rec.epf}`, 20, y); y += 14;
      doc.text(`ETF: ${rec.etf}`, 20, y); y += 14;
      doc.text(`Total Pay: ${rec.totalPay}`, 20, y); y += 14;
      doc.text(`Paid: ${rec.paid ? "Done" : "Not Done"}`, 20, y); y += 20;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("Payroll.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Payroll
          </h2>
          <button
            onClick={handlePDF}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
          >
            Download PDF
          </button>
        </div>

        {/* Create Button */}
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            + New Payroll
          </button>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <form onSubmit={handleCreatePayroll} className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Worker ID
                </label>
                <input
                  type="text"
                  value={workerId}
                  onChange={(e) => setWorkerId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Base Salary
                </label>
                <input
                  type="number"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Bonus
                </label>
                <input
                  type="number"
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* OT Hours */}
              <div>
                <label className="block text-gray-700 font-medium">
                  OT Hours
                </label>
                <input
                  type="number"
                  value={otHours}
                  onChange={(e) => setOtHours(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* EPF */}
              <div>
                <label className="block text-gray-700 font-medium">
                  EPF
                </label>
                <input
                  type="number"
                  value={epf}
                  onChange={(e) => setEpf(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>


              <div className="flex items-center mt-4">
                <label className="text-gray-700 font-medium mr-2">
                  Payment Done?
                </label>
                <input
                  type="checkbox"
                  checked={paid}
                  onChange={(e) => setPaid(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              Save Payroll
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="ml-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-700">Worker ID</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Base</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Bonus</th>
                <th className="px-4 py-2 font-semibold text-gray-700">OT Hrs</th>
                <th className="px-4 py-2 font-semibold text-gray-700">EPF</th>
                <th className="px-4 py-2 font-semibold text-gray-700">ETF</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Total Pay</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Paid</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPayroll.map((record) => (
                <tr key={record._id} className="border-b">
                  <td className="px-4 py-2">{record.workerId}</td>
                  <td className="px-4 py-2">
                    ${record.baseSalary?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    ${record.bonus?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{record.otHours}</td>
                  <td className="px-4 py-2">${record.epf?.toFixed(2)}</td>
                  <td className="px-4 py-2">${record.etf?.toFixed(2)}</td>
                  <td className="px-4 py-2 text-green-600 font-semibold">
                    ${record.totalPay?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    {record.paid ? (
                      <span className="text-green-600 font-bold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-bold">No</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={async () => {
                        const newBase = prompt("New Base Salary?", record.baseSalary);
                        if (newBase === null) return;

                        const newBonus = prompt("New Bonus?", record.bonus);
                        if (newBonus === null) return;

                        const newOT = prompt("OT Hours?", record.otHours);
                        if (newOT === null) return;

                        const newEPF = prompt("New EPF?", record.epf);
                        if (newEPF === null) return;

                        const newETF = prompt("New ETF?", record.etf);
                        if (newETF === null) return;

                        const isPaid = confirm("Is Payment Done? OK=Yes, Cancel=No");

                        const otRate = 200;
                        const newTotal =
                          Number(newBase) +
                          Number(newBonus) +
                          otRate * Number(newOT) -
                          Number(newEPF) -
                          Number(newETF);

                        await updatePayroll({
                          id: record._id,
                          workerId: record.workerId,
                          baseSalary: Number(newBase),
                          bonus: Number(newBonus),
                          otHours: Number(newOT),
                          epf: Number(newEPF),
                          etf: Number(newETF),
                          totalPay: newTotal,
                          paid: isPaid,
                        });
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Sure to delete this payroll?")) {
                          await deletePayroll({ id: record._id });
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
