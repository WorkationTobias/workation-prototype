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
        {/* Antrag stellen */}
        {activeTab === "antrag" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Workation-Antrag stellen</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Zielland</label>
                <select className="w-full border rounded p-2">
                  <option>Kroatien</option>
                  <option>Spanien</option>
                  <option>Portugal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Ankunft</label>
                <input type="date" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Abreise</label>
                <input type="date" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Wie viele Tage werden Sie arbeiten?</label>
                <input type="number" className="w-full border rounded p-2" max={20} />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Absenden</button>
            </form>
          </div>
        )}

        {/* Meine Anfragen */}
        {activeTab === "meine-anfragen" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Meine Anfragen</h2>
            <table className="table-auto w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2">Land</th>
                  <th className="px-4 py-2">Start</th>
                  <th className="px-4 py-2">Ende</th>
                  <th className="px-4 py-2">Arbeitstage</th>
                  <th className="px-4 py-2">Risiko</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {anfragen.map((a, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{a.land}</td>
                    <td className="border px-4 py-2">{a.start}</td>
                    <td className="border px-4 py-2">{a.ende}</td>
                    <td className="border px-4 py-2">{a.arbeitstage}</td>
                    <td className="border px-4 py-2">{a.risikobewertung}</td>
                    <td className="border px-4 py-2">{a.genehmigung}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mein Profil */}
        {activeTab === "mein-profil" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Mein Profil</h2>
            <form className="grid grid-cols-2 gap-4">
              <div><label>Name</label><input className="w-full border p-2 rounded" /></div>
              <div><label>Geburtsdatum</label><input type="date" className="w-full border p-2 rounded" /></div>
              <div><label>Staatsangehörigkeit</label><input className="w-full border p-2 rounded" /></div>
              <div><label>Adresse</label><input className="w-full border p-2 rounded" /></div>
              <div><label>Abteilung</label><input className="w-full border p-2 rounded" /></div>
              <div><label>E-Mail</label><input className="w-full border p-2 rounded" /></div>
            </form>
          </div>
        )}

        {/* Workation Policy */}
        {activeTab === "policy" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Workation Policy</h2>
            <p>Sie können bis zu 183 Arbeitstage im Ausland verbringen. Für bestimmte Länder gelten Einschränkungen. Bitte beachten Sie die Unternehmensrichtlinie.</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Enthaltene Länder: Kroatien, Spanien, Portugal</li>
              <li>Ausgeschlossene Länder: Afghanistan, Nordkorea, Syrien</li>
              <li>Maximale Dauer: 183 Tage pro Kalenderjahr</li>
              <li>Pflicht zur Versicherung & Einhaltung der DSGVO</li>
            </ul>
          </div>
        )}

        {/* Destinationen */}
        {activeTab === "destinationen" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Meine Workation-Destinationen</h2>
            <div className="grid grid-cols-3 gap-6">
              {destinationenDetails.map((d, i) => (
                <div key={i} className="bg-white rounded shadow overflow-hidden cursor-pointer" onClick={() => handleKachelClick(d)}>
                  <img src={d.bild} alt={d.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{d.name}</h3>
                    <p className="text-sm text-gray-600">{d.info}</p>
                    <button className="mt-2 bg-orange-500 text-white px-3 py-1 text-sm rounded">{d.rabatt}</button>
                    {d.scoring && (
                      <div className="mt-3 text-sm text-gray-700">
                        <p>⭐ Infrastruktur: {d.scoring[0]} Sterne von 5 möglichen Sternen</p>
                        <p>⭐ Komfort: {d.scoring[1]} Sterne von 5 möglichen Sternen</p>
                        <p>⭐ Freizeit: {d.scoring[2]} Sterne von 5 möglichen Sternen</p>
                        <p>⭐ Nachhaltigkeit: {d.scoring[3]} Sterne von 5 möglichen Sternen</p>
                        <p>⭐ Service: {d.scoring[4]} Sterne von 5 möglichen Sternen</p>
                        <p className="mt-2 font-bold text-green-600">Dieser Partner ist mit dem Gütesiegel: WORKATION READY zertifziert</p>
                      </div>
                    )}
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
