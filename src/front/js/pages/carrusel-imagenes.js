import React from "react";
import '../../styles/carrusel-imagenes.css';
import carrusel1 from "../../img/carrousel1.png";
import carrusel2 from "../../img/carrousel2.jpg";
import carrusel3 from "../../img/carrousel3.jpg";

export const Carrusel = () => {
  let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 15,
      strech: 0,
      depth: 300,
      modifier: 1,
      slideShadow: true,
    },
    loop: true,
  })
  return (
    // <div id="carouselExampleIndicators" className="carousel slide mb-2" data-bs-ride="carousel" data-bs-interval="3000">
    //   <div className="carousel-indicators">
    //     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    //     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    //     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    //   </div>
    //   <div className="carousel-inner">
    //     <div className="carousel-item active">

    //       <img src={carrusel2} className="d-block w-100 h-100" style={{ objectFit: 'cover' }} />
    //     </div>
    //     <div className="carousel-item">
    //       <img src={carrusel1} className="d-block w-100 h-100" style={{ objectFit: 'cover' }} />
    //     </div>
    //     <div className="carousel-item">
    //       <img src={carrusel3} className="d-block w-100 h-100" style={{ objectFit: 'cover' }} />
    //     </div>
    //   </div>
    //   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Previous</span>
    //   </button>
    //   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Next</span>
    //   </button>
    // </div>
    <div className="swiper mySwiper my-3">
      <div className="swiper-wrapper">
        {/* 1 */}
        {/* <div className="swiper-slide">
          <img className="img-carrusel" src="https://media.licdn.com/dms/image/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=0Q8tP_opTQTHswRBcgHlCOzSIc67crsHE61AGWLOS44" alt="evento de aniversario"></img>
        </div> */}
        {/* 2 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://www.miraflores.gob.pe/wp-content/uploads/2022/08/D23FBC35-C386-47C9-AD69-6E2AFF1443D2-1024x604.jpeg" alt="bellas artes en miraflores"></img>
        </div>
        {/* 3 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://workedmusic.com/wp-content/uploads/2022/12/20221219_154917_0000.png" alt="concierto"></img>
        </div>
        {/* 4 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://i0.wp.com/www.pachaindah.com/html/locales-eventos-lima.jpg?resize=798%2C442&ssl=1" alt="evento de aniversario"></img>
        </div>
        {/* 5 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://grandluxorhotels.com/wp-content/uploads/2016/09/9323706488_7c288a9659_b.jpg" alt="evento empresarial"></img>
        </div>
        {/* 6 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://news.microsoft.com/wp-content/uploads/prod/sites/61/2024/06/Alberto-Granados-hablando-frente-al-publico-de-la-plenaria-en-Microsoft-Envision-AI-Connection-1200x630.jpg" alt="evento de microsoft"></img>
        </div>
        {/* 7 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://grandluxormice.com/es/wp-content/uploads/sites/3/2022/07/Evento-corporativo-e1661944165280-1900x1069.jpg" alt="evento emprendimiento"></img>
        </div>
        {/* 8 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://cevents.es/wp-content/uploads/2021/11/evento-corporativo-imgpost.jpg" alt="evento de oratoria"></img>
        </div>
        {/* 1 */}
        {/* <div className="swiper-slide">
          <img className="img-carrusel" src="https://media.licdn.com/dms/image/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=0Q8tP_opTQTHswRBcgHlCOzSIc67crsHE61AGWLOS44" alt="evento de aniversario"></img>
        </div> */}
        {/* 2 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://i0.wp.com/www.pachaindah.com/html/locales-eventos-lima.jpg?resize=798%2C442&ssl=1" alt="evento de aniversario"></img>
        </div>
        {/* 3 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://grandluxormice.com/es/wp-content/uploads/sites/3/2022/07/Evento-corporativo-e1661944165280-1900x1069.jpg" alt="evento emprendimiento"></img>
        </div>
        {/* 4 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://grandluxorhotels.com/wp-content/uploads/2016/09/9323706488_7c288a9659_b.jpg" alt="evento empresarial"></img>
        </div>
        {/* 5 */}
        <div className="swiper-slide">
          <img className="img-carrusel" src="https://news.microsoft.com/wp-content/uploads/prod/sites/61/2024/06/Alberto-Granados-hablando-frente-al-publico-de-la-plenaria-en-Microsoft-Envision-AI-Connection-1200x630.jpg" alt="evento de microsoft"></img>
        </div>

      </div>


    </div>
  );
};