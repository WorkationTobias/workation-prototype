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

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Workation World</h1>
        <button onClick={() => setActiveTab("antrag-formular" )} className="block w-full text-left">Antrag stellen</button>
        <button onClick={() => setActiveTab("meine-anfragen")} className="block w-full text-left">Meine Anfragen</button>
        <hr className="my-2 border-gray-300" />
        <button onClick={() => setActiveTab("profil")} className="block w-full text-left">Mein Profil</button>
        <button onClick={() => setActiveTab("policy")} className="block w-full text-left">Workation Policy</button>
        <hr className="my-4 border-gray-300" />
        <button onClick={() => setActiveTab("destinationen")} className="block w-full text-left">Meine Workation-Destinationen</button>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-end items-center space-x-4 mb-6">
          <select className="border px-2 py-1 rounded">
            <option>DE</option>
            <option>EN</option>
          </select>
          <div className="bg-blue-900 text-white px-3 py-1 rounded-full">TB – Tobias Benz</div>
        </div>

        {activeTab === "antrag-formular" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Workation-Antrag stellen</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="land" placeholder="Zielland" value={form.land} onChange={handleChange} className="w-full border px-2 py-1" />
              <input name="start" type="date" value={form.start} onChange={handleChange} className="w-full border px-2 py-1" />
              <input name="ende" type="date" value={form.ende} onChange={handleChange} className="w-full border px-2 py-1" />
              <input name="arbeitstage" type="number" placeholder="Arbeitstage" value={form.arbeitstage} onChange={handleChange} className="w-full border px-2 py-1" />
              <div>
                <label className="block mb-1">Sind Sie im Zielland steuerpflichtig?</label>
                <label className="mr-4"><input type="radio" name="steuerpflicht" value="true" checked={form.steuerpflicht === true} onChange={handleChange} /> Ja</label>
                <label><input type="radio" name="steuerpflicht" value="false" checked={form.steuerpflicht === false} onChange={handleChange} /> Nein</label>
              </div>
              <div>
                <label className="block mb-1">Haben Sie im Zielland ein Bankkonto?</label>
                <label className="mr-4"><input type="radio" name="bankkonto" value="true" checked={form.bankkonto === true} onChange={handleChange} /> Ja</label>
                <label><input type="radio" name="bankkonto" value="false" checked={form.bankkonto === false} onChange={handleChange} /> Nein</label>
              </div>
              <div>
                <label className="block mb-1">Wie viele Tage haben Sie in den letzten 12 Monaten im Zielland verbracht?</label>
                <input name="tageVorher" type="number" value={form.tageVorher} onChange={handleChange} className="w-full border px-2 py-1" />
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input name="bestaetigung" type="checkbox" checked={form.bestaetigung} onChange={handleChange} className="mr-2" />
                  Hiermit bestätige ich die Richtigkeit meiner Angaben
                </label>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Absenden</button>
            </form>
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
