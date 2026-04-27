"use client";
import { StandardHeader } from './components/components/StandardHeader';
import { Banner } from './components/components/Banner';
import { FeaturedGames } from './components/components/FeaturedGames';
import { NewestGames } from './components/components/NewestGames';
import { FeaturedQuiz } from './components/components/FeaturedQuiz';

export default function Home() {
  return (
    <div className="Start">
      <StandardHeader />
      <Banner />
      <FeaturedGames />
      <FeaturedQuiz/>
      <NewestGames />
    </div>
  )
}
