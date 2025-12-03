import { Box, Image as ChakraImage, Heading, Text, Link, Badge, HStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getMovieDetail } from "./actions";

export default function MovieCard({ movie }) {
    const dispatch = useDispatch();

    return (
        <Box
            width="280px"
            maxW="280px"
            height="420px"
            borderRadius="12px"
            overflow="hidden"
            position="relative"
            bg="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            boxShadow="0 8px 30px rgba(0, 0, 0, 0.3)"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
                transform: "translateY(-8px)",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)"
            }}
        >
            <ChakraImage
                lazyLoad
                src={movie['#IMG_POSTER']}
                alt={movie['#TITLE']}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                objectFit="cover"
                filter="brightness(0.7)"
                transition="transform 0.5s ease"
                _hover={{ transform: "scale(1.1)" }}
            />

            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bg="linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)"
            />

            <Box
                position="absolute"
                top="16px"
                left="16px"
                bg="rgba(0, 0, 0, 0.7)"
                color="white"
                px={4}
                py={2}
                borderRadius="full"
                fontWeight="800"
                fontSize="18px"
                letterSpacing="1px"
                zIndex="2"
                backdropFilter="blur(4px)"
            >
                #{movie['#RANK']}
            </Box>
            <Box
                position="absolute"
                top="16px"
                right="16px"
                bg="rgba(1, 90, 255, 0.7)"
                color="white"
                px={4}
                py={2}
                borderRadius="full"
                fontWeight="800"
                fontSize="18px"
                letterSpacing="1px"
                zIndex="2"
                backdropFilter="blur(4px)"
                cursor="pointer"
                onClick={() => dispatch(getMovieDetail(movie['#IMDB_ID']))}
            >
                Detail
            </Box>
            <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                p={6}
                color="white"
                zIndex="2"
            >
                <Box mb={3}>
                    {movie['#TITLE'].split(' ').map((word, index) => (
                        <Heading
                            key={index}
                            as="div"
                            fontSize={["28px", "32px"]}
                            fontWeight="800"
                            lineHeight="0.9"
                            letterSpacing="-0.5px"
                            textTransform="uppercase"
                            mb={1}
                        >
                            {word}
                        </Heading>
                    ))}
                </Box>

                <HStack spacing={3} mb={4}>
                    <Badge
                        bg="rgba(255, 255, 255, 0.2)"
                        color="white"
                        borderRadius="full"
                        px={3}
                        py={1}
                    >
                        {movie['#YEAR']}
                    </Badge>
                    <Badge
                        bg="rgba(255, 255, 255, 0.2)"
                        color="white"
                        borderRadius="full"
                        px={3}
                        py={1}
                    >
                        MOVIE
                    </Badge>
                </HStack>

                <Box
                    pt={4}
                    borderTop="1px solid rgba(255, 255, 255, 0.2)"
                >
                    <Text
                        fontSize="11px"
                        fontWeight="800"
                        letterSpacing="1px"
                        opacity="0.7"
                        mb={1}
                    >
                        Actors
                    </Text>
                    <Text
                        fontSize="11px"
                        fontWeight="700"
                        letterSpacing="1px"
                        opacity="0.7"
                        mb={3}
                    >
                        {movie['#ACTORS']}
                    </Text>
                </Box>

                <Link
                    href={movie['#IMDB_URL']}
                    position="absolute"
                    bottom="10px"
                    right="20px"
                    color="white"
                    fontSize="12px"
                    fontWeight="600"
                    opacity="0.7"
                    _hover={{ opacity: 1 }}
                    isExternal
                    target="_blank"
                >
                    IMDb →
                </Link>
            </Box>
        </Box>
    );
}