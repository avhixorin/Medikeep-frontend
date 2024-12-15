const useNotifyMusic = () => {
    const generalNotify = () => {
        const audio = new Audio('./sounds/generalNotify.mp3');
        audio.play();
    }

    return { generalNotify };
}

export default useNotifyMusic;