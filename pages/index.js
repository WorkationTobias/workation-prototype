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

  const [profil, setProfil] = useState({
    name: "",
    staatsangehoerigkeit: "",
    zweiteStaatsangehoerigkeit: "",
    geschlecht: "",
    geburtsdatum: "",
    geburtsort: "",
    strasse: "",
    plz: "",
    stadt: "",
    land: "",
    lohnabrechnung: "",
    krankenkasse: "",
    krankenversicherung: "",
    svNummer: "",
    beruf: "",
    abteilung: "",
    eintritt: "",
    vorgesetzte: "",
    lokaleDienste: "",
    vollmacht: "",
    management: ""
  })

  const [policy, setPolicy] = useState({
    maxTage: 183,
    enthalteneLaender: ["Aruba", "Afghanistan", "Angola"],
    dokumente: [
      { titel: "Allgemeine Betriebsvereinbarung", name: "WorkFlex - Terms & conditions.pdf", groesse: "197.36 kB", datum: "19.06.2024" },
      { titel: "Datenschutz im Ausland", name: "Data privacy and security.pdf", groesse: "124.1 kB", datum: "19.06.2024" },
      { titel: "Krankenversicherung", name: "Insurance policy.pdf", groesse: "121.31 kB", datum: "19.06.2024" }
    ]
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else if (type === "radio") {
      const parsed = value === "true"
      setForm((prev) => ({ ...prev, [name]: parsed }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setAnfragen((prev) => [...prev, { ...form, risikobewertung: "In Bearbeitung", genehmigung: "Ausstehend", buchungscode: "ausstehend", dokumente: "ausstehend" }])
    setForm({
      land: "",
      start: "",
      ende: "",
      arbeitstage: 0,
      steuerpflicht: false,
      bankkonto: false,
      tageVorher: 0,
      bestaetigung: false
    })
    setStep(1)
    setActiveTab("meine-anfragen")
  }

  const destinationen = [
    "Spanien", "Italien", "Frankreich", "Griechenland", "Türkei", "Deutschland", "Kroatien", "Österreich", "Schweiz", "Portugal", "Niederlande", "Belgien", "Polen", "Tschechien", "Ungarn", "Dänemark", "Schweden", "Norwegen", "Finnland", "Irland", "Großbritannien", "USA", "Kanada", "Mexiko", "Brasilien", "Thailand", "Indonesien", "Japan", "China", "Australien", "Neuseeland", "Marokko", "Ägypten", "Südafrika"
  ]

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
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="block font-semibold">Zielland</label>
              <select name="land" value={form.land} onChange={handleChange} className="w-full border rounded p-2">
                <option value="">Bitte wählen</option>
                {destinationen.map((land, i) => <option key={i} value={land}>{land}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold">Ankunft</label>
              <input type="date" name="start" value={form.start} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block font-semibold">Abreise</label>
              <input type="date" name="ende" value={form.ende} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block font-semibold">Gewünschte Arbeitstage</label>
              <input type="number" name="arbeitstage" value={form.arbeitstage} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Sind Sie im Zielland steuerpflichtig?</label>
              <label><input type="radio" name="steuerpflicht" value="true" checked={form.steuerpflicht} onChange={handleChange} /> Ja</label>
              <label className="ml-4"><input type="radio" name="steuerpflicht" value="false" checked={!form.steuerpflicht} onChange={handleChange} /> Nein</label>
            </div>
            <div className="space-y-2">
              <label className="block font-semibold">Haben Sie im Zielland ein Bankkonto?</label>
              <label><input type="radio" name="bankkonto" value="true" checked={form.bankkonto} onChange={handleChange} /> Ja</label>
              <label className="ml-4"><input type="radio" name="bankkonto" value="false" checked={!form.bankkonto} onChange={handleChange} /> Nein</label>
            </div>
            <div>
              <label className="block font-semibold">Wie viele Tage haben Sie in den letzten 12 Monaten im Zielland verbracht?</label>
              <input type="number" name="tageVorher" value={form.tageVorher} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label><input type="checkbox" name="bestaetigung" checked={form.bestaetigung} onChange={handleChange} /> Hiermit bestätige ich die Richtigkeit meiner Angaben</label>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Absenden</button>
          </form>
        )}

        {activeTab === "meine-anfragen" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Meine Workation-Anfragen</h2>
            <table className="w-full table-auto border">
              <thead>
                <tr className="bg-gray-200">
                  <th>Startland</th>
                  <th>Zielland</th>
                  <th>Startdatum</th>
                  <th>Enddatum</th>
                  <th>Arbeitstage</th>
                  <th>Risikobewertung</th>
                  <th>Genehmigung</th>
                  <th>Buchungscode</th>
                  <th>Dokumente</th>
                </tr>
              </thead>
              <tbody>
                {anfragen.map((a, i) => (
                  <tr key={i} className="text-center border-t">
                    <td>Deutschland</td>
                    <td>{a.land}</td>
                    <td>{a.start}</td>
                    <td>{a.ende}</td>
                    <td>{a.arbeitstage}</td>
                    <td className="text-blue-600">{a.risikobewertung}</td>
                    <td className="text-yellow-600">{a.genehmigung}</td>
                    <td>{a.buchungscode}</td>
                    <td className="text-blue-600">{a.dokumente}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "mein-profil" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Mein Profil bearbeiten</h2>
            <form className="grid grid-cols-2 gap-4">
              {Object.entries(profil).map(([key, value], i) => (
                <div key={i} className="flex flex-col">
                  <label className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <input type="text" value={value} onChange={e => setProfil(prev => ({ ...prev, [key]: e.target.value }))} className="border rounded p-2" />
                </div>
              ))}
            </form>
          </div>
        )}

        {activeTab === "policy" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Workation-Richtlinie</h2>
            <p className="mb-2">Ihre Unternehmensrichtlinie besagt, dass Sie bis zu {policy.maxTage} Arbeitstage im Ausland pro Kalenderjahr arbeiten können.</p>
            <h3 className="font-semibold">Enthaltene Länder:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {policy.enthalteneLaender.map((land, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 rounded">{land}</span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {policy.dokumente.map((doc, i) => (
                <div key={i} className="border p-4 rounded bg-white shadow">
                  <h4 className="font-semibold mb-2">{doc.titel}</h4>
                  <p>{doc.name}</p>
                  <p className="text-sm text-gray-600">{doc.groesse}</p>
                  <p className="text-sm text-gray-400">Akzeptiert am {doc.datum}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "destinationen" && (
          <div>
            <h2 className="text-xl font-bold">Ihre bevorzugten Destinationen folgen bald.</h2>
          </div>
        )}
      </main>
    </div>
  )
}

function calculateWeekdays(startDateStr, endDateStr) {
  const start = new Date(startDateStr)
  const end = new Date(endDateStr)
  let count = 0
  while (start <= end) {
    const day = start.getDay()
    if (day !== 0 && day !== 6) count++
    start.setDate(start.getDate() + 1)
  }
  return count
}
