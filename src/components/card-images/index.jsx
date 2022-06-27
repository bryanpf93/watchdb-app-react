import './styles.css'

function CardImages (image) {

        console.log(image)
    return(
            
        <>
        
            <div
                className='images-person-image'
                style={{ backgroundImage: `${image.file_path
                    ?`url(https://image.tmdb.org/t/p/w500/${image.file_path})`
                    :'url(https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-sin-imagen-en-miniatura-marcador-de-posici%C3%B3n-para-foros-blogs-y-sitios-web.jpg)'}` }}
            ></div>
        </>
    )
}

export default CardImages;