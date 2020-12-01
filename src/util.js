export const playAudio = async (isPlaying , audioRef) => {
      if(isPlaying){
            await audioRef.current.play();
            audioRef.current.play();
        }
}