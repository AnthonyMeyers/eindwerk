import IndexFooter from "./IndexFooter"

const Photogallery = () => {

    //The photos to use in the gallery, makes it easy to add
    const photos= [
    {title:"plain", imgfile: "plain.jpg", credits: "CCO commons" },
    {title:"guitar", imgfile: "guitar.jpg", credits: "CCO commons" },
    {title:"landscape", imgfile: "landscape.jpg", credits: "CCO commons" },
    {title:"pink flower", imgfile: "flower.jpg", credits: "CCO commons" },
    {title:"birdspotting", imgfile: "birdspotting.jpg", credits: "CCO commons" },
    {title:"bee",imgfile: "bee.jpg",credits: "Meyers Willy"},
    {title:"blue flowers",imgfile: "blueflowers.jpg",credits: "Meyers Willy"},
    {title:"yellow flowers",imgfile: "yellowflowers.jpg",credits: "Meyers Willy"},
    {title:"fermenting",imgfile: "fermenting.jpg",credits: "Meyers Willy"},
    {title:"blue grapes",imgfile: "grapes.jpg",credits: "Meyers Willy"},
]

    return (
        <>
      <section className="gallery container">
        <h2 className="gallery__title">Some things to enjoy in your todo-free time</h2>
        <div className="gallery__photos">
            {photos.length > 0 && photos.map(({title, imgfile, credits})=>
            <div className="galleryimgholder">
                <img src={`./src/assets/${imgfile}`} alt={title} title={title} className="galleryimgholder__img"/>
                <div className="galleryimgholder__textblock">
                    <h3 className="galleryimgholder__textblock__title">{title}</h3>
                    <h3 className="galleryimgholder__textblock__title">{credits}
                    <span className="galleryimgholder__textblock__title__copyright"> &#169;</span></h3>
                </div>
            </div>
            )}
        </div>
      </section>
      <IndexFooter/>
      </>
    )
}

export default Photogallery