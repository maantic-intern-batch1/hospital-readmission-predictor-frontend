import { useState } from 'react';
import FormLayout from './pages/FormLayout'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Output from './pages/Output';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormLayout loading={loading} setLoading={setLoading} setOutput={setOutput}/>}/>
        <Route path='/output' element={<Output output={output}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App