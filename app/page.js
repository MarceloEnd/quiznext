"use client";
import { StandardHeader } from './components/components/StandardHeader';
import { Banner } from './components/components/Banner';
import { FeaturedGames } from './components/components/FeaturedGames';
import { NewestGames } from './components/components/NewestGames';
import { FeaturedQuiz } from './components/components/FeaturedQuiz';
import { FeaturedJokes } from './components/components/FeaturedJokes';
import { TextfieldUnderHeader } from './components/components/TextfieldUnderHeader';
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
            `}
      />
      <FeaturedGames />
      <FeaturedQuiz/>
      <NewestGames />
      <FeaturedJokes/>
      <AdSenseFeed slot="6675015716" />
    </div>
  )
}
