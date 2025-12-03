import { wretchInstance } from "../../common/api/wretch";


export const getMovieDataApi = (params) =>
	wretchInstance()
		.url(`https://imdb.iamidiotareyoutoo.com/search`)
		.query(params)
		.get()
		.json((response) => response)