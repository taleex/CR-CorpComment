import { useState } from "react"
import { MAX_CHARS } from "../../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text:string) => void;
}

export default function FeedbackForm({onAddToList}:FeedbackFormProps) {

  const [text, setText] = useState("");
  
  const charCount = MAX_CHARS - text.length;

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        const newText = event?.target.value;
          if (newText.length > MAX_CHARS) {
            return;
          }

        setText(newText)

}

const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddToList(text);
    setText("");
}

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <textarea value={text} onChange={handleOnChange} id="feedback-textarea" placeholder="" spellCheck={false}/>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
        </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button type="submit"><span>Submit</span></button>
      </div>
    </form>
  )
}
