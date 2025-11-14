import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import HashtagItem from "./HashtagItem";

export default function HastagList() {

  const companyList = useFeedbackItemsStore(state => state.getCompanyList());
  const selectCompany = useFeedbackItemsStore(state => state.selectCompany);

  return (
    <ul className="hashtags">
      {companyList.map((company) => 
         (<HashtagItem key={company} onSelectCompany={selectCompany} company={company} />)
      )}
      </ul>
  )
}
