import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../Context/FeedbackItemsContextProvider";
import { TfeedbackItem } from "./types";

export function useFeedbackItemsContext() {
    const context = useContext(FeedbackItemsContext);
    if (!context) {
      throw new Error("useFeedbackItemsContext must be used within a FeedbackItemsContextProvider");
    }
    return context;
}

export function useFeedbackItems () {

      const [feedbackItems, setfeedbackItems] = useState<TfeedbackItem[]>([]);
      const [isLoading, setIsLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");

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
      
        }, []
      );
  
      
    return { feedbackItems, setfeedbackItems, isLoading, errorMessage };

}