async function fetchMultipleUrls(urls, opt, controller) {
    try {
        const fetchPromises = urls.map(url => fetch(url, {...opt, signal: controller?.signal}))

        const responses = await Promise.all(fetchPromises)

        const dataPromises = responses.map(response => response.json())
        const data = await Promise.all(dataPromises)

        return data
    } catch (error) {
        console.error('Произошла ошибка:', error)
    }
}

export default fetchMultipleUrls