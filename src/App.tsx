import Calculator from './ui/Calculator';
import Header from './ui/Header';

function App() {
  return (
    <div className=' min-h-[100dvh] bg-[var(--color-page-bg)]'>
      <Header></Header>
      <div className='relative justify-items-center grid grid-cols-1 items-start sm:items-center justify-center'>
        <Calculator className='m-[2rem] z-2' />
      </div>
    </div>
  )
}

export default App
