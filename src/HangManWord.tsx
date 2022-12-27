import React from 'react'

type HangManWordProps={
    GuessedLetters: string[],
    WordToGuess: string
    reveal?: boolean
}

export default function HangManWord({GuessedLetters, WordToGuess, reveal=false}: HangManWordProps) {

  return (
    <div style={{
        display: "flex",
        gap: "0.25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}>
        {WordToGuess.split("").map((letter, index)=>(
            <span style={{borderBottom:"0.1em solid black"}} key={index}> 
                <span style={{
                    visibility: GuessedLetters.includes(letter) || reveal?"visible":"hidden",
                    color: !GuessedLetters.includes(letter) && reveal? "red" : "black"
                }}>{letter}</span>
            </span>
        ))}
    </div>
  )
}
