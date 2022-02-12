// import { Box, Heading, Flex, Progress } from '@chakra-ui/react';

// export function Loading(): JSX.Element {
//   return (
//     <Flex
//       justifyContent="center"
//       alignItems="center"
//       h="100vh"
//       flexDir="column"
//     >
//       <Box>
//         <Heading>Carregando aplicação...</Heading>
//         <Progress
//           mt={4}
//           size="xs"
//           isIndeterminate
//           bgColor="transparent"
//           colorScheme="orange"
//         />
//       </Box>
//     </Flex>
//   );
// }

// MY LAYOUT

import { Heading, Center, Stack, Spinner } from '@chakra-ui/react';

export function Loading(): JSX.Element {
  return (
    <Center width="100%" height="100%" minHeight="75vh">
      <Stack direction="column" spacing={5}>
        <Heading fontSize={22}>Carregando aplicação...</Heading>
        <Center>
          <Spinner size="lg" />
        </Center>
      </Stack>
    </Center>
  );
}
