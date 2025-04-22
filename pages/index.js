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

  const destinationen = ["Spanien", "Italien", "Frankreich", "Griechenland", "Türkei", "Deutschland", "Kroatien", "Österreich", "Schweiz", "Portugal", "Niederlande", "Belgien", "Polen", "Tschechien", "Ungarn", "Dänemark", "Schweden", "Norwegen", "Finnland", "Irland", "Großbritannien", "USA", "Kanada", "Mexiko", "Brasilien", "Thailand", "Indonesien", "Japan", "China", "Australien", "Neuseeland", "Marokko", "Ägypten", "Südafrika"]

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow-md p-6 space-y-2">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Workation World</h1>
        <div className="space-y-2">
          <button onClick={() => setActiveTab("antrag-formular")}>Antrag stellen</button>
          <button onClick={() => setActiveTab("meine-anfragen")}>Meine Anfragen</button>
          <hr className="my-2" />
          <button onClick={() => setActiveTab("profil")}>Mein Profil</button>
          <button onClick={() => setActiveTab("policy")}>Workation Policy</button>
          <hr className="my-4" />
          <button onClick={() => setActiveTab("destinationen")}>Meine Workation-Destinationen</button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-end items-center space-x-4 mb-6">
          <select className="border px-2 py-1 rounded">
            <option>DE</option>
            <option>EN</option>
          </select>
          <div className="bg-blue-900 text-white px-3 py-1 rounded-full">TB – Tobias Benz</div>
        </div>

        {activeTab === "profil" && (
          <div className="max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">Mein Profil</h2>
            <div className="bg-white shadow rounded p-4 space-y-6">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Persönliche Daten</h3>
                <table className="w-full table-auto text-sm">
                  <tbody>
                    {Object.entries({
                      "Vor- und Nachname": "name",
                      "Staatsangehörigkeit": "staatsangehoerigkeit",
                      "Zweite Staatsangehörigkeit": "zweiteStaatsangehoerigkeit",
                      "Geschlecht": "geschlecht",
                      "Geburtsdatum": "geburtsdatum",
                      "Geburtsort": "geburtsort"
                    }).map(([label, key]) => (
                      <tr key={key} className="border-t">
                        <td className="py-2 pr-4 font-semibold text-gray-600">{label}</td>
                        <td><input className="border px-2 py-1 w-full" value={profil[key]} onChange={e => setProfil(p => ({ ...p, [key]: e.target.value }))} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="font-bold text-gray-700 mb-2">Wohnadresse</h3>
                <table className="w-full table-auto text-sm">
                  <tbody>
                    {Object.entries({
                      "Strasse und Hausnummer": "strasse",
                      "Postleitzahl": "plz",
                      "Stadt": "stadt",
                      "Land": "land"
                    }).map(([label, key]) => (
                      <tr key={key} className="border-t">
                        <td className="py-2 pr-4 font-semibold text-gray-600">{label}</td>
                        <td><input className="border px-2 py-1 w-full" value={profil[key]} onChange={e => setProfil(p => ({ ...p, [key]: e.target.value }))} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="font-bold text-gray-700 mb-2">Offizielle Informationen</h3>
                <table className="w-full table-auto text-sm">
                  <tbody>
                    {Object.entries({
                      "Land der Lohnabrechnung": "lohnabrechnung",
                      "Krankenversicherung": "krankenkasse",
                      "Öffentliche Krankenversicherung": "krankenversicherung",
                      "Sozialversicherungsnummer": "svNummer"
                    }).map(([label, key]) => (
                      <tr key={key} className="border-t">
                        <td className="py-2 pr-4 font-semibold text-gray-600">{label}</td>
                        <td><input className="border px-2 py-1 w-full" value={profil[key]} onChange={e => setProfil(p => ({ ...p, [key]: e.target.value }))} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="font-bold text-gray-700 mb-2">Jobinformationen</h3>
                <table className="w-full table-auto text-sm">
                  <tbody>
                    {Object.entries({
                      "Berufsbezeichnung": "beruf",
                      "Abteilung": "abteilung",
                      "Eintrittsdatum": "eintritt",
                      "E-Mail-Adresse der Führungskraft": "vorgesetzte",
                      "Bietet lokale Dienste an": "lokaleDienste",
                      "Vollmacht": "vollmacht",
                      "Oberes Management / Vertrieb / Beschaffung": "management"
                    }).map(([label, key]) => (
                      <tr key={key} className="border-t">
                        <td className="py-2 pr-4 font-semibold text-gray-600">{label}</td>
                        <td><input className="border px-2 py-1 w-full" value={profil[key]} onChange={e => setProfil(p => ({ ...p, [key]: e.target.value }))} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "meine-anfragen" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Meine Workation-Anfragen</h2>
            <div className="bg-white rounded shadow p-4">
              <table className="min-w-full table-auto text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2">Startland</th>
                    <th className="px-4 py-2">Zielland</th>
                    <th className="px-4 py-2">Startdatum</th>
                    <th className="px-4 py-2">Enddatum</th>
                    <th className="px-4 py-2">Arbeitstage</th>
                    <th className="px-4 py-2">Risikobewertung</th>
                    <th className="px-4 py-2">Genehmigung</th>
                    <th className="px-4 py-2">Buchungscode</th>
                    <th className="px-4 py-2">Dokumente</th>
                  </tr>
                </thead>
                <tbody>
                  {anfragen.map((antrag, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">Deutschland</td>
                      <td className="px-4 py-2">{antrag.land}</td>
                      <td className="px-4 py-2">{antrag.start}</td>
                      <td className="px-4 py-2">{antrag.ende}</td>
                      <td className="px-4 py-2">{antrag.arbeitstage}</td>
                      <td className="px-4 py-2 text-blue-600">{antrag.risikobewertung}</td>
                      <td className="px-4 py-2 text-yellow-600">{antrag.genehmigung}</td>
                      <td className="px-4 py-2">{antrag.buchungscode}</td>
                      <td className="px-4 py-2">{antrag.dokumente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
