import React, { useState } from 'react';
import {
    Box,
    Flex,
    Grid,
    Text,
    Heading,
    Image,
    Badge,
    Button,
    SimpleGrid,
    Stack,
    HStack,
    VStack,
    Icon,
    useDisclosure,
    Drawer,
    Portal,
    CloseButton,
    SkeletonCircle,
    SkeletonText,
    Skeleton,
    Dialog,
} from '@chakra-ui/react';
import {
    FaStar,
    FaRegStar,
    FaPlay,
    FaImdb,
    FaCalendarAlt,
    FaClock,
    FaGlobe,
    FaLanguage,
    FaAward,
    FaImage,
    FaQuoteRight,
} from 'react-icons/fa';
import styled from 'styled-components';
import DOMPurify from "dompurify";

// Styled components
const StyledContainer = styled(Box)`
  background: linear-gradient(180deg, #f3f3f3 0%, #fff 100%);
  min-height: 100vh;
`;

const MainSection = styled(Box)`
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${props => props.bgImage || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3'});
  background-size: cover;
  background-position: center;
  color: white;
`;

const RatingBar = styled(Box)`
  position: relative;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.percentage}%;
    background: ${props => props.color || '#f5c518'};
  }
`;

const CastCard = styled(Box)`
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

const MovieDetail = ({ movieData, open, close, isLoading }) => {
    // test data
    // const movieData = {
    //     // Movie data from the provided JSON
    //     title: "Ajnabee",
    //     year: 2001,
    //     rating: 6.4,
    //     voteCount: 9646,
    //     runtime: "2h 45m",
    //     genres: ["Action", "Crime", "Drama", "Mystery", "Romance", "Thriller"],
    //     plot: "A newlywed couple, Raj and Priya, move to Switzerland and become friends with their new neighbors, Vicky and Sonia. But one day, Raj is accused of Sonia's murder and goes on the run in order to prove his innocence.",
    //     poster: "https://m.media-amazon.com/images/M/MV5BMjE3ZmFiOGQtY2U4Ni00YTM4LTk3NTItNzQ3MDg2MmVkMjM2XkEyXkFqcGc@._V1_.jpg",
    //     trailer: "https://www.imdb.com/video/vi2554248985/",
    //     director: ["Abbas Alibhai Burmawalla", "Mastan Alibhai Burmawalla"],
    //     writers: ["Robin Bhatt", "Sanjeev Duggal", "Shyam Goel"],
    //     stars: ["Akshay Kumar", "Bobby Deol", "Kareena Kapoor", "Bipasha Basu"],
    //     releaseDate: "2001-09-21",
    //     country: "India",
    //     language: "Hindi",
    //     awards: 5,
    //     nominations: 12,
    //     boxOffice: "$91,928",
    //     ratingDistribution: [
    //         { rating: 10, count: 1832 },
    //         { rating: 9, count: 1082 },
    //         { rating: 8, count: 1304 },
    //         { rating: 7, count: 1965 },
    //         { rating: 6, count: 1773 },
    //         { rating: 5, count: 814 },
    //         { rating: 4, count: 343 },
    //         { rating: 3, count: 179 },
    //         { rating: 2, count: 121 },
    //         { rating: 1, count: 233 },
    //     ],
    //     cast: [
    //         { name: "Akshay Kumar", character: "Vikram Bajaj", image: "https://m.media-amazon.com/images/M/MV5BODI4NDY1NzkyM15BMl5BanBnXkFtZTgwNzM3MDM0OTE@._V1_.jpg" },
    //         { name: "Bobby Deol", character: "Raj Malhotra", image: "https://m.media-amazon.com/images/M/MV5BNmY0OThkMjYtNjU5Zi00NjM3LWI4ZGMtN2RhMTlkYjcxMTViXkEyXkFqcGc@._V1_.jpg" },
    //         { name: "Kareena Kapoor", character: "Priya Malhotra", image: "https://m.media-amazon.com/images/M/MV5BMjAyNjM4NTAwN15BMl5BanBnXkFtZTcwNDkxNzQzNg@@._V1_.jpg" },
    //         { name: "Bipasha Basu", character: "Sonia", image: "https://m.media-amazon.com/images/M/MV5BNzRjYmFlMTMtN2NjNC00NjQ3LThiMjQtNjUxMTQzYmVkM2MzXkEyXkFqcGc@._V1_.jpg" },
    //     ],
    //     reviews: [
    //         { author: "rags18", rating: 2, date: "2008-03-31", summary: "Poor copy of Hollywood flick 'Consenting Adults' (1992)", text: "Abbas-Mastan's movies are known to make suspense thrillers..." },
    //         { author: "milindgaikwad-33192", rating: 9, date: "2023-01-15", summary: "Hollywood level thriller", text: "Way ahead of his time. Might be copied from some Hollywood flick..." },
    //     ],
    //     trivia: ["Akshay won Filmfare Award for Best Villain for his role, his first Filmfare award."],
    //     goofs: ["After the court scene, Bobby runs on a road and enters the subway, but Switzerland has no subway services."],
    //     quotes: ["Who the hell are you?", "Don't waste my time. Just answer me or I'll shoot you."],
    //     similarMovies: [
    //         { title: "Aitraaz", year: 2004, rating: 6.6 },
    //         { title: "Humraaz", year: 2002, rating: 6.5 },
    //         { title: "Khiladi", year: 1992, rating: 7.1 },
    //     ],
    //     images: [
    //         "https://m.media-amazon.com/images/M/MV5BMjEzOTkzNDM0Nl5BMl5BanBnXkFtZTgwMzI0NjgwNjE@._V1_.jpg",
    //         "https://m.media-amazon.com/images/M/MV5BMTY1NDAzMzQ3MF5BMl5BanBnXkFtZTcwMjg5MTAwMQ@@._V1_.jpg",
    //     ],
    // };

    const { open: isOpen, onOpen, onClose } = useDisclosure();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const openTrailer = () => {
        setSelectedVideo(movieData.trailer);
        onOpen();
    };

    const getRatingColor = (rating) => {
        if (rating >= 7) return 'green';
        if (rating >= 5) return 'yellow';
        return 'red';
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating / 2);
        const hasHalfStar = rating % 2 >= 1;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Icon as={FaStar} key={i} color="yellow.400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<Icon as={FaStar} key={i} color="yellow.400" opacity={0.5} />);
            } else {
                stars.push(<Icon as={FaRegStar} key={i} color="gray.300" />);
            }
        }
        return stars;
    };

    return (
        <Drawer.Root open={open} onOpenChange={(e) => close(e.open)} size="lg">
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Drawer Title</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            {isLoading ? <Stack gap="6" maxW="xs">
                                <HStack width="full">
                                    <SkeletonCircle size="10" />
                                    <SkeletonText noOfLines={2} />
                                </HStack>
                                <Skeleton height="200px" />
                            </Stack> : <StyledContainer>
                                <MainSection bgImage={movieData.poster} py={12}>
                                    <Box maxW="1400px" mx="auto" px={4}>
                                        <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}>
                                            <Box>
                                                <Image
                                                    src={movieData.poster}
                                                    alt={movieData.title}
                                                    borderRadius="lg"
                                                    boxShadow="2xl"
                                                    width="300px"
                                                    height="450px"
                                                    objectFit="cover"
                                                />
                                                <Button
                                                    mt={4}
                                                    w="100%"
                                                    colorScheme="yellow"
                                                    leftIcon={<FaPlay />}
                                                    onClick={openTrailer}
                                                >
                                                    Watch Trailer
                                                </Button>
                                            </Box>

                                            <Box>
                                                <Flex align="center" mb={2}>
                                                    <Icon as={FaImdb} color="yellow.400" boxSize={8} mr={2} />
                                                    <Heading as="h1" size="2xl" fontWeight="bold">
                                                        {movieData.title} <Text as="span" fontWeight="normal" opacity={0.8}>({movieData.year})</Text>
                                                    </Heading>
                                                </Flex>

                                                <Flex gap={4} mb={6} flexWrap="wrap">
                                                    <Badge colorScheme="green" fontSize="md" px={3} py={1}>
                                                        {movieData.certificate || 'Not Rateqd'}
                                                    </Badge>
                                                    <Text>
                                                        <Icon as={FaCalendarAlt} mr={1} />
                                                        {new Date(movieData.releaseDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </Text>
                                                    <Text>
                                                        <Icon as={FaClock} mr={1} />
                                                        {movieData.runtime}
                                                    </Text>
                                                    <Text>
                                                        <Icon as={FaGlobe} mr={1} />
                                                        {movieData.country}
                                                    </Text>
                                                </Flex>

                                                <HStack mb={6} spacing={2} flexWrap="wrap">
                                                    {movieData?.genres?.map((genre, index) => (
                                                        <Badge key={index} colorScheme="blue" variant="subtle" px={3} py={1}>
                                                            {genre}
                                                        </Badge>
                                                    ))}
                                                </HStack>

                                                <Box bg="blackAlpha.800" p={6} borderRadius="lg" mb={6}>
                                                    <Flex align="center" mb={4}>
                                                        <Box mr={4}>
                                                            <Heading size="lg" color="yellow.400">
                                                                {movieData.rating}/10
                                                            </Heading>
                                                            <Text fontSize="sm" color="gray.300">
                                                                {movieData?.voteCount?.toLocaleString()} votes
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Flex>
                                                                {renderStars(movieData.rating)}
                                                            </Flex>
                                                            <Text fontSize="sm" color="gray.300">
                                                                Your rating
                                                            </Text>
                                                        </Box>
                                                    </Flex>

                                                    <VStack spacing={2} align="stretch">
                                                        {movieData?.ratingDistribution?.map((dist, index) => {
                                                            const percentage = (dist.count / movieData.voteCount) * 100;
                                                            const colors = ['#00B050', '#92D050', '#FFC000', '#FF6600', '#C00000'];
                                                            return (
                                                                <Flex key={`${dist.rating} + ${index}`} align="center">
                                                                    <Text w="20px" color="gray.300" mr={2}>{dist.rating}</Text>
                                                                    <RatingBar
                                                                        flex="1"
                                                                        percentage={percentage}
                                                                        color={colors[Math.floor((10 - dist.rating) / 2)]}
                                                                    />
                                                                    <Text w="60px" textAlign="right" color="gray.300" ml={2}>
                                                                        {dist?.count?.toLocaleString()}
                                                                    </Text>
                                                                </Flex>
                                                            );
                                                        })}
                                                    </VStack>
                                                </Box>

                                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
                                                    <Box>
                                                        <Text fontWeight="bold" mb={2}>Director</Text>
                                                        {movieData?.director?.map((dir, idx) => (
                                                            <Text key={idx} color="gray.300">{dir}</Text>
                                                        ))}
                                                    </Box>
                                                    <Box>
                                                        <Text fontWeight="bold" mb={2}>Writers</Text>
                                                        {movieData?.writers?.slice(0, 2)?.map((writer, idx) => (
                                                            <Text key={idx} color="gray.300">{writer}</Text>
                                                        ))}
                                                        {movieData?.writers?.length > 2 && (
                                                            <Text color="gray.500">+{movieData?.writers?.length - 2} more</Text>
                                                        )}
                                                    </Box>
                                                    <Box>
                                                        <Text fontWeight="bold" mb={2}>Stars</Text>
                                                        {movieData?.stars?.slice(0, 3)?.map((star, idx) => (
                                                            <Text key={idx} color="gray.300">{star}</Text>
                                                        ))}
                                                        <Text color="gray.500">+{movieData?.stars?.length - 3} more</Text>
                                                    </Box>
                                                    <Box>
                                                        <Text fontWeight="bold" mb={2}>Language</Text>
                                                        <Flex align="center">
                                                            <Icon as={FaLanguage} mr={2} />
                                                            <Text color="gray.300">{movieData.language}</Text>
                                                        </Flex>
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </MainSection>

                                {/* Main Content */}
                                <Box maxW="1400px" mx="auto" px={4} py={8}>
                                    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
                                        {/* Left Column */}
                                        <Box>
                                            {/* Synopsis */}
                                            <Box mb={8}>
                                                <Heading as="h2" size="lg" mb={4} color="gray.800">
                                                    Synopsis
                                                </Heading>
                                                <Text color="gray.600" fontSize="lg" lineHeight="tall">
                                                    {movieData.plot}
                                                </Text>
                                            </Box>

                                            {/* <Divider mb={8} /> */}

                                            <Box mb={8}>
                                                <Flex align="center" mb={4}>
                                                    <Heading as="h2" size="lg" color="gray.800">
                                                        Top Cast
                                                    </Heading>
                                                </Flex>
                                                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
                                                    {movieData?.cast?.map((actor, index) => (
                                                        <CastCard key={index}>
                                                            <Image
                                                                src={actor.image}
                                                                alt={actor.name}
                                                                borderRadius="md"
                                                                height="200px"
                                                                width="100%"
                                                                objectFit="cover"
                                                                mb={2}
                                                            />
                                                            <Text color="gray.600" fontWeight="bold">{actor.name}</Text>
                                                            <Text fontSize="sm" color="gray.600">{actor.character}</Text>
                                                        </CastCard>
                                                    ))}
                                                </SimpleGrid>
                                            </Box>

                                            {/* <Divider mb={8} /> */}

                                            <Box mb={8}>
                                                <Heading as="h2" size="lg" mb={4} color="gray.800">
                                                    User Reviews
                                                </Heading>
                                                <Stack spacing={6}>
                                                    {movieData?.reviews?.map((review, index) => (
                                                        <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
                                                            <Flex justify="space-between" mb={2}>
                                                                <Text color="gray.600" fontWeight="bold">{review.author}</Text>
                                                                <Badge colorScheme={getRatingColor(review.rating)}>
                                                                    {review.rating}/10
                                                                </Badge>
                                                            </Flex>
                                                            <Text fontSize="sm" color="gray.500" mb={2}>
                                                                {new Date(review.date).toLocaleDateString()}
                                                            </Text>
                                                            <Text color="gray.600" fontWeight="semibold" mb={2}>{review.summary}</Text>
                                                            <Box color="gray.600" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.text) }} />
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            </Box>

                                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
                                                <Box>
                                                    <Heading as="h3" size="md" mb={4} color="gray.800">
                                                        <Icon as={FaAward} mr={2} />
                                                        Did You Know?
                                                    </Heading>
                                                    <Box p={4} bg="blue.50" borderRadius="lg">
                                                        {movieData?.trivia?.map((item, index) => (
                                                            <Box display="flex">
                                                                <Text color="gray.600" key={index} mr={2}>•</Text>
                                                                <div key={index} style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <Heading as="h3" size="md" mb={4} color="gray.800">
                                                        <Icon as={FaQuoteRight} mr={2} />
                                                        Goofs
                                                    </Heading>
                                                    <Box p={4} bg="red.50" borderRadius="lg">
                                                        {movieData?.goofs?.map((goof, index) => (
                                                            <Box display="flex">
                                                                <Text color="gray.600" key={index} mr={2}>•</Text>
                                                                <div key={index} style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(goof) }} />
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>

                                        <Box>
                                            <Box mb={8} p={6} borderWidth="1px" borderRadius="lg">
                                                <Heading as="h3" size="md" mb={4} color="gray.800">
                                                    Box Office & Awards
                                                </Heading>
                                                <VStack spacing={4} align="stretch">
                                                    <Box>
                                                        <Text fontWeight="semibold" color="gray.600">Worldwide Gross</Text>
                                                        <Text color="gray.600" fontSize="xl" fontWeight="bold">{movieData.boxOffice}</Text>
                                                    </Box>
                                                    <Box>
                                                        <Text fontWeight="semibold" color="gray.600">Awards</Text>
                                                        <HStack>
                                                            <Badge colorScheme="green">{movieData.awards} wins</Badge>
                                                            <Badge colorScheme="blue">{movieData.nominations} nominations</Badge>
                                                        </HStack>
                                                    </Box>
                                                </VStack>
                                            </Box>

                                            <Box mb={8}>
                                                <Heading as="h3" size="md" mb={4} color="gray.800">
                                                    <Icon as={FaImage} mr={2} />
                                                    Photos
                                                </Heading>
                                                <SimpleGrid columns={2} spacing={2}>
                                                    {movieData?.images?.slice(0, 4)?.map((img, index) => (
                                                        <Image
                                                            key={index}
                                                            src={img}
                                                            alt={`${movieData.title} still ${index + 1}`}
                                                            borderRadius="md"
                                                            height="120px"
                                                            objectFit="cover"
                                                        />
                                                    ))}
                                                </SimpleGrid>
                                                <Button mt={4} w="full" variant="outline">
                                                    See all photos
                                                </Button>
                                            </Box>

                                            <Box mb={8}>
                                                <Heading as="h3" size="md" mb={4} color="gray.800">
                                                    More Like This
                                                </Heading>
                                                <Stack spacing={3}>
                                                    {movieData?.similarMovies?.map((movie, index) => (
                                                        <Flex key={index} p={3} borderWidth="1px" borderRadius="md" align="center">
                                                            <Box flex={1}>
                                                                <Text fontWeight="semibold">{movie.title}</Text>
                                                                <Text fontSize="sm" color="gray.600">{movie.year}</Text>
                                                            </Box>
                                                            <Badge colorScheme={getRatingColor(movie.rating)}>
                                                                {movie.rating}
                                                            </Badge>
                                                        </Flex>
                                                    ))}
                                                </Stack>
                                            </Box>

                                            <Box p={6} borderWidth="1px" borderRadius="lg">
                                                <Heading as="h3" size="md" mb={4} color="gray.800">
                                                    Technical Specifications
                                                </Heading>
                                                <VStack spacing={2} align="stretch">
                                                    <Flex justify="space-between">
                                                        <Text color="gray.600">Runtime</Text>
                                                        <Text fontWeight="semibold">{movieData.runtime}</Text>
                                                    </Flex>
                                                    <Flex justify="space-between">
                                                        <Text color="gray.600">Sound Mix</Text>
                                                        <Text fontWeight="semibold">Dolby Digital</Text>
                                                    </Flex>
                                                    <Flex justify="space-between">
                                                        <Text color="gray.600">Color</Text>
                                                        <Text fontWeight="semibold">Color</Text>
                                                    </Flex>
                                                    <Flex justify="space-between">
                                                        <Text color="gray.600">Aspect Ratio</Text>
                                                        <Text fontWeight="semibold">2.35 : 1</Text>
                                                    </Flex>
                                                </VStack>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Box>

                                <Dialog.Root open={isOpen} onOpenChange={() => onClose()} size="xl">
                                    <Portal>
                                        <Dialog.Backdrop />
                                        <Dialog.Positioner>
                                            <Dialog.Content>
                                                <Dialog.Header>
                                                    <Dialog.Title>Dialog Title</Dialog.Title>
                                                </Dialog.Header>
                                                <Dialog.Body>
                                                    {selectedVideo && (
                                                        <Box position="relative" paddingTop="56.25%">
                                                            <iframe
                                                                src={selectedVideo}
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    border: 'none',
                                                                }}
                                                                title="Movie Trailer"
                                                                allowFullScreen
                                                            />
                                                        </Box>
                                                    )}
                                                </Dialog.Body>
                                                <Dialog.Footer>
                                                    <Dialog.ActionTrigger asChild>
                                                        <Button onClick={() => onClose()} variant="outline">Cancel</Button>
                                                    </Dialog.ActionTrigger>
                                                </Dialog.Footer>
                                                <Dialog.CloseTrigger asChild>
                                                    <CloseButton size="sm" />
                                                </Dialog.CloseTrigger>
                                            </Dialog.Content>
                                        </Dialog.Positioner>
                                    </Portal>
                                </Dialog.Root>
                            </StyledContainer>}
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
};

export default MovieDetail;