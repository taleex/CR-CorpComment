import { useEffect, useMemo, useState } from "react";
import { TfeedbackItem } from "../lib/types";

import HastagList from "./hashtag/HastagList"
import Footer from "./layout/Footer";
import Container from "./layout/Container";


function App() {

    const [feedbackItems, setfeedbackItems] = useState<TfeedbackItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedCompany, setSelectedCompany] = useState<string | null>("");

    const filteredFeedbackItems = useMemo (() => selectedCompany ? feedbackItems.filter(
      feedbackItems => feedbackItems.company === selectedCompany): feedbackItems, [feedbackItems, selectedCompany]);

    const companyList = useMemo (() => feedbackItems.map(item => item.company).filter((company, index, array) => {
      return array.indexOf(company) === index;
    }), [feedbackItems]);
  
    const handleAddToList = async (text:string) => {
      const companyName = text.split(' ').find((word) => word.includes('#'))!.substring(1);
      const newItem: TfeedbackItem ={
        id: new Date().getTime(),
        badgeLetter: companyName.substring(0,1).toUpperCase(),
        company: companyName,
        daysAgo: 0,
        text: text,
        upvoteCount: 0,
      }
  
      setfeedbackItems([...feedbackItems, newItem]);

      await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(newItem),
      })
    };
  
    const handleSelectCompany = (company: string) => {
      if (company === selectedCompany) {
        setSelectedCompany("");
        return;
      }
      setSelectedCompany(company);
    }
  
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
       <Container handleAddToList={handleAddToList} isLoading={isLoading} errorMessage={errorMessage} feedbackItems={filteredFeedbackItems}/>
       <HastagList handleSelectCompany={handleSelectCompany} companyList={companyList}/>
    </div>
  )
}

export default App
