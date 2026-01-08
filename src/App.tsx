import Calculator from './ui/Calculator';
import Guide from './ui/Guide';
import Header from './ui/Header';

function App() {
  return (
    <div className=' pb-[0.5rem] h-full'>
      <Header></Header>
      <div className=' relative justify-items-center grid grid-cols-1 sm:grid-cols-2 gap-[1rem] mx-[2rem] my-[1rem]'>
        <Calculator className='z-2 sm:justify-self-end' />
        <Guide className='sm:justify-self-start'></Guide>
      </div>
    </div>
  )
}

export default App
