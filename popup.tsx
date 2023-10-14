import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  const onSavePage = () => {
    console.log('onSavePage-->',)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: '400px'
      }}>
      <h2>
        Welcome to your
        <a href="https://www.plasmo.com" target="_blank">
          {" "}
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>

      <button onClick={onSavePage}>
        Save Page1
      </button>
    </div>
  )
}

export default IndexPopup
