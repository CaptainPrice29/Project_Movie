export function convertImdbResponse(imdbData) {
    const top = imdbData.top;
    const main = imdbData.main;

    // Extract rating distribution from histogram
    const ratingDistribution = main.aggregateRatingsBreakdown?.histogram?.histogramValues?.map(item => ({
        rating: item.rating,
        count: item.voteCount
    })) || [];

    // Extract cast information
    const cast = main.castV2?.[0]?.credits?.slice(0, 4).map(credit => {
        const character = credit.creditedRoles?.edges?.[0]?.node?.characters?.edges?.[0]?.node?.name || 'Unknown';
        return {
            name: credit.name.nameText.text,
            character: character,
            image: credit.name.primaryImage?.url || null
        };
    }) || [];

    // Extract reviews
    const reviews = main.featuredReviews?.edges?.map(edge => {
        const review = edge.node;
        return {
            author: review.author?.username?.text || review.author?.nickName || 'Anonymous',
            rating: review.authorRating || null,
            date: review.submissionDate || null,
            summary: review.summary?.originalText || '',
            text: review.text?.originalText?.plainText || review.text?.originalText?.plaidHtml || ''
        };
    }) || [];

    // Extract similar movies
    const similarMovies = main.moreLikeThisTitles?.edges?.slice(0, 3).map(edge => ({
        title: edge.node.titleText.text,
        year: edge.node.releaseYear.year,
        rating: edge.node.ratingsSummary.aggregateRating
    })) || [];

    // Extract images
    const images = main.titleMainImages?.edges?.slice(0, 2).map(edge =>
        edge.node.url
    ) || [];

    // Extract director(s)
    const director = main.crewV2?.find(crew =>
        crew.grouping?.text === 'Director'
    )?.credits?.map(credit =>
        credit.name.nameText.text
    ) || [];

    // Extract writers
    const writers = main.crewV2?.find(crew =>
        crew.grouping?.text === 'Writer'
    )?.credits?.map(credit =>
        credit.name.nameText.text
    ) || [];

    // Extract stars
    const stars = main.principalCreditsV2?.find(credit =>
        credit.grouping?.text === 'Stars'
    )?.credits?.slice(0, 4).map(credit =>
        credit.name.nameText.text
    ) || [];

    // Extract trivia
    const trivia = main.trivia?.edges?.slice(0, 1).map(edge =>
        edge.node.text?.plaidHtml || edge.node.text?.plainText || ''
    ) || [];

    // Extract goofs
    const goofs = main.goofs?.edges?.slice(0, 1).map(edge =>
        edge.node.text?.plaidHtml || edge.node.text?.plainText || ''
    ) || [];

    // Extract quotes
    const quotes = main.quotes?.edges?.slice(0, 2).map(edge => {
        const line = edge.node.lines?.[0];
        return line?.text || '';
    }) || [];

    return {
        title: top.titleText.text,
        year: top.releaseYear.year,
        rating: top.ratingsSummary.aggregateRating,
        voteCount: top.ratingsSummary.voteCount,
        runtime: top.runtime.displayableProperty.value.plainText,
        genres: top.genres.genres.map(genre => genre.text),
        plot: top.plot.plotText.plainText,
        poster: top.primaryImage.url,
        trailer: top.primaryVideos.edges?.[0]?.node?.id ?
            `https://www.imdb.com/video/${top.primaryVideos.edges[0].node.id}/` : null,
        director: director,
        writers: writers,
        stars: stars,
        releaseDate: top.releaseDate ?
            `${top.releaseDate.year}-${String(top.releaseDate.month).padStart(2, '0')}-${String(top.releaseDate.day).padStart(2, '0')}` :
            null,
        country: main.countriesDetails?.countries?.[0]?.text || 'Unknown',
        language: main.spokenLanguages?.spokenLanguages?.[0]?.text || 'Unknown',
        awards: main.wins?.total || 0,
        nominations: main.nominationsExcludeWins?.total || 0,
        boxOffice: main.worldwideGross?.total?.amount ?
            `$${(main.worldwideGross.total.amount / 1000000).toFixed(1)}M` :
            'N/A',
        ratingDistribution: ratingDistribution,
        cast: cast,
        reviews: reviews,
        trivia: trivia,
        goofs: goofs,
        quotes: quotes,
        similarMovies: similarMovies,
        images: images,
        certificate: top.certificate?.rating || 'Not Rated',
    };
}



// Usage:
// const movieData = convertImdbResponse(imdbResponse);