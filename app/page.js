"use client";
import { StandardHeader } from './components/components/StandardHeader';
import { Banner } from './components/components/Banner';
import { FeaturedGames } from './components/components/FeaturedGames';
import { NewestGames } from './components/components/NewestGames';
import { FeaturedQuiz } from './components/components/FeaturedQuiz';
import { FeaturedJokes } from './components/components/FeaturedJokes';
import { TextfieldUnderHeader } from './components/components/TextfieldUnderHeader';
import { FeaturedOfflineGames } from './components/components/FeaturedOfflineGames';
import  AdSenseFeed from './components/components/AdSenseFeed';

export default function Home() {
  return (
    <div className="Start">
      <StandardHeader />
      <Banner />
      <AdSenseFeed slot="6238077612" />
      <TextfieldUnderHeader
        header={'Willkommen bei Quiz for Kids'}
        subtext={`Kostenfreie Rätsel und Spiele für Kinder und alle, die Spaß am Knobeln und Spielen haben.

          Ob du dein Allgemeinwissen bei packenden Quizfragen auf die Probe stellen oder kurzweilige Spiele erkunden willst: Hier wirst du ganz bestimmt fündig.
          Wir haben Quizfragen zu den neuesten Serien und Filmen für Kinder und fügen regelmäßig neuen Content hinzu, sei es Spiele, Quizzes oder Aufgaben zum Downloaden.

          Und falls dir etwas fehlt oder du Ideen hast, die wir für dich umsetzen sollen, melde dich gerne bei uns!

            `}
      />
      <FeaturedGames />
      <FeaturedQuiz/>
      <NewestGames />
      <FeaturedJokes/>
      <FeaturedOfflineGames/>
      <AdSenseFeed slot="6675015716" />
    </div>
  )
}
