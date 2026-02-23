function convertMinutes(minutes) {
  const days = Math.floor(minutes / 1440)
  const remainingMinutes = minutes % 1440
  const hours = Math.floor(remainingMinutes / 60)
  const remainingMinutesFinal = remainingMinutes % 60

  return {
    days: days,
    hours: hours,
    minutes: remainingMinutesFinal,
  }
}

export default function allMoviesRuntime(db) {
    const timeInMinutes = db?.reduce((accumulator, movie) => {
        return accumulator + +(movie['Runtime (mins)'])
    }, 0)

    return convertMinutes(timeInMinutes)
}