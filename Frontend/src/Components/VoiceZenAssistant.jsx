import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BsMicFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

const DEFAULT_PROMPT = 'Tap the mic and say: start a zen session of 25 minutes.'

const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
}

const normalizeTranscript = (value) =>
  value.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()

const parseWordDuration = (tokens) => {
  for (let index = 0; index < tokens.length; index += 1) {
    const current = numberWords[tokens[index]]

    if (!current) {
      continue
    }

    const next = numberWords[tokens[index + 1]]

    if (current >= 20 && next && next < 10) {
      return current + next
    }

    return current
  }

  return null
}

const parseVoiceIntent = (transcript) => {
  const normalized = normalizeTranscript(transcript)

  if (!normalized) {
    return null
  }

  const wantsToStart = /\b(start|begin|launch)\b/.test(normalized)
  const mentionsSession = /\b(zen|timer|session|focus)\b/.test(normalized)

  if (!wantsToStart || !mentionsSession) {
    return null
  }

  const numericMatch = normalized.match(/(\d+)\s*(minute|minutes|min)\b/)
  const tokens = normalized.split(' ')
  const wordDuration = /\b(minute|minutes|min)\b/.test(normalized) ? parseWordDuration(tokens) : null
  const duration = numericMatch ? Number(numericMatch[1]) : wordDuration

  if (!duration || Number.isNaN(duration) || duration <= 0) {
    return null
  }

  return {
    action: 'start_timer',
    duration,
    topic: 'Zen Session',
  }
}

const formatTimeLeft = (timeLeftMs) => {
  const totalSeconds = Math.max(0, Math.ceil(timeLeftMs / 1000))
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

const VoiceZenAssistant = () => {
  const recognitionRef = useRef(null)
  const timerIntervalRef = useRef(null)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [statusMessage, setStatusMessage] = useState(DEFAULT_PROMPT)
  const [timerConfig, setTimerConfig] = useState(null)
  const [timeLeftMs, setTimeLeftMs] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!timerConfig) {
      setTimeLeftMs(0)

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }

      return undefined
    }

    const updateTimeLeft = () => {
      const nextTimeLeft = timerConfig.endsAt - Date.now()

      if (nextTimeLeft <= 0) {
        setTimeLeftMs(0)
        setTimerConfig(null)
        setStatusMessage(`Zen session complete. Nice work.`)
        return
      }

      setTimeLeftMs(nextTimeLeft)
    }

    updateTimeLeft()
    timerIntervalRef.current = setInterval(updateTimeLeft, 1000)

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
    }
  }, [timerConfig])

  useEffect(() => () => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null
      recognitionRef.current.onerror = null
      recognitionRef.current.onend = null
      recognitionRef.current.stop()
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }
  }, [])

  const timerLabel = useMemo(() => formatTimeLeft(timeLeftMs), [timeLeftMs])

  const startTimerFromIntent = (intent) => {
    const durationMs = intent.duration * 60 * 1000

    setTimerConfig({
      duration: intent.duration,
      endsAt: Date.now() + durationMs,
      topic: intent.topic,
    })
    setIsExpanded(true)
    setStatusMessage(`Starting a ${intent.duration}-minute zen session.`)
  }

  const handleTranscript = (spokenText) => {
    setTranscript(spokenText)

    const intent = parseVoiceIntent(spokenText)

    if (!intent) {
      setStatusMessage('I can currently start zen timers only. Try: start a zen session of 25 minutes.')
      setIsExpanded(true)
      return
    }

    startTimerFromIntent(intent)
  }

  const handleStartListening = () => {
    const SpeechRecognitionApi =
      typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)

    if (!SpeechRecognitionApi) {
      setStatusMessage('Voice input is not supported in this browser yet.')
      setIsExpanded(true)
      return
    }

    if (isListening) {
      return
    }

    const recognition = new SpeechRecognitionApi()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setIsExpanded(true)
      setStatusMessage('Listening for a zen timer command...')
    }

    recognition.onresult = (event) => {
      const spokenText = event.results?.[0]?.[0]?.transcript?.trim() ?? ''
      handleTranscript(spokenText)
    }

    recognition.onerror = (event) => {
      setStatusMessage(event.error === 'not-allowed' ? 'Microphone access was blocked.' : 'Voice capture failed. Please try again.')
    }

    recognition.onend = () => {
      setIsListening(false)
      recognitionRef.current = null
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const handleStopTimer = () => {
    setTimerConfig(null)
    setStatusMessage(DEFAULT_PROMPT)
    setTranscript('')
  }

  return (
    <div className='pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3'>
      {isExpanded && (
        <div className='pointer-events-auto w-[min(22rem,calc(100vw-2.5rem))] rounded-[28px] border border-stone-200 bg-white/95 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <p className='text-sm font-semibold text-stone-900'>Voice Zen</p>
              <p className='mt-1 text-sm leading-6 text-stone-600'>{statusMessage}</p>
            </div>

            <button
              type='button'
              onClick={() => setIsExpanded(false)}
              aria-label='Close voice assistant'
              className='rounded-full p-1 text-stone-500 transition hover:bg-stone-100 hover:text-stone-700'
            >
              <IoClose className='text-lg' />
            </button>
          </div>

          {transcript && (
            <div className='mt-3 rounded-2xl bg-stone-100 px-3 py-2 text-sm text-stone-700'>
              Heard: "{transcript}"
            </div>
          )}

          {timerConfig && (
            <div className='mt-4 rounded-3xl bg-stone-900 px-4 py-4 text-white'>
              <p className='text-xs uppercase tracking-[0.24em] text-stone-300'>Active session</p>
              <div className='mt-2 flex items-end justify-between gap-3'>
                <div>
                  <p className='text-sm text-stone-300'>{timerConfig.topic}</p>
                  <p className='text-3xl font-semibold leading-none'>{timerLabel}</p>
                </div>

                <button
                  type='button'
                  onClick={handleStopTimer}
                  className='rounded-full border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10'
                >
                  Stop
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        type='button'
        onClick={handleStartListening}
        aria-label='Start voice instruction'
        className={`pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[0_16px_40px_rgba(239,68,68,0.34)] transition duration-200 ${
          isListening ? 'scale-105 bg-red-600' : 'bg-red-500 hover:scale-105 hover:bg-red-600'
        }`}
      >
        <BsMicFill className='text-2xl' />
      </button>
    </div>
  )
}

export default VoiceZenAssistant
