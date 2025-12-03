import { Box, Flex, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react";
export function SkeletonCard() {
    return (
        <Box
            width="280px"

            maxW="280px"
            height="420px"
            borderRadius="12px"
            overflow="hidden"
            position="relative"
            bg="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            boxShadow="0 8px 30px rgba(0, 0, 0, 0.15)"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
                transform: "translateY(-8px)",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)"
            }}
        >
            <Box
                position="absolute"
                top="0"
                left="-100%"
                width="100%"
                height="100%"
                background="linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)"
                animation="shimmer 1.5s infinite"
                zIndex="1"
                sx={{
                    '@keyframes shimmer': {
                        '100%': {
                            left: '100%'
                        }
                    }
                }}
            />

            <Skeleton
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                startColor="gray.700"
                endColor="gray.800"
            />

            <Skeleton
                position="absolute"
                top="16px"
                left="16px"
                width="50px"
                height="32px"
                borderRadius="20px"
                startColor="gray.600"
                endColor="gray.700"
                zIndex="2"
            />

            <Skeleton
                position="absolute"
                top="16px"
                right="16px"
                width="120px"
                height="28px"
                borderRadius="6px"
                startColor="gray.600"
                endColor="gray.700"
                zIndex="2"
            />

            <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                p={6}
                zIndex="2"
            >
                <Box mb={4}>
                    <Skeleton
                        height="32px"
                        width="180px"
                        mb={2}
                        startColor="gray.500"
                        endColor="gray.600"
                    />
                    <Skeleton
                        height="32px"
                        width="150px"
                        mb={2}
                        startColor="gray.500"
                        endColor="gray.600"
                    />
                    <Skeleton
                        height="32px"
                        width="120px"
                        startColor="gray.500"
                        endColor="gray.600"
                    />
                </Box>

                <Flex gap={3} mb={4}>
                    <Skeleton
                        width="60px"
                        height="24px"
                        borderRadius="full"
                        startColor="gray.500"
                        endColor="gray.600"
                    />
                    <Skeleton
                        width="70px"
                        height="24px"
                        borderRadius="full"
                        startColor="gray.500"
                        endColor="gray.600"
                    />
                </Flex>

                <Box pt={4} borderTop="1px solid" borderColor="gray.700">
                    <Skeleton
                        height="12px"
                        width="100px"
                        mb={2}
                        startColor="gray.500"
                        endColor="gray.600"
                    />
                    <Skeleton
                        height="20px"
                        width="130px"
                        startColor="gray.500"
                        endColor="gray.600"
                    />
                </Box>

                <Skeleton
                    position="absolute"
                    bottom="20px"
                    right="20px"
                    width="50px"
                    height="16px"
                    startColor="gray.500"
                    endColor="gray.600"
                />
            </Box>
        </Box>
    );
}