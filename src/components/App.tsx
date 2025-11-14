
import HastagList from "./hashtag/HastagList"
import Footer from "./layout/Footer";
import Container from "./layout/Container";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";


function App() {

  const fetchFeedbackItems = useFeedbackItemsStore((state) => state.fetchFeedbacksItems);

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);
    
  return (
    <div className="app">
       <Footer />
       <Container />
       <HastagList/>
    
    </div>
  )
}

export default App
