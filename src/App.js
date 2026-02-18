import './App.css'
import image from './image/water_pic.png'
import checklist from './image/checklist.svg'
import graph from './image/graph.svg'
import goal from './image/goal.svg'
import Navbar from './components/navbar'

function App(){
  return(
    <div><Navbar/>
    <div className='container'>
      <div className='row p-4 shadow rounded '>
        <div className='col-md-6'>
          <h1>Welcome to Stay Hydrated!</h1>
          <p>Track your daily water intake</p>
        </div>
        <div className='col-md-6'>
          <img className='water' src={image} alt='water intake'/>          
        </div>
      </div>
      <div className='row'>
        <div className='col p-4 shadow rounded '>
          <h2>About our Tracker</h2>
          <p>Keep track of your daily water intake to stay healthy and hydrated.</p>
          <p>Easily log your water consumption, view your progress, and achieve your hydration goals!</p>
          </div>
      </div>
      <div className='row p-4 shadow rounded'>
        <div className='col-md-4 p-4  '>
          <img className='checklist' src={checklist} alt='checklist'/>
          <h3>Log your intake</h3>
          <p>Record your water intake Daily</p>
        </div>
        <div className='col-md-4 p-4'>
          <img className='graph' src={graph} alt='graph'/>
          <h3>Track Progress</h3>
          <p>Monitor your hydration progress</p>
        </div>
        <div className='col-md-4 p-4'>
          <img className='goal' src={goal} alt='goal'/>
          <h3 style={{marginLeft:'27px'}}>Reach Goals</h3>
          <p>Stay on top of your water goals</p>
        </div>
      </div>
    </div>
    </div>
  )
}
export default App