import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";


export default function FeedbackList() {

  const [feedbackItems, setfeedbackItems] = useState([]);
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


  }, []);


  return (
    <ol className="feedback-list">

    { isLoading && <Spinner />}

    { errorMessage && <ErrorMessage message={errorMessage}/>}

      { feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))
      }

    </ol>
  )
}
