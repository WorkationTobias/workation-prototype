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
    { name: "Robinson Club", info: "Mehr als 400 Reiseziele", rabatt: "10% Nachlass nutzen", bild: "https://www.robinson.com/fileadmin/media/_processed_/b/f/csm_qr58_13610_Hauptpool_381a397ac3.jpg" },
    { name: "Wyndham Resorts", info: "Mehr als 300 Reiseziele", rabatt: "10% Nachlass nutzen", bild: "https://www.wyndhamhotels.com/content/dam/property-images/en-us/hr/au/others/torquay/16284/16284_pool%2014.jpg?downsize=700:*" },
    { name: "Valamar", info: "Poreč", rabatt: "10% Nachlass nutzen", bild: "https://multimedia.valamar.com/mediagallery-dxp-production/Objekti_Hvar_Amicor_V4_gallery_amicor-resort-pools-sport-airview.jpg" }
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
        {activeTab === "antrag" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Workation-Antrag stellen</h2>
            <label className="block font-medium">Zielland</label>
            <select className="w-full p-2 border rounded" value={form.land} onChange={(e) => setForm({ ...form, land: e.target.value })}>
              <option value="">Bitte wählen</option>
              {[
                "Kroatien", "Spanien", "Italien", "Griechenland", "Portugal",
                "Frankreich", "Thailand", "Indonesien", "Mexiko", "Zypern"
              ].map((land, i) => <option key={i} value={land}>{land}</option>)}
            </select>
            <label className="block font-medium">Ankunft</label>
            <input type="date" className="w-full p-2 border rounded" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
            <label className="block font-medium">Abreise</label>
            <input type="date" className="w-full p-2 border rounded" value={form.ende} onChange={(e) => setForm({ ...form, ende: e.target.value })} />
            <label className="block font-medium">Gewünschte Arbeitstage</label>
            <input type="number" className="w-full p-2 border rounded" value={form.arbeitstage} onChange={(e) => setForm({ ...form, arbeitstage: e.target.value })} />
            <div className="space-y-2">
              <div>
                <label className="block">Sind Sie im Zielland steuerpflichtig?</label>
                <label><input type="radio" name="steuer" checked={form.steuerpflicht} onChange={() => setForm({ ...form, steuerpflicht: true })} /> Ja</label>
                <label className="ml-4"><input type="radio" name="steuer" checked={!form.steuerpflicht} onChange={() => setForm({ ...form, steuerpflicht: false })} /> Nein</label>
              </div>
              <div>
                <label className="block">Haben Sie im Zielland ein Bankkonto?</label>
                <label><input type="radio" name="bank" checked={form.bankkonto} onChange={() => setForm({ ...form, bankkonto: true })} /> Ja</label>
                <label className="ml-4"><input type="radio" name="bank" checked={!form.bankkonto} onChange={() => setForm({ ...form, bankkonto: false })} /> Nein</label>
              </div>
              <div>
                <label>Wie viele Tage haben Sie in den letzten 12 Monaten im Zielland verbracht?</label>
                <input type="number" className="w-full p-2 border rounded" value={form.tageVorher} onChange={(e) => setForm({ ...form, tageVorher: e.target.value })} />
              </div>
              <div>
                <label><input type="checkbox" checked={form.bestaetigung} onChange={(e) => setForm({ ...form, bestaetigung: e.target.checked })} /> Hiermit bestätige ich die Richtigkeit meiner Angaben</label>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setSubmitted(true)}>Absenden</button>
            </div>
          </div>
        )}

        {activeTab === "meine-anfragen" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Meine Workation-Anfragen</h2>
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Startland</th>
                  <th className="p-2">Zielland</th>
                  <th className="p-2">Startdatum</th>
                  <th className="p-2">Enddatum</th>
                  <th className="p-2">Arbeitstage</th>
                  <th className="p-2">Risikobewertung</th>
                  <th className="p-2">Genehmigung</th>
                  <th className="p-2">Buchungscode</th>
                  <th className="p-2">Dokumente</th>
                </tr>
              </thead>
              <tbody>
                {anfragen.map((a, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">Deutschland</td>
                    <td className="p-2">{a.land}</td>
                    <td className="p-2">{a.start}</td>
                    <td className="p-2">{a.ende}</td>
                    <td className="p-2">{a.arbeitstage}</td>
                    <td className="p-2 text-blue-600 underline cursor-pointer">{a.risikobewertung}</td>
                    <td className="p-2 text-yellow-600">{a.genehmigung}</td>
                    <td className="p-2">{a.buchungscode}</td>
                    <td className="p-2 text-blue-600 underline cursor-pointer">{a.dokumente}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "mein-profil" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Mein Profil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Persönliche Daten</h3>
                {[
                  "Vor- und Nachname",
                  "Staatsangehörigkeit",
                  "Zweite Staatsangehörigkeit",
                  "Geschlecht",
                  "Geburtsdatum",
                  "Geburtsort"
                ].map((label, i) => (
                  <div key={i} className="mb-2">
                    <label className="block text-gray-600 text-sm">{label}</label>
                    <input className="w-full p-2 border rounded" />
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold">Wohnadresse</h3>
                {[
                  "Straße und Hausnummer",
                  "Postleitzahl",
                  "Stadt",
                  "Land"
                ].map((label, i) => (
                  <div key={i} className="mb-2">
                    <label className="block text-gray-600 text-sm">{label}</label>
                    <input className="w-full p-2 border rounded" />
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold">Offizielle Informationen</h3>
                {[
                  "Land der Lohnabrechnung",
                  "Krankenversicherung",
                  "Öffentliche Krankenversicherung",
                  "Sozialversicherungsnummer"
                ].map((label, i) => (
                  <div key={i} className="mb-2">
                    <label className="block text-gray-600 text-sm">{label}</label>
                    <input className="w-full p-2 border rounded" />
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold">Jobinformationen</h3>
                {[
                  "Berufsbezeichnung",
                  "Abteilung",
                  "Eintrittsdatum",
                  "E-Mail-Adresse der Führungskraft",
                  "Bietet lokale Dienste an",
                  "Vollmacht",
                  "Oberes Management / Vertrieb / Beschaffung"
                ].map((label, i) => (
                  <div key={i} className="mb-2">
                    <label className="block text-gray-600 text-sm">{label}</label>
                    <input className="w-full p-2 border rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "policy" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Workation Policy</h2>
            <div className="bg-white p-4 shadow rounded mb-4">
              <h3 className="font-semibold">Workation-Richtlinie</h3>
              <p className="mt-2 text-sm">Maximale Anzahl an Tagen: Ihre Unternehmensrichtlinie besagt, dass Sie bis zu 183 Arbeitstage im Ausland pro Kalenderjahr arbeiten können.</p>
              <p className="mt-2 text-sm">Reiseländer: Sie können Reisen zu jedem enthaltenen Ziel anfordern. Für die ausgeschlossenen Ziele sind Reiseanfragen deaktiviert.</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Aruba</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Afghanistan</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Angola</span>
                <span className="text-blue-600 underline cursor-pointer">+208 weitere</span>
              </div>
              <p className="text-xs mt-2 text-gray-500">Die in Rot hervorgehobenen Länder gehören zur Liste der nicht empfohlenen Länder.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { titel: "Allgemeine Betriebsvereinbarung", name: "WorkFlex – Terms & Conditions.pdf" },
                { titel: "Datenschutz im Ausland", name: "Data privacy and security.pdf" },
                { titel: "Krankenversicherung", name: "Insurance policy.pdf" }
              ].map((doc, i) => (
                <div key={i} className="bg-white p-4 shadow rounded">
                  <h4 className="font-semibold mb-2">{doc.titel}</h4>
                  <div className="flex justify-between items-center">
                    <span>{doc.name}</span>
                    <button className="text-blue-600 underline text-sm">Download</button>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">Akzeptiert am 19.06.2024</p>
                </div>
              ))}
            </div>
          </div>
        )}

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
