import React, { Suspense, lazy, useState } from 'react';
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
const VSystem = lazy(() => import('./routes/VSystem'));
const Artigos = lazy(() => import('./routes/Artigos'));
const Loading = lazy(() => import('./routes/Loading'));
const Engenharia = lazy(() => import('./routes/Engenharia'));
const KanbanBoard = lazy(() => import('./routes/KanbanBoard'));
const BoasPraticasProjetos = lazy(() => import('./routes/BoasPraticasProjetos'));

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 20000);

  return (
    <Router>
     <Suspense fallback={isLoading && <Loading/>}>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/vixem" element={<Vixem />} />
         <Route path="/algoritmos" element={<Algoritmos />} />
         <Route path="/artigos" element={<Artigos />} />
         <Route path="/pesobruto" element={<PesoBruto />} />
         <Route path="/forcacorte" element={<ForcaCorte />} />
         <Route path="/quotes" element={<Quotes />} />
         <Route path="/forcadobra" element={<ForcaDobra />} />
         <Route path="/energyconsumption" element={<ConsumoEnergia />} />
         <Route path="/stopwatch" element={<Cronometro />} />
         <Route path="/visionsystem" element={<VSystem />} />
         <Route path="/engenharia" element={<Engenharia />} />
         <Route path="/kanbanboard" element={<KanbanBoard />} />
         <Route path="/boaspraticasprojetos" element={<BoasPraticasProjetos />} />
       </Routes>
      </Suspense>
    </Router>
  );
}
