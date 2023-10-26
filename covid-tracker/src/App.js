import { DataProvider } from './context/data-context';
import { MainContainer } from './components/main-container';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DataProvider>
      <MainContainer/>
    </DataProvider>
    </LocalizationProvider>
  );
}

export default App;
