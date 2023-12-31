import Carousel from "nuka-carousel"; 
import { easeCubicInOut } from "d3-ease";

import LoadingButton from '@mui/lab/LoadingButton';

import Iconify from "../../../components/iconify";
import { useRouter } from '../../../routes/hooks';

const heroData = [
  {
    id: 1,
    image: "/assets/images/images/img-hero1.webp",
    title: 'Empowering Farmers, Harvesting Success',
    description: '"Empowering Farmers, Harvesting Success" A powerful message of support and collaboration within the agricultural community. It signifies the mission of providing farmers with the tools, knowledge, and resources they need to thrive.',
  },
  {
    id: 2,
    image: '/assets/images/images/img-hero2.webp',
    title: 'Sow, Grow, and Prosper with Us',
    description: 'Sow, Grow, and Prosper with Us" encapsulates the entire agricultural cycle, from the inception of a farming project to its fruitful culmination, and it invites individuals or businesses to be part of this journey toward prosperity and success. Its a tagline that conveys commitment, growth, and shared achievement.',
  },
  {
    id: 3,
    image: '/assets/images/images/img-hero3.jpg',
    title: 'Elevating Agriculture to New Heights',
    description: 'A Commitment to advancing and modernizing the agricultural industry. It signifies a drive to push the boundaries of traditional farming practices and embrace innovation, technology, and sustainable methods. "Elevating" suggests an upward trajectory, emphasizing progress and growth within the field.',
  }
]

function AppHero() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  }
  

  return (
    <section id="home" className="hero-block" height="80%" style={{ marginTop: '80px' }}>
      <Carousel dragging autoplay autoplayInterval={5000} wrapAround pauseOnHover easing={easeCubicInOut} edgeEasing={easeCubicInOut} 
       renderCenterLeftControls={({ previousSlide }) => (
        <Iconify
          icon='eva:arrow-ios-back-fill'
          onClick={previousSlide}
          style={{ height:'10%', width:'8%' , position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', zIndex: 1, color:'white', cursor:'pointer' }}
        />
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <Iconify
          icon='eva:arrow-ios-forward-fill'
          onClick={nextSlide}
          style={{ height:'10%', width:'8%' , position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)', zIndex: 1, color:'white', cursor:'pointer' }}
        />
      )}
      >
        {heroData.map((hero) => (
          <div key={hero.id} style={{ position: 'relative', height: '92.5vh' }}>
            <img
              src={hero.image}
              alt={`slide ${hero.id}`}
              style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'brightness(50%)' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
              }}
            >
              <h2>{hero.title}</h2>
              <p>{hero.description}</p>
              <LoadingButton
                size="large"
                type="submit"
                variant="outlined"
                color="inherit"
                onClick={handleClick}
                style={{ width: '30%', padding: '20px' }}
              >
                Get Started
              </LoadingButton>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default AppHero;
