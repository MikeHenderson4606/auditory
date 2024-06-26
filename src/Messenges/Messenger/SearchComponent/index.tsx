import { useEffect, useState } from "react";
import * as client from '../../../Client';

function SearchComponent({selectedSong, selectedPlaylist, setSelectedSong, setSelectedPlaylist}: {selectedSong: any, selectedPlaylist: any, setSelectedSong: (selectedSong: any) => void, setSelectedPlaylist: (selectedPlaylist: any) => void}) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any>([]);

    const searchSongs = async () => {
        let adjustedQuery = query;
        adjustedQuery = adjustedQuery.replaceAll(" ", "+");
        adjustedQuery = "q=" + adjustedQuery + "&type=track&limit=20";
        console.log(adjustedQuery);
        const response = await client.searchSongs(adjustedQuery);
        console.log(response.tracks.items);
        setResults(response.tracks.items);
    }

    useEffect(() => {
    }, [results]);

    return (
        <div>
            <label className="form-label" htmlFor="searchSong">Search for a song:</label>
            <input className="form-control" id="searchSong" placeholder="song" onChange={(e) => {
                setQuery(e.target.value);
            }} />
            <button className="btn btn-success mt-2" onClick={searchSongs}>
                Search
            </button>
            {results.length > 0 ? 
            <div className="list-group mt-2">
                {results.map((track:any, index:number) => {
                    return (
                        <button className="list-group-item list-group-item-action list-group-item-light" key={index} onClick={(e:any) => {
                            console.log("Setting selected track to be:");
                            console.log(track);
                            setSelectedSong({track: track});
                        }}>
                            <h5>{track.name}</h5>
                            <h6>{track.artists[0].name}</h6>
                        </button>
                    );
                })}
            </div>
            : <div></div>}
        </div>
    );
}

export default SearchComponent;