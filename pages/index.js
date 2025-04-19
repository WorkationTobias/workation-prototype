
import Head from "next/head"
import { useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    reiseziel: "",
    start: "",
    ende: "",
    arbeitstage: 0
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Antrag erfolgreich eingereicht! (Demo)")
  }

  const applications = [
    {
      id: "W-ZF76U",
      from: { code: "de", name: "Deutschland" },
      to: { code: "hr", name: "Kroatien" },
      days: 9,
      status: "Genehmigt",
      risk: "Kein Risiko"
    },
    {
      id: "W-BX82K",
      from: { code: "de", name: "Deutschland" },
      to: { code: "es", name: "Spanien" },
      days: 10,
      status: "In Prüfung",
      risk: "Wird geprüft"
    }
  ]

  const flagUrl = (code) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`

  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <Head>
        <title>Workation World</title>
      </Head>

      <h1 className="text-3xl font-bold text-blue-900 mb-6">Workation World</h1>

      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab("dashboard")} className={`px-4 py-2 rounded-full border ${activeTab === "dashboard" ? "bg-blue-900 text-white" : "border-blue-900 text-blue-900"}`}>Dashboard</button>
        <button onClick={() => setActiveTab("destinationen")} className={`px-4 py-2 rounded-full border ${activeTab === "destinationen" ? "bg-blue-900 text-white" : "border-blue-900 text-blue-900"}`}>Destinationen</button>
        <button onClick={() => setActiveTab("admin")} className={`px-4 py-2 rounded-full border ${activeTab === "admin" ? "bg-blue-900 text-white" : "border-blue-900 text-blue-900"}`}>Admin</button>
        <button onClick={() => setActiveTab("antrag")} className={`px-4 py-2 rounded-full border ${activeTab === "antrag" ? "bg-blue-900 text-white" : "border-blue-900 text-blue-900"}`}>Antrag</button>
      </div>

      {activeTab === "dashboard" && (
        <>
          <h2 className="text-xl font-semibold mb-4">Meine Workation-Anträge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <div key={app.id} className="border rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-500">Antrag: {app.id}</p>
                <p className="font-medium flex items-center space-x-2">
                  <img src={flagUrl(app.from.code)} alt={app.from.name} className="w-6 h-auto inline border border-gray-300" />
                  <span>{app.from.name}</span>
                  <span>→</span>
                  <img src={flagUrl(app.to.code)} alt={app.to.name} className="w-6 h-auto inline border border-gray-300" />
                  <span>{app.to.name}</span>
                </p>
                <p>{app.days} Arbeitstage</p>
                <p>Status: <strong>{app.status}</strong></p>
                <p>Risiko: {app.risk}</p>
                <button className="mt-2 text-blue-900 underline">Details</button>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "antrag" && (
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold mb-4">Neuen Antrag stellen</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Vorname</label>
              <input name="vorname" type="text" value={form.vorname} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Nachname</label>
              <input name="nachname" type="text" value={form.nachname} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Reiseziel</label>
              <input name="reiseziel" type="text" value={form.reiseziel} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Startdatum</label>
                <input name="start" type="date" value={form.start} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Enddatum</label>
                <input name="ende" type="date" value={form.ende} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Arbeitstage</label>
              <input name="arbeitstage" type="number" min="1" value={form.arbeitstage} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">
              Antrag einreichen
            </button>
          </form>
        </div>
      )}

      {activeTab === "destinationen" && (
        <p className="text-gray-600">Destinationen (Demo kommt bald)</p>
      )}

      {activeTab === "admin" && (
        <p className="text-gray-600">Admin-Bereich (Demo kommt bald)</p>
      )}
    </div>
  )
}
