import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";


export default function FeedbackList() {

  const [feedbackItems, setfeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
     fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks').then((Response) => {

      if (!Response.ok) {
        throw new Error ();
      }
      
      return Response.json();}
    )
    .then((data) => {
      setfeedbackItems(data.feedbacks);
      setIsLoading(false);
    }).catch(() => {
      setErrorMessage("Something went wrong");
      setIsLoading(false);
    })
    
    ;

  }, []);


  return (
    <ol className="feedback-list">

    { isLoading ? <Spinner /> : null }

    { errorMessage ? <ErrorMessage message={errorMessage}/> : null }

      { feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))
      }

    </ol>
  )
}
