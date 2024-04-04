export function AnimationText({ textType, text }) {

    return (
      <>
      {textType === "text" ? (
        <div className="py-2" style={{ paddingLeft: "7.5%", paddingRight: "7.5%", fontSize: "calc(8px + 1vmin)"}}>
          {text}
        </div>
      ) : (
        <div className="h2 py-2 font-bold" style={{ paddingLeft: "7.5%", paddingRight: "7.5%" }}>
          {text}
        </div>
        )}
      </>
    )
  }
  