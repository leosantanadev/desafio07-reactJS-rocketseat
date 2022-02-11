import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewImage, setViewImage] = useState('');

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const openModalViewImage = (url: string) => {
    onOpen();
    setViewImage(url);
  };

  return (
    <SimpleGrid
      minHeight="100vh"
      gridTemplateColumns="repeat(2, 1fr)"
      spacing="8"
      row="auto"
    >
      {cards?.map(data => (
        <Card key={data.ts} data={data} viewImage={openModalViewImage} />
      ))}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={viewImage} />
    </SimpleGrid>
  );
}
