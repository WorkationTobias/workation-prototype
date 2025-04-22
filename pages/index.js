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

      {/* Inhalte folgen abhängig vom activeTab */}
      {activeTab === "antrag" && <div>Workation-Antrag Formular hier</div>}
      {activeTab === "meine-anfragen" && <div>Meine Anfragen Tabelle hier</div>}
      {activeTab === "mein-profil" && <div>Mein Profil Felder hier</div>}
      {activeTab === "policy" && <div>Workation Policy Info hier</div>}
      {activeTab === "destinationen" && <div>Liste der Destinationen hier</div>}
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
