function sortMoviesByTypes(data) {
    const moviesDBByTypes = {
        movies: [],
        shorts: [],
        tvSerials: [],
        episodes: [],
        tvSpecials: [],
        videoGames: [],
        musicVideos: [],
        podcasts: [],
        podcastsEpisodes: [],
    }
    let type = null

    data?.forEach((movie) => {
        type = movie["Title Type"]

        switch (type) {
            case "Movie": {
                moviesDBByTypes.movies.push(movie)
                break
            }
            case "Short": {
                moviesDBByTypes.shorts.push(movie)
                break
            }
            case "TV Series": {
                moviesDBByTypes.tvSerials.push(movie)
                break
            }
            case "TV Episode": {
                moviesDBByTypes.episodes.push(movie)
                break
            }
            case "TV Mini Series": {
                moviesDBByTypes.tvSerials.push(movie)
                break
            }
            case "TV Movie": {
                if (movie["Runtime (mins)"] === "") {
                    moviesDBByTypes.movies.push(movie)
                } else {
                    if (+movie["Runtime (mins)"] <= 40) {
                        moviesDBByTypes.shorts.push(movie)
                    } else {
                        moviesDBByTypes.movies.push(movie)
                    }
                }
                break
            }
            case "TV Special": {
                moviesDBByTypes.tvSpecials.push(movie)
                break
            }
            case "TV Short": {
                moviesDBByTypes.shorts.push(movie)
                break
            }
            case "Video Game": {
                moviesDBByTypes.videoGames.push(movie)
                break
            }
            case "Video": {
                if (movie["Runtime (mins)"] === "") {
                    moviesDBByTypes.movies.push(movie)
                } else {
                    if (+movie["Runtime (mins)"] <= 40) {
                        moviesDBByTypes.shorts.push(movie)
                    } else {
                        moviesDBByTypes.movies.push(movie)
                    }
                }
                break
            }
            case "Music Video": {
                moviesDBByTypes.musicVideos.push(movie)
                break
            }
            case "Podcast Series": {
                moviesDBByTypes.podcasts.push(movie)
                break
            }
            case "Podcast Episode": {
                moviesDBByTypes.podcastsEpisodes.push(movie)
                break
            }
        }
    })

    return moviesDBByTypes
}

export default sortMoviesByTypes