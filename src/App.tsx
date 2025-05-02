import { useState, useEffect } from 'react'
import './App.css'

interface FridayResponse {
  isFriday: boolean;
  message: string;
  dayOfWeek: string;
  date: string;
}

function App() {
  const [isSexta, setIsSexta] = useState<boolean | null>(null)
  const [message, setMessage] = useState<string>('')
  const [dayOfWeek, setDayOfWeek] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    fetch('https://tarefa-api-express.onrender.com/api/is-friday')
      .then(response => response.json())
      .then((data: FridayResponse) => {
        setIsSexta(data.isFriday)
        setMessage(data.message)
        setDayOfWeek(data.dayOfWeek)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Erro ao verificar se é sexta-feira')
        setIsLoading(false)
      })

    // Atualiza a data/hora a cada segundo
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        {isSexta ? 'SEXTOU! 🎉' : 'Ainda não é sexta-feira 😢'}
      </h1>
      <p className="text-lg text-gray-600">
        {message}
      </p>
      <p className="text-md text-gray-500">
        Hoje é {dayOfWeek}
      </p>
      <p className="text-lg text-gray-600">
        {currentDateTime.toLocaleString('pt-BR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })}
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Verificar novamente
      </button>
    </div>
  )
}

export default App
