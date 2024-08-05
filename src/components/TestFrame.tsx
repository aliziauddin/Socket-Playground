import { useEffect, useState } from "react"

import "./App.css"

interface MessageEventData {
  type: string
  notes: {
    chiefComplaint: string
    historyOfPresentation: string
    pastMedicalHistory: string
    allergy: string
    medication: string
    socialHistory: string
    familyHistory: string
    examination: string
    diagnosis: string
    plan: string
  }
}

const App: React.FC = () => {
  const [chiefComplaint, setChiefComplaint] = useState("")
  const [historyOfPresentation, setHistoryOfPresentation] = useState("")
  const [pastMedicalHistory, setPastMedicalHistory] = useState("")
  const [allergy, setAllergy] = useState("")
  const [medication, setMedication] = useState("")
  const [socialHistory, setSocialHistory] = useState("")
  const [familyHistory, setFamilyHistory] = useState("")
  const [examination, setExamination] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [plan, setPlan] = useState("")

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check the origin to ensure security
      if (event.origin !== "http://localhost:5173") {
        return
      }

      const { type, notes }: MessageEventData = event.data

      console.log({ type, notes })

      if (type === "COPY_TEXT") {
        if (type === "COPY_TEXT") {
          setChiefComplaint(notes.chiefComplaint)
          setHistoryOfPresentation(notes.historyOfPresentation)
          setPastMedicalHistory(notes.pastMedicalHistory)
          setAllergy(notes.allergy)
          setMedication(notes.medication)
          setSocialHistory(notes.socialHistory)
          setFamilyHistory(notes.familyHistory)
          setExamination(notes.examination)
          setDiagnosis(notes.diagnosis)
          setPlan(notes.plan)
        }
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  return (
    <div className="App">
      <iframe
        src="http://localhost:5173" // URL of the other React app
        title="Embedded React App"
        allow="microphone; camera; fullscreen"
        style={{
          border: "none",
          width: "40%",
          height: "80vh",
          position: "absolute",
          right: 0,
          top: 0
        }}
      ></iframe>
      <div
        className="form-container"
        style={{
          position: "absolute",
          left: 10,
          top: 0
        }}
      >
        <h2>Medical Record</h2>
        <div className="form-group">
          <label htmlFor="chiefComplaint">Chief Complaint:</label>
          <input
            id="chiefComplaint"
            type="text"
            value={chiefComplaint}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="historyOfPresentation">
            History of Presentation:
          </label>
          <input
            id="historyOfPresentation"
            type="text"
            value={historyOfPresentation}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="pastMedicalHistory">
            Past Medical and Surgical History:
          </label>
          <input
            id="pastMedicalHistory"
            type="text"
            value={pastMedicalHistory}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="allergy">Allergy:</label>
          <input id="allergy" type="text" value={allergy} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="medication">Medication:</label>
          <input id="medication" type="text" value={medication} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="socialHistory">Social History:</label>
          <input
            id="socialHistory"
            type="text"
            value={socialHistory}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="familyHistory">Family History:</label>
          <input
            id="familyHistory"
            type="text"
            value={familyHistory}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="examination">Examination:</label>
          <input id="examination" type="text" value={examination} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="diagnosis">Diagnosis:</label>
          <input id="diagnosis" type="text" value={diagnosis} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="plan">Plan:</label>
          <input id="plan" type="text" value={plan} readOnly />
        </div>
      </div>
    </div>
  )
}
export default App
