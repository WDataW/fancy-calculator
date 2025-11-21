import { useState } from 'react'
import './App.css'
import { evaluate, isValid, postfix } from './utils/calculations';

function App() {
  const [expression, setExpression] = useState('')
  const [postfixs, setPostfixs] = useState(['']);
  const [value, setValue] = useState<string | number>();
  const [isValids, setIsValids] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setExpression(e.target.value);
    setIsValids(isValid(e.target.value));
    setPostfixs(postfix(e.target.value));
    setValue(evaluate(e.target.value));
  }


  return (
    <>
      <input className='text-black bg-white border' value={expression} onChange={handleChange} type='text' />
      <div className='border text-black mt-10 w-100 h-20 bg-white'>{isValids ? 'valid' : 'invalid'}</div>
      <div className='border text-black mt-10 w-100 h-20 bg-white'>{isValids && postfixs.join(' ')}</div>
      <div className='border text-black mt-10 w-100 h-20 bg-white'>{value}</div>
    </>
  )
}

export default App
