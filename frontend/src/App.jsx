import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import ExplorePage from './pages/ExplorePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage'
import { AuthProvider } from './context/AuthContext'
import CreateBlog from './pages/CreateBlog'
import YourProfile from './pages/YourProfile'
import PrivateRoute from './components/PrivateRoute'
import EditPage from './pages/EditPage'
import EditBio from './pages/EditBio'
import Footer from './components/Footer'
import BlogDetailsPage from './pages/BlogDetailsPage'

function App() {


  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/blogs/:id" element={<BlogDetailsPage />} />

          {/* Will create protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/createBlog" element={<CreateBlog />} />
            <Route path="/profile" element={<YourProfile />} />
            <Route path='/edit-blog/:id' element={<EditPage/>}/>
            <Route path='/edit-bio' element={<EditBio/>}/>
          </Route>
        </Routes>
        <Footer/>
      </Router>
      
    </AuthProvider>
  )
}

export default App
