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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Workation World</h1>
      <div className="flex space-x-4 border-b pb-2 mb-4">
        <button onClick={() => setActiveTab("antrag")}>Antrag stellen</button>
        <button onClick={() => setActiveTab("meine-anfragen")}>Meine Anfragen</button>
        <button onClick={() => setActiveTab("mein-profil")}>Mein Profil</button>
        <button onClick={() => setActiveTab("policy")}>Workation Policy</button>
        <button onClick={() => setActiveTab("destinationen")}>Meine Workation-Destinationen</button>
      </div>

      {activeTab === "antrag" && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <div>
            <label>Zielland</label>
            <select name="land" value={form.land} onChange={handleChange} className="w-full border p-2">
              <option value="">Bitte wählen</option>
              {destinationen.map((land) => (
                <option key={land} value={land}>{land}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Ankunft</label>
            <input type="date" name="start" value={form.start} onChange={handleChange} className="w-full border p-2" />
          </div>
          <div>
            <label>Abreise</label>
            <input type="date" name="ende" value={form.ende} onChange={handleChange} className="w-full border p-2" />
          </div>
          <div>
            <label>Gewünschte Arbeitstage</label>
            <input type="number" name="arbeitstage" value={form.arbeitstage} max={calculateWeekdays(form.start, form.ende)} onChange={handleChange} className="w-full border p-2" />
          </div>
          <div>
            <label>Sind Sie im Zielland steuerpflichtig?</label>
            <div>
              <label><input type="radio" name="steuerpflicht" value="true" checked={form.steuerpflicht === true} onChange={handleChange} /> Ja</label>
              <label className="ml-4"><input type="radio" name="steuerpflicht" value="false" checked={form.steuerpflicht === false} onChange={handleChange} /> Nein</label>
            </div>
          </div>
          <div>
            <label>Haben Sie im Zielland ein Bankkonto?</label>
            <div>
              <label><input type="radio" name="bankkonto" value="true" checked={form.bankkonto === true} onChange={handleChange} /> Ja</label>
              <label className="ml-4"><input type="radio" name="bankkonto" value="false" checked={form.bankkonto === false} onChange={handleChange} /> Nein</label>
            </div>
          </div>
          <div>
            <label>Wie viele Tage haben Sie in den letzten 12 Monaten im Zielland verbracht?</label>
            <input type="number" name="tageVorher" value={form.tageVorher} onChange={handleChange} className="w-full border p-2" />
          </div>
          <div>
            <label><input type="checkbox" name="bestaetigung" checked={form.bestaetigung} onChange={handleChange} /> Hiermit bestätige ich die Richtigkeit meiner Angaben</label>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Absenden</button>
        </form>
      )}

      {activeTab === "meine-anfragen" && (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Startland</th>
              <th>Zielland</th>
              <th>Startdatum</th>
              <th>Enddatum</th>
              <th>Arbeitstage</th>
              <th>Risikobewertung</th>
              <th>Genehmigung</th>
              <th>Buchungscode</th>
              <th>Download</th>
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
                <td className="text-blue-600 underline cursor-pointer">{a.dokumente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "mein-profil" && (
        <div className="space-y-2 max-w-2xl">
          {Object.entries(profil).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b py-1">
              <span className="font-medium w-1/3 capitalize">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
              <input className="border p-1 w-2/3" value={val} onChange={(e) => setProfil((prev) => ({ ...prev, [key]: e.target.value }))} />
            </div>
          ))}
        </div>
      )}

      {activeTab === "policy" && (
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <h2 className="font-bold">Workation-Richtlinie</h2>
            <p className="font-semibold">Maximale Anzahl an Tagen</p>
            <p>Ihre Unternehmensrichtlinie besagt, dass Sie bis zu {policy.maxTage} Arbeitstage im Ausland pro Kalenderjahr arbeiten können</p>
            <p className="font-semibold mt-2">Reiseländer</p>
            <p>Sie können Reisen zu jedem enthaltenen Ziel anfordern. Für die ausgeschlossenen Ziele sind Reisen deaktiviert.</p>
            <p className="font-bold mt-2">Enthaltene Länder:</p>
            <div className="flex flex-wrap gap-2">
              {policy.enthalteneLaender.map((l) => <span key={l} className="px-2 py-1 border rounded bg-gray-100">{l}</span>)}
            </div>
            <p className="text-xs text-gray-500 mt-2">Die in Rot hervorgehobenen Länder gehören zur Liste der nicht empfohlenen Länder.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {policy.dokumente.map((d) => (
              <div key={d.name} className="p-3 border rounded">
                <h3 className="font-semibold">{d.titel}</h3>
                <p>{d.name} ({d.groesse})</p>
                <p className="text-sm text-gray-500">Akzeptiert am {d.datum}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "destinationen" && (
        <ul className="list-disc pl-6">
          {destinationen.map((d) => <li key={d}>{d}</li>)}
        </ul>
      )}
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
