import { Suspense } from 'react';
import { EyebrowLabel } from '../../components/ui/EyebrowLabel';
import { SearchForm } from '../../components/search/SearchForm';
import { SiteList } from '../../components/search/SiteList';
import { LaunchBar } from '../../components/search/LaunchBar';
import { ChatPanel } from '../../components/chat/ChatPanel';
import '../../styles/search.css';

export const metadata = {
  title: 'Search Flights — FlightsVsFares',
};

export default function SearchPage({ searchParams }) {
  return (
    <main className="search-page">
      <section className="page-header">
        <EyebrowLabel>Flight Search</EyebrowLabel>
        <h1 className="page-heading">SEARCH FLIGHTS</h1>
      </section>

      <SearchForm initialValues={searchParams} />
      <Suspense fallback={null}>
        <ChatPanel />
      </Suspense>
      <SiteList />
      <LaunchBar />
    </main>
  );
}
