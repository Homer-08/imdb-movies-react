import ActorCard from "../ActorCard/ActorCard"
import cl from "./ActorList.module.css"

const ActorList = (props) => {
    const { items: actors, itemOffset } = props

    return (
        <>
            <ul className={cl.actorsList}>
                {actors?.map((actor, index) => (
                    <ActorCard
                        key={actor.id}
                        index={index + itemOffset + 1}
                        {...actor}
                    />
                ))}
            </ul>
        </>
    )
}

export default ActorList
