import logo from './logo.svg';
import './App.css';
import {CodeEditor} from "./editor";

function App() {
  return (
    <div className="App" style={{height: '100vh'}}>
        <div className="bar" style={{height: '40px', backgroundColor: '#17093E'}}>
            <p style={{color: '#7CEEBE'}}>
                CODANNA-Share
            </p>
        </div>
        <CodeEditor/>
    </div>
  );
}

export default App;
