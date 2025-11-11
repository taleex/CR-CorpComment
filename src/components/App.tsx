
import HastagList from "./hashtag/HastagList"
import Footer from "./layout/Footer";
import Container from "./layout/Container";
import FeedbackItemsContextProvider from "../Context/FeedbackItemsContextProvider";


function App() {
    
  return (
    <div className="app">
       <Footer />
      <FeedbackItemsContextProvider>
       <Container />
       <HastagList/>
      </FeedbackItemsContextProvider>
    </div>
  )
}

export default App
