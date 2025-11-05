import { useEffect, useState } from "react";
import { TfeedbackItem } from "../lib/types";
import Container from "./Container"
import Footer from "./Footer"
import HastagList from "./HastagList"


function App() {

    const [feedbackItems, setfeedbackItems] = useState<TfeedbackItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleAddToList = (text:string) => {
      const companyName = text.split(' ').find((word) => word.includes('#'))!.substring(1);
      const newItem: TfeedbackItem ={
        id: new Date().getTime(),
        badgeLetter: companyName.substring(0,1).toUpperCase(),
        companyName: companyName,
        daysAgo: 0,
        text: text,
        upvoteCount: 0,
      }
  
      setfeedbackItems([...feedbackItems, newItem]);
    };
  
  
    useEffect( () => {
      const fetchFeedbacksItems = async () => {
        setIsLoading(true);
  
        try{
         const response = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');
  
    if (!response.ok) {
      throw new Error();
    }
   
    const data = await response.json();
    setfeedbackItems(data.feedbacks); 
  }catch (error) {
    setErrorMessage("Failed to load feedbacks. Please try again later.");
  }
  
    setIsLoading(false);
       };
  
    fetchFeedbacksItems();
  
  
    }, []);
  
  

  return (
    <div className="app">
       <Footer />
       <Container handleAddToList={handleAddToList} isLoading={isLoading} errorMessage={errorMessage} feedbackItems={feedbackItems}/>
       <HastagList />
    </div>
  )
}

export default App
