export default function Card({title, artist}) {
    return (
        <>
            <div class="card">
                <div class="cover">
                    <img src="https://picsum.photos/300?1" />
                    <button class="play">▶</button>
                </div>
                <h3>{title}</h3>
                <p>{artist}</p>
            </div>
        </>
    )
}