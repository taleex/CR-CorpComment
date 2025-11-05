import FeedbackList from "./FeedbackList";
import Header from "./Header";
import { TfeedbackItem } from "../lib/types";

type ContainerProps = {
  feedbackItems: TfeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  handleAddToList: (text:string) => void;
}

export default function Container({feedbackItems, isLoading, errorMessage, handleAddToList}: ContainerProps) {
  return (
    <main className="container">
        <Header handleAddToList={handleAddToList}/>
        <FeedbackList isLoading={isLoading} errorMessage={errorMessage} feedbackItems={feedbackItems}/>
    </main>
  )
}
