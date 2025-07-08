// import React from 'react'
// import Sidebar from './components/sidebar'
// import ProfileCart from './pages/ProfileCart'
// function App() {
//   return (
//         <>
//     <div className="flex">
//   <Sidebar />
//   <main className="flex-1 p-6">
//     {/* Your main page content goes here */}
//      <h1 className="text-3xl font-bold underline">Hello world!</h1>
//      <ProfileCart/>
//   </main>
// </div>
     
//     </>
//   )
// }

// export default App

// src/App.jsx
import React from 'react';
import AllRoutes from './routes/route'; 
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {

  return(
    <>
    <Provider store={appStore}>
      <AllRoutes/>
    </Provider>
    
    </>
  ) 
}

export default App;
