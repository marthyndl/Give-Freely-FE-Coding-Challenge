import { useEffect, useState } from "react"

function IndexPopup() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState(null)
  const [website, setWebsite] = useState(null)
  const [websiteFiltered, setWebsiteFiltered] = useState("")
  const url = "https://api.jsonbin.io/v3/b/64678cf09d312622a36121b8"

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key":
          "$2b$10$MNPmZksz.FBzE1nYLeCQQeKeANXupcUxBIzQoXSHz3D2R2QPNHh.6"
      }
    })
      .then((res) => res.json())
      .then((datos) => {
        setIsLoaded(true)
        setData(datos)
        setWebsite(datos.record.websites)
      })
  }, [])

  return (
    <div
      style={{
        display: "block",
        padding: 16,
        width: "550px"
      }}>
      {isLoaded ? (
        <>
          <h2>
            Welcome to the extension of {data.metadata.name} made in Plasmo
            Extension!
          </h2>
          <div>
            <h2>websites</h2>
            {website.map((e, i) => {
              return (
                <div key={i}>
                  <h4>{e.name}</h4>
                  <a href={e.url} target="_blank">
                    {e.url}
                  </a>
                  <div>
                    {e.messages.map((element, index) => (
                      <p key={index}>{element}</p>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <input
            type="text"
            onChange={({ target }) => setWebsiteFiltered(target.value)}
            value={websiteFiltered}
            placeholder="Type in your chosen website!"
          />

          {website && (
            <ul>
              {website
                .filter(
                  ({ name, url }) =>
                    name
                      .toLowerCase()
                      .includes(websiteFiltered.toLowerCase()) ||
                    url.toLowerCase().includes(websiteFiltered.toLowerCase())
                )
                .map(({ name, url, messages }) => (
                  <li key={name}>
                    <p style={{ color: websiteFiltered && "green" }}>
                      <strong>{name}</strong>
                    </p>
                    <a href={url} target="_blank">
                      {url}
                    </a>
                    <div>
                      {messages.map((element, index) => (
                        <p key={index}>{element}</p>
                      ))}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  )
}

export default IndexPopup
