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
    vertrag: false,
    familie: false,
    sensibel: [],
    steuerpflicht: false,
    bankkonto: false,
    tageVorher: 0,
    bestaetigung: false
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === "checkbox") {
      if (name === "sensibel") {
        setForm((prev) => {
          const values = new Set(prev.sensibel)
          if (checked) values.add(value)
          else values.delete(value)
          return { ...prev, sensibel: Array.from(values) }
        })
      } else {
        setForm((prev) => ({ ...prev, [name]: checked }))
      }
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
    setActiveTab("meine-anfragen")
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Workation World</h1>
        <button onClick={() => setActiveTab("antrag")}>Antrag stellen</button>
        <button onClick={() => setActiveTab("meine-anfragen")}>Meine Anfragen</button>
        <button onClick={() => setActiveTab("profil")}>Mein Profil</button>
        <button onClick={() => setActiveTab("policy")}>Workation Policy</button>
        <div className="border-t pt-4">
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

        {activeTab === "antrag" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Ihre Reiseanfrage</h2>
            <div className="flex space-x-4 mb-6">
              <span className={step >= 1 ? "font-semibold text-blue-900" : "text-gray-400"}>Reisedaten</span>
              <span className={step >= 2 ? "font-semibold text-blue-900" : "text-gray-400"}>Reisedetails</span>
              <span className={step >= 3 ? "font-semibold text-blue-900" : "text-gray-400"}>Allgemeine Angaben</span>
              <span className={step === 4 ? "font-semibold text-blue-900" : "text-gray-400"}>Zusammenfassung</span>
            </div>

            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3>Zusammenfassung</h3>
                <p><strong>Land:</strong> {form.land}</p>
                <p><strong>Dauer:</strong> {form.start} bis {form.ende}</p>
                <p><strong>Arbeitstage:</strong> {form.arbeitstage}</p>
                <p><strong>Vertraglich tätig:</strong> {form.vertrag ? "Ja" : "Nein"}</p>
                <p><strong>Familie vor Ort:</strong> {form.familie ? "Ja" : "Nein"}</p>
                <p><strong>Daten-Sensibilität:</strong> {form.sensibel.join(", ")}</p>
                <p><strong>Steuerpflicht:</strong> {form.steuerpflicht ? "Ja" : "Nein"}</p>
                <p><strong>Bankkonto:</strong> {form.bankkonto ? "Ja" : "Nein"}</p>
                <p><strong>Vorherige Aufenthaltstage:</strong> {form.tageVorher}</p>
                <label><input type="checkbox" name="bestaetigung" checked={form.bestaetigung} onChange={handleChange} /> Ich bestätige die Angaben</label>
                <button type="submit" className="btn">Absenden</button>
              </form>
            )}
          </div>
        )}

        {activeTab === "meine-anfragen" && submitted && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Meine Workation-Anfragen</h2>
            <div className="bg-white rounded shadow p-4">
              <p>Ihr Antrag auf Workation nach {form.land} vom {form.start} bis {form.ende} wurde eingereicht.</p>
              <div className="mt-4">
                <h3 className="font-semibold">Status</h3>
                <p className="text-yellow-600">In Bearbeitung</p>
                <h4 className="mt-4 font-semibold">Genehmigungen</h4>
                <ul className="space-y-2">
                  <li><strong>Manager-Genehmigung:</strong> <span className="text-yellow-600">Ausstehend</span></li>
                  <li><strong>HR-Genehmigung:</strong> <span className="text-yellow-600">Ausstehend</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
