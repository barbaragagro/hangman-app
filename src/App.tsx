import React, {useCallback, useEffect, useState} from 'react'
import words from './wordList.json'
import HangManDrawing from './HangManDrawing';
import HangManWord from './HangManWord';
import Keyboard from './Keyboard';
import './App.css'


function App() {
 
  const [WordToGuess, setWordToGuess] = useState(()=>{
    return words[Math.floor(Math.random()*words.length)]
  });

  const [GuessedLetters, setGuessedLetters] = useState<string[]>([])

  const inCorrectLetters =  GuessedLetters.filter(
    letter => !WordToGuess.includes(letter)
  )

  const isLoser = inCorrectLetters.length >=6
  const isWinner = WordToGuess.split("").every(letter=>
    GuessedLetters.includes(letter))
  
  
    const addGuessedLetter = useCallback((letter:string)=>{
    if(GuessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [GuessedLetters, isLoser, isWinner])



    useEffect(()=>{
      const handler = (e : KeyboardEvent) =>{
          const key =e.key

          if(!key.match(/^[a-z]$/)) return

          e.preventDefault()
          addGuessedLetter(key)
      }
      document.addEventListener("keypress", handler)

      return ()=>{
        document.removeEventListener("keypress", handler)
      }
    }, [GuessedLetters])


  return (
    <div className="App">
      <div className='lose-win'>
        {isWinner?"Congratulations, You Won! Refresh to play again!":""} 
        {isLoser?"O NO, You Lost! Refresh to try again!":""} 
      </div>
      <HangManDrawing 
        numberOfGuesses={inCorrectLetters.length}
      />
      <HangManWord 
        reveal={isLoser}
        GuessedLetters={GuessedLetters} 
        WordToGuess={WordToGuess}
      />
      <div style={{alignSelf:"stretch"}}>
        <Keyboard 
          disabled={isLoser || isWinner}
          activeLetter={GuessedLetters.filter(letter=>
            WordToGuess.includes(letter)
            )}
          inactiveLetter={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
          />
      </div>
    </div>
  )
}

export default App
