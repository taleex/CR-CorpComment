import { createContext, useMemo, useState } from "react";
import { TfeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type FeedbackItemsContextProviderProps = { 
    children: React.ReactNode;
};

type TFeedbackItemsContext = {
    isLoading: boolean;
    errorMessage: string;
    companyList: string[];
    handleAddToList: (text:string) => void;
    handleSelectCompany: (company: string) => void;
    filteredFeedbackItems: TfeedbackItem[];
}

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null);

export default function FeedbackItemsContextProvider({ children }: FeedbackItemsContextProviderProps) {

 const {
    feedbackItems,
    isLoading,
    errorMessage
  } = useFeedbackItems();

    const [selectedCompany, setSelectedCompany] = useState<string | null>("");


    const companyList = useMemo (() => feedbackItems.map(item => item.company).filter((company, index, array) => {
         return array.indexOf(company) === index;    
        }), [feedbackItems]
      );

    const filteredFeedbackItems = useMemo (() => selectedCompany ? feedbackItems.filter(
          feedbackItems => feedbackItems.company === selectedCompany): feedbackItems, [feedbackItems, selectedCompany]
      );

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
      };


    return (<FeedbackItemsContext.Provider value={{
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectCompany,
    }}>{children}</FeedbackItemsContext.Provider>);
}
