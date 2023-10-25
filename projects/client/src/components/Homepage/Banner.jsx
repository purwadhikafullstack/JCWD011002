import React from "react"
import {
  Box,
  Icon,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1
}

export default function Banner() {
  const [slider, setSlider] = React.useState(null)
  const top = useBreakpointValue({ base: "90%", md: "50%" })
  const side = useBreakpointValue({ base: "30%", md: "40px" })

  const cards = [
    {
      image: "/images/banner1.jpg",
    },
    {
      image: "/images/banner2.jpg",

    },
    {
      image: "/images/banner3.jpg",

    }
  ]

  const iconBtnAttr = {
    bg: "primary",
    color: "white",
    position: "absolute",
    top: top,
    transform: "translate(0%, -50%)",
    zIndex: 2,
    _hover: {
      bg: "editSecondary"
    }
  }

  return (
    <Box
      position={"relative"}
      height={["300px", "400px", "500px"]}
      // minHeight={"300px"}
      width={"full"}
      overflow={"hidden"}
    >
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        {...iconBtnAttr}
        left={side}
        onClick={() => slider?.slickPrev()}
      >
        <Icon as={ChevronLeftIcon} boxSize={"30px"} />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        {...iconBtnAttr}
        right={side}
        onClick={() => slider?.slickNext()}
      >
        <Icon as={ChevronRightIcon} boxSize={"30px"} />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={slider => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            // height={"6xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
            borderRadius={"xl"}
            height={["300px", "400px", "500px"]}
            width={"full"}
          >
          </Box>
        ))}
      </Slider>
    </Box>
  )
}
