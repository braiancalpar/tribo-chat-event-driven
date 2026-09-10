import { useState } from 'react'
import { conversaContext } from './context'

export const ConversaProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <conversaContext.Provider value={{ data, setData }}>
      {children}
    </conversaContext.Provider>
  )
}