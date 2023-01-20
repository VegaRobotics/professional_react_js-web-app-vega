import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./routes/Home'));
const Vixem = lazy(() => import('./routes/Vixem'));
const Algoritmos = lazy(() => import('./routes/Algoritmos'));
const PesoBruto = lazy(() => import('./routes/PesoBruto'));
const ForcaCorte = lazy(() => import('./routes/ForcaCorte'));
const Quotes = lazy(() => import('./routes/Quotes'));
const ForcaDobra = lazy(() => import('./routes/ForcaDobra'));
const ConsumoEnergia = lazy(() => import('./routes/EnergyConsumption'));
const Cronometro = lazy(() => import('./routes/StopWatch'));

export default function App() {
  return (
    <Router>
     <Suspense fallback={<div>Loading...</div>}>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/vixem" element={<Vixem />} />
         <Route path="/algoritmos" element={<Algoritmos />} />
         <Route path="/pesobruto" element={<PesoBruto />} />
         <Route path="/forcacorte" element={<ForcaCorte />} />
         <Route path="/quotes" element={<Quotes />} />
         <Route path="/forcadobra" element={<ForcaDobra />} />
         <Route path="/energyconsumption" element={<ConsumoEnergia />} />
         <Route path="/stopwatch" element={<Cronometro />} />
       </Routes>
      </Suspense>
    </Router>
  );
}