import Head from "next/head"
import { useEffect, useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("antrag")
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    land: "",
    start: "",
    ende: "",
    arbeitstage: 0,
    steuerpflicht: false,
    bankkonto: false,
    tageVorher: 0,
    bestaetigung: false
  })
  const [submitted, setSubmitted] = useState(false)
  const [anfragen, setAnfragen] = useState([
    {
      land: "Kroatien",
      start: "10.09.2024",
      ende: "20.09.2024",
      arbeitstage: 9,
      risikobewertung: "In Bearbeitung",
      genehmigung: "Ausstehend",
      buchungscode: "ausstehend",
      dokumente: "ausstehend"
    },
    {
      land: "Spanien",
      start: "21.10.2024",
      ende: "05.11.2024",
      arbeitstage: 12,
      risikobewertung: "Kein Risiko",
      genehmigung: "Genehmigt",
      buchungscode: "WWES82631",
      dokumente: "hier downloaden"
    }
  ])

  const [destinationenDetails] = useState([
    { name: "Robinson Club", info: "Mehr als 400 Reiseziele", rabatt: "10% Nachlass nutzen", bild: "/flags/1.png" },
    { name: "Wyndham Resorts", info: "Mehr als 300 Reiseziele", rabatt: "10% Nachlass nutzen", bild: "/flags/2.png" },
    { name: "Valamar", info: "Poreč", rabatt: "10% Nachlass nutzen", bild: "/flags/3.png" }
  ])

  const handleKachelClick = (resort) => {
    alert(`Mehr Informationen zu ${resort.name}`)
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <div className="text-xl font-bold">Workation World</div>
        <nav className="space-y-2">
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "antrag" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("antrag")}>Antrag stellen</button>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "meine-anfragen" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("meine-anfragen")}>Meine Anfragen</button>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "mein-profil" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("mein-profil")}>Mein Profil</button>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "policy" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("policy")}>Workation Policy</button>
          <div className="border-t border-gray-600 my-2"></div>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "destinationen" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("destinationen")}>Meine Workation-Destinationen</button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {activeTab === "destinationen" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Meine Workation-Destinationen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinationenDetails.map((d, i) => (
                <div key={i} onClick={() => handleKachelClick(d)} className="cursor-pointer bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
                  <img src={d.bild} alt={d.name} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{d.name}</h3>
                    <p className="text-sm text-gray-600">{d.info}</p>
                    <button className="mt-2 bg-orange-500 text-white text-sm px-2 py-1 rounded">{d.rabatt}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
