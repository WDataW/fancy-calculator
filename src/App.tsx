import { useState } from 'react'
import './App.css'
import { isValid, parse } from './utils/calculations';

function App() {
  const [expression, setExpression] = useState('')
  const [postfix, setPostfix] = useState('');
  const [isValids, setIsValids] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setExpression(e.target.value);
    setIsValids(isValid(parse(e.target.value)));

  }


  return (
    <>
      <input className='text-black bg-white border' value={expression} onChange={handleChange} type="text" />
      <div className='border text-black mt-10 w-100 h-20 bg-white'>{isValids ? "valid" : "invalid"}</div>
    </>
  )
}

export default App
