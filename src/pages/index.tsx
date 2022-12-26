import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/common/Layout'
import MovieCard from '../components/MovieCard/MovieCard'
import { trpc } from '../utils/trpc'
const Home: NextPage = () => {
  const { data, isLoading, isSuccess } =
    trpc.movieRouter.getTrendingMovies.useQuery()
  const backgroundImage = isSuccess ? data?.results[0]?.backdrop_path : ""
  return (
    <Layout title="TITLE" backgroundImg={backgroundImage}>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {isSuccess
            ? data.results.map((movie) => (
                <MovieCard
                  key={movie.id}
                  genreIds={movie.genre_ids}
                  name={movie.original_title}
                  release_date={movie.release_date}
                  imageUrl={movie.backdrop_path}
                />
              ))
            : 'loading'}
        </div>
      </div>
    </Layout>
  )
}

export default Home
