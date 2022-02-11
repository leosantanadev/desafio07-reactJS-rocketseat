import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg="pGray.800"
        width="max"
        height="max"
        maxHeight={600}
        maxWidth={900}
      >
        <ModalBody p="1">
          <Flex>
            <Image
              borderRadius="sm"
              src={imgUrl}
              width="100%"
              height="100%"
              maxHeight={500}
              maxWidth={800}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width="100%" alignItems="left" justifyContent="left">
            <Link href={imgUrl} isExternal>
              Abrir original
            </Link>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
