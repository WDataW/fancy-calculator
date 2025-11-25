import { useState } from 'react'
import { calculate } from './utils/calculations';

function App() {

  const [expression, setExpression] = useState('')
  const [value, setValue] = useState<string>();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setExpression(e.target.value);
    setValue(calculate(e.target.value));
  }


  return (
    <div className='bg-black min-h-screen'>
      <input className='text-black bg-white border' value={expression} onChange={handleChange} type='text' />
      <div className='border text-black mt-10 w-full h-20 bg-white'>{value}</div>
    </div>
  )
}

export default App
