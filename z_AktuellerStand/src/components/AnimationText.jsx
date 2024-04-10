export function AnimationText({ typeText, text }) {

    return (
      <>
      {typeText === "text" ? (
        <div className="py-2 font-normal" style={{ paddingLeft: "7.5%", paddingRight: "7.5%", fontSize: "calc(8px + 1vmin)", color: "inherit" }}>
          {text}
        </div>
      ) : (
        <div className="h2 py-2 font-bold" style={{ paddingLeft: "7.5%", paddingRight: "7.5%", color: "inherit" }}>
          {text}
        </div>
        )}
      </>
    )
  }
  