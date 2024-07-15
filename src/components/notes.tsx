import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FormNote } from "../components/FormNote";
import '../App.css'

type Item = {
    url: string;
  }

  interface Note {
    id: number,
    text: string,

}

export const Notes: React.FC<Item> = ({url}) => {
    
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
  

    const fetchData = () => {

        fetch(url)

        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
            setData(data);
            setLoading(false);
            console.log(data)

    })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error);
    });

    if (!data && notes.length > 0) {
        setData(notes);
    }
    }

    function handleDeleteNote(id: number) {

        console.log('id',id);

        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
           
            setNotes(notes.filter(note => note.id !== id));


 
        fetchData();

        })
        .catch(error => {
            console.error('There was a problem with the delete operation:', error);
       
        });
    };

    useEffect(() => {
        fetchData() }
    , [url]);


    useEffect(() => {
  
        if (!data && notes.length > 0) {
            setData(notes);
        }
    }, [data, notes]);

    const handleRefresh = () => {
        setLoading(true);
        fetchData();
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  
    return (
    <div>
        <div className="class-notes-refresh">
    <h1>Notes</h1>
     <button type="button" className="button-refresh" onClick={handleRefresh}>
     <svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M48 0H0V48H48V0Z" fill="white" fill-opacity="0.01"/>
<path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="white" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.5424 27C32.2681 31.0571 28.4778 34 24.0002 34C19.5226 34 15.7323 31.0571 14.458 27V33" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.5424 15V21C32.2681 16.9429 28.4778 14 24.0002 14C19.5226 14 15.7323 16.9429 14.458 21" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
     </button>
     </div>
      <div className="card-container">
        {data.map((item: Note) => (
            
                <div key={uuidv4()} className="card">
                <button className="close-button" onClick={() => handleDeleteNote(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                  <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                   </svg>
                </button>
                
                <div className="card-body">
                  <div className="card-content">{item.text}
                </div>
                </div>
                </div>
             
            ))}
      </div>
      <FormNote url={`http://localhost:7070/notes`}/>
      </div>
    );
  };
  