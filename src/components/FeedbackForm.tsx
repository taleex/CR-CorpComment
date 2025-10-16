import { useState } from "react"
import { MAX_CHARS } from "../lib/constants";



export default function FeedbackForm() {

  const [text, setText] = useState("");
  
  const charCount = MAX_CHARS - text.length;

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        const newText = event?.target.value;
          if (newText.length > MAX_CHARS) {
            return;
          }

        setText(newText)

}


  return (
    <form className="form">
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
