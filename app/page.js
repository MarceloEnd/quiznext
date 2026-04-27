"use client";
import { StandardHeader } from './components/components/StandardHeader';
import { Banner } from './components/components/Banner';
import { FeaturedGames } from './components/components/FeaturedGames';

export default function Home() {
  return (
    <div className="Start">
      <StandardHeader previousPath='' />
      <Banner />
      <FeaturedGames />
    </div>
  )
}
