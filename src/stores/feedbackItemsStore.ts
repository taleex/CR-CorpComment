import { create } from "zustand";
import { TfeedbackItem } from "../lib/types";

type Store = {
    feedbackItems: TfeedbackItem[];
    isLoading: boolean;
    errorMessage: string;
    selectedCompany: string;
    companyList: string[];  
    getCompanyList: () => string[];
    getFilteredFeedbackItems: () => TfeedbackItem[];
    addItemtoList: (text: string) => Promise<void>;
    selectCompany: (company: string) => void;
    fetchFeedbacksItems: () => Promise<void>;
}

export const useFeedbackItemsStore = create<Store>((set, get) => {
    return {
        feedbackItems: [],
        isLoading: false,
        errorMessage: "",
        selectedCompany: "",
        companyList: [],
        getCompanyList: () => {
            return get().feedbackItems
              .map(item => item.company)
              .filter((company, index, array) => array.indexOf(company) === index);
        },
        getFilteredFeedbackItems: () => {
            const state = get();
            return state.selectedCompany 
              ? state.feedbackItems.filter((feedbackItem) => feedbackItem.company === state.selectedCompany)
              : state.feedbackItems;
        },
        addItemtoList: async (text: string) => {
            const companyName = text.split(' ').find((word) => word.includes('#'))?.substring(1) || "";
            if (!companyName) {
              set(() => ({ errorMessage: "Please include a #companyName tag" }));
              return;
            }

            const newItem: TfeedbackItem = {
              id: new Date().getTime(),
              badgeLetter: companyName.substring(0, 1).toUpperCase(),
              company: companyName,
              daysAgo: 0,
              text: text,
              upvoteCount: 0,
            };

            set((state) => ({
              feedbackItems: [...state.feedbackItems, newItem],
            }));

            try {
              await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
                method: 'POST',
                headers: { accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
              });
            } catch (error) {
              set(() => ({ errorMessage: "Failed to add feedback" }));
            }
        },
        selectCompany: (company: string) => {
          if( get().selectedCompany === company) {
            set(() => ({ selectedCompany: "" }));
            return;
          }
          set(() => ({ selectedCompany: company }));
        },
        fetchFeedbacksItems: async () => {
            set(() => ({ isLoading: true }));
            try {
              const response = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');
              if (!response.ok) throw new Error();
              const data = await response.json();
              set(() => ({ feedbackItems: data.feedbacks }));
            } catch (error) {
              set(() => ({ errorMessage: "Failed to load feedbacks. Please try again later." }));
            }
            set(() => ({ isLoading: false }));
        },
    };
});