import './App.css';
import LandingPage from './components/page/LandingPage';
import { Toaster } from './components/ui/toaster';
function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image Div */}
      <div
        className="min-h-[20vh] md:min-h-screen flex-auto bg-contain bg-center bg-no-repeat w-full "
        style={{ backgroundImage: "url('/landing.jpeg')" }}
      >
        
      </div>
      {/* Landing Page */}
      <div className="flex-auto pt-0">

        <LandingPage />

        <Toaster/>

      </div>

    </div>
  );
}

export default App;
