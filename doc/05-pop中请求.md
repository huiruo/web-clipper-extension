```js
import { useState } from "react"
import type { Breach } from "../types"

const useBreach = () => {
    const [breaches, setBreaches] = useState<null | Breach[]>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [domain, setDomain] = useState<string>("")

    const getBreach = async () => {
        setLoading(true)
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        const { hostname } = new URL(tab.url)
        const [_, sld, tld] = hostname.split(".")
        const domain = `${sld}.${tld}`
        setDomain(hostname)
        const reqBreach = `https://haveibeenpwned.com/api/v3/breaches/?domain=${domain}`
        console.log('req2:',reqBreach)
        const response: Breach[] = await fetch(reqBreach).then((res) => res.json()) as Breach[]
        if (response.length > 0) setBreaches(response)
        setLoading(false)
    }

    return { breaches, getBreach, domain, loading }
}

export default useBreach
```

```js
const Popup = () => {
    const { breaches, getBreach, domain, loading } = useBreach()

    React.useEffect(() => { getBreach() }, [domain])
    return (
        <div style={styles.container}>
            <Stack align={"center"} style={styles.contents}>
                <ExtensionTitle />
                <DomainComponent domain={domain} />
                {loading ? <Loader size={'xl'} /> : <Status breaches={breaches} />}
            </Stack>
        </div>

    )
}

export default Popup
```

```curl
curl 'https://haveibeenpwned.com/api/v3/breaches/?domain=facebook.com' \
  -H 'sec-ch-ua: "Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"' \
  -H 'Referer;' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --compressed
```