import Carousel from 'react-bootstrap/esm/Carousel';

import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from '../../../routes/hooks';

const heroData = [
  {
    id: 1,
    image: "/assets/images/images/img-hero1.jpg",
    title: 'Empowering Farmers, Harvesting Success',
    description:  '"Empowering Farmers, Harvesting Success" A powerful message of support and collaboration within the agricultural community. It signifies the mission of providing farmers with the tools, knowledge, and resources they need to thrive.',
      // we have to change the link here to the dashboard
  },
  {
    id: 2,
    image: '/assets/images/images/img-hero2.jpg',
    title: 'Sow, Grow, and Prosper with Us',
    description: 'Sow, Grow, and Prosper with Us" encapsulates the entire agricultural cycle, from the inception of a farming project to its fruitful culmination, and it invites individuals or businesses to be part of this journey toward prosperity and success. Its a tagline that conveys commitment, growth, and shared achievement.',
     // we have to change the link here to the dashboard
  
  },
  {
    id: 3,
    image: '/assets/images/images/img-hero3.jpg',
    title: 'Elevating Agriculture to New Heights',
    description: 'A Commitment to advancing and modernizing the agricultural industry. It signifies a drive to push the boundaries of traditional farming practices and embrace innovation, technology, and sustainable methods. "Elevating" suggests an upward trajectory, emphasizing progress and growth within the field. ',
    // we have to change the link here to the dashboard
   
  }
]

function AppHero() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  }

  return (
    <section id="home" className="hero-block" height="80%" style={{ marginTop: '80px' }}>
       <Carousel height="80%">
          {
            heroData.map(hero => (
                  <Carousel.Item key={hero.id}>
                    <img src={hero.image} width="100%" height="80%" 
                      alt={`slide ${  hero.id}`} style={{ objectFit: 'cover', width: '100%', height: '93.5vh' }}
                    />
                    <Carousel.Caption>
                      <h2>{hero.title}</h2>
                      <p>{hero.description}</p>
                      <LoadingButton
                          size="large"
                          type="submit"
                          variant="outlined"
                          color="inherit"
                          onClick={handleClick}
                          onFocus={{variant: "contained"}}
                          sx={{ mt: 2, width: '20%' }}>
                        Get Started
                      </LoadingButton>
                    </Carousel.Caption>             
                  </Carousel.Item>
              ))
          }
      </Carousel>
    </section>
  );
}

export default AppHero;