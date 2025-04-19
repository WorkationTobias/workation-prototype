
import { useState } from "react"
import Head from "next/head"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const applications = [
    {
      id: "W-ZF76U",
      from: "🇩🇪 Deutschland",
      to: "🇭🇷 Kroatien",
      days: 9,
      status: "Genehmigt",
      risk: "Kein Risiko"
    },
    {
      id: "W-BX82K",
      from: "🇩🇪 Deutschland",
      to: "🇪🇸 Spanien",
      days: 10,
      status: "In Prüfung",
      risk: "Wird geprüft"
    }
  ]

  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <Head>
        <title>Workation World</title>
      </Head>

      <h1 className="text-3xl font-bold text-blue-900 mb-6">Workation World</h1>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full border ${activeTab === "dashboard" ? "bg-blue-900 text-white" : "bg-white text-blue-900 border-blue-900"}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded-full border ${activeTab === "destinations" ? "bg-blue-900 text-white" : "bg-white text-blue-900 border-blue-900"}`}
          onClick={() => setActiveTab("destinations")}
        >
          Destinationen
        </button>
        <button
          className={`px-4 py-2 rounded-full border ${activeTab === "admin" ? "bg-blue-900 text-white" : "bg-white text-blue-900 border-blue-900"}`}
          onClick={() => setActiveTab("admin")}
        >
          Admin
        </button>
      </div>

      {activeTab === "dashboard" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Meine Workation-Anträge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <div key={app.id} className="border rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-500">Antrag: {app.id}</p>
                <p className="font-medium">{app.from} → {app.to}</p>
                <p>{app.days} Arbeitstage</p>
                <p>Status: <strong>{app.status}</strong></p>
                <p>Risiko: {app.risk}</p>
                <button className="mt-2 text-blue-900 underline">Details</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "destinations" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Destinationen (Demo folgt)</h2>
          <p className="text-gray-600">Hier entsteht bald ein interaktiver Resort-Katalog mit Filtermöglichkeiten.</p>
        </div>
      )}

      {activeTab === "admin" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Admin-Bereich (in Vorbereitung)</h2>
          <p className="text-gray-600">Hier erscheinen demnächst Genehmigungen und unternehmensweite Übersichten.</p>
        </div>
      )}
    </div>
  )
}
