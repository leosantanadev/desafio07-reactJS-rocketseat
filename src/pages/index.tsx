import { Box, Button, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { useInView } from 'react-intersection-observer';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const response = await api.get('api/images', {
        params: { after: pageParam },
      });

      return response;
    },
    {
      getNextPageParam: (fecthImageResponse: AxiosResponse) =>
        fecthImageResponse.data?.after ?? false,
    }
  );

  const formattedData = useMemo(() => {
    const currentData = data?.pages.map(page => {
      return page.data;
    });

    const formattedCardData = currentData?.map(pageData => {
      const dataPerPage = pageData.data;

      return dataPerPage;
    });

    return formattedCardData?.flat();
  }, [data]);

  // useEffect with intersectionObserver to load page on infinite scroll
  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView]);

  if (isLoading) {
    return (
      <>
        <Header />

        <Loading />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />

        <Error />
      </>
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const loadPage = () => {
    fetchNextPage();
  };

  return (
    <>
      <Header />

      <Box height="max" maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        <Box display="flex" alignItems="center" justifyContent="center" pt="8">
          {hasNextPage ? (
            <Button colorscheme="orange" type="button" onClick={loadPage}>
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
          ) : (
            <Text>Não há mais imagens</Text>
          )}
        </Box>

        {/* My Layout */}
        {/* LoadOnInfiniteScroll */}
        {/* <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="14"
          ref={ref}
          id="infinit-scroll"
          width="100"
          height="30px"
        >
          <Stack
            display="flex"
            alignItems="center"
            direction="row"
            spacing="4"
            bg="orange.500"
            px="6"
            py="2"
            borderRadius="md"
          >
            <Text>
              {isLoading || isFetchingNextPage
                ? 'Carregando'
                : 'Não há mais paginas'}
            </Text>
            {(isLoading || isFetchingNextPage) && <Spinner size="sm" />}
          </Stack>
        </Box> */}
      </Box>
    </>
  );
}
