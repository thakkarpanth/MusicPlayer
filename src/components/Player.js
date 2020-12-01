import React , {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlay , faAngleLeft , faAngleRight , faPause } from '@fortawesome/free-solid-svg-icons'
import {playAudio} from '../util';
const Player = ({setSongs, setCurrentSong , songs , setSongInfo , songInfo , audioRef , currentSong , isPlaying  , setIsPlaying}) => {

 

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => { 
            if(song.id === nextPrev.id){
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
    }
    
    const playSongHandler = () => {

        console.log(audioRef.current); 
        if(isPlaying)
        {
            audioRef.current.pause();
            setIsPlaying(false);  
        }
        else{
            audioRef.current.play() ; 
            setIsPlaying(true); 
        }
    }

    const skipTrackHandler = (direction) => {


        let currentIndex = songs.findIndex((song) => song.id === currentSong.id); 
        if(direction === 'skip-forward')
        {
            setCurrentSong(songs[(currentIndex+1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex+1) % songs.length]);
        }
        if(direction === 'skip-back')
        {
            if(currentIndex === 0 ) currentIndex = songs.length;
            setCurrentSong(songs[currentIndex -1]);
            activeLibraryHandler(songs[currentIndex -1]);
        }
        
        playAudio(isPlaying , audioRef);
        
    }

    

    const dragHandler = (e) => {

        console.log("e is " + e);
        console.log("drag handler " + e.target.value);
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo , currentTime : e.target.value});

    }


    const getTime = (time) => {

        return (Math.floor(time / 60 ) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
    }
      
    
    const trackAnim = {
        transform : `translateX(${songInfo.animationPercentage}%)`
    }
    
    return(
        <div className = "player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                
                <div style = {{background : `linear-gradient(to right , ${currentSong.color[0]} , ${currentSong.color[1]})`}} className = "track">
                    <input min={0} max = {songInfo.duration || 0} value = {songInfo.currentTime} onChange = {dragHandler} type = "range"/>
                    <div style = {trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                
                <FontAwesomeIcon  onClick = {() => {skipTrackHandler('skip-back')}} className = "skip-back" size = "2x" icon = {faAngleLeft}/>
                <FontAwesomeIcon  onClick = {playSongHandler} className = "play" size = "2x" icon = {isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon   onClick = {() => {skipTrackHandler('skip-forward')}} className = "skip-forward" size = "2x" icon = {faAngleRight}/>
            </div>
           
        </div>
    )
}

export default Player ; 