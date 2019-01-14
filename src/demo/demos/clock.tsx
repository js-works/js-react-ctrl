import React from 'react'

const { useEffect, useState } = React as any

function Clock() {
  const
    [time, setTime] = useState(() => new Date().toLocaleTimeString())

  useEffect(() => {
    const id =
      setInterval(
        () => setTime(new Date().toLocaleTimeString()),
        100)

    return () => clearInterval(id)
  }, [])

  return (
    <div>
      Time: {time}
    </div>
  )
}

export default <Clock/>
