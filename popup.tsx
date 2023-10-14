import { useEffect, useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")
  const [currentUrl, setCurrentUrl] = useState<string>("")

  const getCurrentUrl: () => Promise<void> = async () => {
    const [ tab ] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    const { hostname } = new URL(tab.url)
    const [_, sld, tld] = hostname.split(".")
    const domain = `${sld}.${tld}`

    console.log('getCurrentUrl:',{ tab,domain })
    setCurrentUrl(tab.url)
  }

  const onSavePage = () => {
    console.log('onSavePage-->',)
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener((info) => {

      console.log('popup.tsx-effect:', info, '--', info.type, info.text)
      if (info.type === 'event1') {
        // Todo
      }

      return true
    })
  }, [])

  useEffect(()=>{
    getCurrentUrl()
  },[currentUrl])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: '400px'
      }}>
      {/* <input onChange={(e) => setData(e.target.value)} value={data} /> */}
      your currentUrl is: { currentUrl }

      <button onClick={onSavePage}>
        Save Page1
      </button>
    </div>
  )
}

export default IndexPopup
