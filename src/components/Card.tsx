import {
  Box,
  Heading,
  Text,
  Image,
  Skeleton,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
}

interface CardProps {
  data: Card;
  viewImage?: (url: string) => void;
}

export function Card({ data, viewImage }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box key={data.ts} borderRadius="md" bgColor="pGray.800">
      <Skeleton isLoaded={!isLoading}>
        <Image
          src={data.url}
          alt={data.title}
          objectFit="cover"
          w="max"
          h="max"
          maxHeight={264}
          borderTopRadius="md"
          onClick={() => viewImage(data.url)}
          onLoad={() => setIsLoading(false)}
          cursor="pointer"
        />
      </Skeleton>

      <Box pt={5} pb={4} px={6}>
        {isLoading ? (
          <>
            <SkeletonText fontSize="2xl" mt={2} noOfLines={1} />
            <SkeletonText fontSize="md" mt={7} noOfLines={1} />
          </>
        ) : (
          <>
            <Heading fontSize="2xl">{data.title}</Heading>
            <Stack direction="row" mt={2.5} spacing={2}>
              <Text fontSize="md">{data.description}</Text>
              <Text as="strong" fontSize={16} fontWeight="bold">
                {data.ts}
              </Text>
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
}
