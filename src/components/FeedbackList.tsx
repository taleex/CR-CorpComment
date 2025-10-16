import FeedbackItem from "./FeedbackItem";


const feedbackItems = [{
    upvoteCount: 593,
    badgeLetter: 'B',
    companyName: 'Netflix',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, explicabo culpa laudantium at consequuntur quae.',
    daysAgo: 4
}, {
    upvoteCount: 593,
    badgeLetter: 'B',
    companyName: 'Netdfsdfflix',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, explicabo culpa laudantium at consequuntur quae.',
    daysAgo: 4
}];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      { feedbackItems.map((feedbackItem) => (
        <FeedbackItem feedbackItem={feedbackItem} />
      ))
      }

    </ol>
  )
}
