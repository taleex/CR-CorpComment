import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TfeedbackItem } from "../../lib/types";
import { useState } from "react";



type FeedbackItemProps = {
  
  feedbackItem: TfeedbackItem

};



export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {

  const [open,setOpen] =  useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);


  return (
         <li onClick= {() => setOpen (prev => !prev)} className={`feedback ${open ? 'feedback--expand' : ''}`}>
        
        <button onClick={() => setUpvoteCount((prev) => ++prev)}>
          <TriangleUpIcon />
          <span>{upvoteCount}</span>
        </button>
        <div>
          <p>{feedbackItem.badgeLetter}</p>
        </div>

        <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
        </div>
        <p>{feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>

      </li>
  )
}
