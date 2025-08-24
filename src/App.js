import { Header } from './components/header/index.jsx';
import { MainSection } from './components/main-section/index.jsx';
import { Wrapper } from './components/wrapper/index.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToDo } from './pages/todo.jsx';
import { Calendar } from './pages/calendar.jsx';
import { TimeMngr } from './pages/time_mngr.jsx';
import { Routines } from './pages/routines.jsx';
import { Reminders } from './pages/reminders.jsx';

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header /> 
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/time_manager" element={<TimeMngr />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
