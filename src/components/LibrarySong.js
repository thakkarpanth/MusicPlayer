import React from 'react';
import {playAudio} from '../util';
const LibrarySong = ({setSongs , isPlaying , audioRef , id , songs , setCurrentSong , song}) => {

    const  songSelectHandler = async () => {
        const selectedSong =  songs.filter((state) => state.id === id);
        console.log(selectedSong);
       

        const newSongs = songs.map((song) => { if(song.id === id){
            return {
                ...song , active : true , 
            }
        }
        else{
            return {
                ...song , active : false 
            }
        }
         
     })

        setSongs(newSongs);
        setCurrentSong(selectedSong[0]);
      
        playAudio(isPlaying , audioRef);
    }   
    return(
        <div onClick= {songSelectHandler}  className = {`library-song ${song.active ? 'selected' : ""}`}>
            <img  alt = {song.name} src={song.cover} alt=""/>
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong ; 