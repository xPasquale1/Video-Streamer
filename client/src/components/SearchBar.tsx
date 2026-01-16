import { useEffect, useState } from "react";

type OnSearchProps = {
    onSearch: (new_title: string) => void;
    onSearchChanged: (new_title: string) => void;
};

function SearchBar({onSearch, onSearchChanged}: OnSearchProps){
    const [inputText, setInputText] = useState('');

    const handleClick = () => {
        onSearch(inputText);
    }

    useEffect(() => {onSearchChanged(inputText)}, [inputText]);

    return (
        <div className="d-flex gap-3">
            <input className="form-control" value={inputText} placeholder="Suche name einem Titel..." onChange={(event) => setInputText(event.target.value)}/>
            <button className="btn btn-primary" onClick={handleClick} disabled={inputText.length <= 0}>Suche</button>
        </div>
    );
}

export default SearchBar;
