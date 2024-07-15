import { FormEvent, useState } from "react";

type Item = {
    url: string;
  }

export const FormNote: React.FC<Item> = ({url}) => {
    
    const [ ,setError] = useState<string | null>(null);
    const [form, setForm] = useState({ newNote: "" });
    
   
 
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        console.log('form data: ', form);

        
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify( {text: form.newNote} ),
          })
          .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
          })
          
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setError(error);
        });

        setForm({
          newNote: ''
        });
      }
 
    return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="card-form">
        <label htmlFor="new-note" className="new-note">New Note</label>
        <textarea id="new-note" name="newNote" className="text_input"  
        maxLength={200} 
        value={form.newNote}
        onChange={(e) => setForm({ ...form, newNote: e.target.value })}></textarea>
        <div className="new-note_wrap">
            <button type="submit" className="new-note_btn">
              <svg className="arrow-right" id="Line" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m20 23a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.42l5.3-5.29-5.3-5.29a1 1 0 0 1 1.42-1.42l6 6a1 1 0 0 1 0 1.42l-6 6a1 1 0 0 1 -.71.29zm-5.66 0a1 1 0 0 1 -.7-1.71l4.29-4.29h-11.93a1 1 0 0 1 0-2h11.93l-4.29-4.29a1 1 0 0 1 0-1.42 1 1 0 0 1 1.41 0l6 6a1 1 0 0 1 0 1.42l-6 6a1 1 0 0 1 -.71.29z"></path><path d="m29 32h-26a3 3 0 0 1 -3-3v-26a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v26a3 3 0 0 1 -3 3zm-26-30a1 1 0 0 0 -1 1v26a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-26a1 1 0 0 0 -1-1z"></path></svg>
              </button>
        </div>
        </div>
      </form>

    </>
    );
  };