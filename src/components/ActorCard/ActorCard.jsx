import cl from "./ActorCard.module.css"

import { POSTER_URL } from "../../utils/variables"

const ActorCard = (props) => {
    //console.log(props)

    return (
        <>
            <li className={cl.actorItem}>
                <div className={cl.actorPosterBox}>
                    <a href={props.URL} target="_blank">
                        <img
                            className={cl.actorPoster}
                            src={POSTER_URL + props["profile_path"]}
                            alt=""
                            loading="lazy"
                        />
                    </a>
                </div>
                <div className={cl.actorInfo}>
                    <h2 className={cl.movieTitle}>
                        {props.index}. {props.name} ({props["original_name"]})
                    </h2>
                    <span>Фільмів переглянуто: {props.movies.length}</span>
                </div>
            </li>
        </>
    )
}

export default ActorCard
