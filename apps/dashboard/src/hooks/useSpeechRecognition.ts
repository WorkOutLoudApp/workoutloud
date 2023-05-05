import { usePlayStatus } from "@src/context/PlayStatus"
import { useState, useEffect } from "react"

let recognition: SpeechRecognition = null


const useSpeechRecognition = () => {
    const [text, setText] = useState('')
    const { isListening, setIsListening } = usePlayStatus()

    // initialize when the component is first loaded
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if ('webkitSpeechRecognition' in window) {
                const speechRecognitionList = new webkitSpeechGrammarList()
                const grammar = '#JSGF V1.0; grammar voiceCommands; public <command> = play | pause | stop | forward | backward | rewind ;';
                recognition = new webkitSpeechRecognition()
                speechRecognitionList.addFromString(grammar, 1)
                recognition.grammars = speechRecognitionList
                recognition.continuous = false
                recognition.lang = 'en-US'
                recognition.interimResults = false
                recognition.maxAlternatives = 1
                
                recognition.onresult = (event: SpeechRecognitionEvent) => {
                    const voiceCommand = event.results[0][0].transcript
                    const validCommands = ['play', 'pause', 'stop', 'forward', 'rewind', 'mute'] 
                    if (validCommands.includes(voiceCommand)) {
                        setText(voiceCommand)
                        console.log('valid')
                    } else { console.log('invalid voice command')}
                    console.log(voiceCommand)
                    if (voiceCommand === 'mute') {
                        recognition.onend = () => {
                            console.log('turned off microphone')
                        }
                    } else {
                        recognition.onend = () => {
                            startListening()
                        }
                    }
                    recognition.stop()
                    setIsListening(false)
                }
            }
            if (!recognition) return

        }
    }, [])

    const startListening = () => {
        setIsListening(true)
        recognition.start()
    }

    const stopListening = () => {
        setIsListening(false)
        recognition.onend = () => {
        }
        recognition.stop()
    }

    return {
        text, setText, isListening, setIsListening, startListening, stopListening, hasRecognitionSupport: !!recognition
    }

}

export default useSpeechRecognition