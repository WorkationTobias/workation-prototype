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
    {
      name: "Robinson Club",
      info: "Mehr als 400 Reiseziele",
      rabatt: "10% Nachlass nutzen",
      bild: "https://www.robinson.com/fileadmin/media/_processed_/b/f/csm_qr58_13610_Hauptpool_381a397ac3.jpg",
      detail: true,
      scoring: [4, 5, 5, 3, 5]
    },
    {
      name: "Wyndham Resorts",
      info: "Mehr als 300 Reiseziele",
      rabatt: "10% Nachlass nutzen",
      bild: "https://www.wyndhamhotels.com/content/dam/property-images/en-us/hr/au/others/torquay/16284/16284_pool%2014.jpg?downsize=700:*"
    },
    {
      name: "Valamar",
      info: "Poreč",
      rabatt: "10% Nachlass nutzen",
      bild: "https://multimedia.valamar.com/mediagallery-dxp-production/Objekti_Hvar_Amicor_V4_gallery_amicor-resort-pools-sport-airview.jpg"
    }
  ])

  const [selectedResort, setSelectedResort] = useState(null)

  const handleKachelClick = (resort) => {
    if (resort.detail) setSelectedResort(resort.name)
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <div className="text-xl font-bold">Workation World</div>
        <nav className="space-y-2">
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "antrag" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("antrag"); setSelectedResort(null); }}>Antrag stellen</button>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "meine-anfragen" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("meine-anfragen"); setSelectedResort(null); }}>Meine Anfragen</button>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "mein-profil" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("mein-profil"); setSelectedResort(null); }}>Mein Profil</button>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "policy" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("policy"); setSelectedResort(null); }}>Workation Policy</button>
          <div className="border-t border-gray-600 my-2"></div>
          <button className={`block w-full text-left px-2 py-1 rounded ${activeTab === "destinationen" ? "bg-blue-600" : "hover:bg-gray-700"}`} onClick={() => { setActiveTab("destinationen"); setSelectedResort(null); }}>Meine Workation-Destinationen</button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {activeTab === "antrag" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Workation-Antrag stellen</h2>
            {/* Formularfelder hier einfügen */}
            <p>[Formular für Zielland, Ankunft, Abreise, etc.]</p>
          </div>
        )}

        {activeTab === "meine-anfragen" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Meine Anfragen</h2>
            {/* Liste */}
            <p>[Anfragenübersicht vollständig]</p>
          </div>
        )}

        {activeTab === "mein-profil" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Mein Profil</h2>
            <p>[Vollständiges Formular mit Eingabefeldern wie Name, Adresse, etc.]</p>
          </div>
        )}

        {activeTab === "policy" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Workation Policy</h2>
            <p>[Maximale Tage, enthaltene Länder, PDFs zur Betriebsvereinbarung etc.]</p>
          </div>
        )}

        {activeTab === "destinationen" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Meine Workation-Destinationen</h2>
            <p>[Karten mit Scoring und Zertifizierung sichtbar]</p>
          </div>
        )}
      </main>
    </div>
  )
}
