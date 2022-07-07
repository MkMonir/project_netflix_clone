import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard } from 'swiper';
import 'swiper/css';
import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import './featured.scss';
import Loader from '../loader/Loader';

export default function Featured({ type, setGenre }) {
  const [isLoading, setLoading] = useState(true);
  const [contents, setContents] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/v1/movies/random?type=${type ? type : ''}`,
          {
            headers: {
              token: JSON.parse(localStorage.getItem('user')).token,
              'Content-Type': 'application/json',
            },
          }
        );
        setContents(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Swiper
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Autoplay, Keyboard]}
      >
        {contents.map((content) => (
          <SwiperSlide key={content._id}>
            <div className="featured">
              {type && (
                <div className="category">
                  <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
                  <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
                    <option>Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="western">Western</option>
                    <option value="animation">Animation</option>
                    <option value="drama">Drama</option>
                    <option value="documentary">Documentary</option>
                  </select>
                </div>
              )}
              <img src={content.img} alt={content.title} />

              <div className="info">
                <img src={content.imgTitle} alt={content.title} />
                <span className="desc">{content.desc}</span>
                <div className="buttons">
                  <Link to="/watch" state={{ movie: content }} className="watchLink">
                    <button className="play">
                      <PlayArrow />
                      <span>Play</span>
                    </button>
                  </Link>
                  <button className="more">
                    <InfoOutlined />
                    <span>Info</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
