import IndexFooter from "../standard_modules/Footer";

const Photogallery = () => {
  //The photos to use in the gallery, makes it easy to add
  const photos = [
    {
      id: 1,
      title: "Plain",
      imgfile:
        "https://live.staticflickr.com/4236/35669515102_2491547155_b.jpg",
      credits: "CCO commons",
    },
    {
      id: 2,
      title: "Guitar",
      imgfile:
        "https://live.staticflickr.com/4197/34710530692_2793edc78f_b.jpg",
      credits: "CCO commons",
    },
    {
      id: 3,
      title: "Landscape",
      imgfile:
        "https://live.staticflickr.com/5748/20859826112_6530e35e9d_b.jpg",
      credits: "U.S. Geological Survey",
    },
    {
      id: 4,
      title: "Purple flower",
      imgfile: "https://live.staticflickr.com/64/180279113_20ff72d1cc.jpg",
      credits: "Kim Siever",
    },
    {
      id: 5,
      title: "Birdspotting",
      imgfile: "https://live.staticflickr.com/5129/5277661905_2f2462bcd4_b.jpg",
      credits: " U. S. Fish and Wildlife Service",
    },
    {
      id: 6,
      title: "Kiwi",
      imgfile:
        "https://live.staticflickr.com/65535/50150206056_49ab093550_b.jpg",
      credits: "Flyhawaiian",
    },
    {
      id: 7,
      title: "Yellow flowers",
      imgfile:
        "https://live.staticflickr.com/65535/48698180318_125e120844_b.jpg",
      credits: "Lexe-i",
    },
    {
      id: 8,
      title: "Wineyard",
      imgfile:
        "https://live.staticflickr.com/65535/49189794526_bee86eafac_b.jpg",
      credits: "Bonnie Moreland",
    },
    {
      id: 9,
      title: "Biking",
      imgfile: "https://live.staticflickr.com/278/19371842885_abcdb54a9e_b.jpg",
      credits: "GlacierNPS",
    },
    {
      id: 10,
      title: "Hiking",
      imgfile: "https://live.staticflickr.com/2745/4427396733_b37a240d53_b.jpg",
      credits: "GlacierNPS",
    },
    {
      id: 11,
      title: "Golf",
      imgfile: "https://live.staticflickr.com/2701/4291741802_f236fe5be4_b.jpg",
      credits: "Presidio of Monterey: DLIFLC & USAG",
    },
    {
      id: 12,
      title: "Piano",
      imgfile: "https://live.staticflickr.com/3066/3042002903_438f30ddb4_b.jpg",
      credits: "Kim Siever",
    },
  ];

  return (
    <>
      <section className="gallery container">
        <h2 className="gallery__title">
          Some things to enjoy in your todo-free time
        </h2>
        <div className="gallery__photos">
          {photos.length > 0 &&
            photos.map(({ id, title, imgfile, credits }) => (
              <div key={id} className="galleryimgholder">
                <img
                  src={imgfile}
                  alt={title}
                  title={title}
                  className="galleryimgholder__img"
                />
                <div className="galleryimgholder__textblock">
                  <h3 className="galleryimgholder__textblock__title">
                    {title}
                  </h3>
                  <h3 className="galleryimgholder__textblock__title">
                    {credits}
                    <span className="galleryimgholder__textblock__title__copyright">
                      {" "}
                      &#169;
                    </span>
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </section>
      <IndexFooter />
    </>
  );
};

export default Photogallery;
