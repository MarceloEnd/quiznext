import berufe from '../images/icons/berufe.png';
import computer from '../images/icons/computer.png';
import fahrzeuge from '../images/icons/fahrzeuge.png';
import defaultIcon from '../images/icons/default.png';
import i123 from '../images/icons/123.png';
import kreuzwortraetsel from '../images/icons/kreuzwortraetsel.png';
import memory from '../images/icons/memory.png';
import quiz from '../images/icons/quiz.png';
import schenkelklopfer from '../images/icons/schenkelklopfer.png';
import sudoku from '../images/icons/sudoku.png';
import wordle from '../images/icons/wordle.png';
import wortschlange from '../images/icons/wortschlange.png';
import familie from '../images/icons/familie.png';
import farben from '../images/icons/farben.png';
import wetter from '../images/icons/wetter.png';

export const setIcon = (category) => {
    if(category === '123'){
      return i123.src;
    }
    else if(category === 'berufe'){
      return berufe.src;
    }
    else if(category === 'computer'){
      return computer.src;
    }
    else if(category === 'fahrzeuge'){
      return fahrzeuge.src;
    }
    else if(category === 'kreuzwortraetsel'){
      return kreuzwortraetsel.src;
    }
    else if(category === 'memory'){
      return memory.src;
    }
    else if(category === 'memory'){
      return memory.src;
    }
    else if(category === 'quiz'){
      return quiz.src;
    }
    else if(category === 'schenkelklopfer'){
      return schenkelklopfer.src;
    }
    else if(category === 'sudoku'){
      return sudoku.src;
    }
    else if(category === 'wordle'){
      return wordle.src;
    }
    else if(category === 'wortschlange'){
      return wortschlange.src;
    }
    else if(category === 'familie'){
      return familie.src;
    }
    else if(category === 'farben'){
      return farben.src;
    }
    else if(category === 'wetter'){
      return wetter.src;
    }
    else{
      return defaultIcon.src;
    }
}
