import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type formValidationsProps = {
  image: RegisterOptions;
  title: RegisterOptions;
  description: RegisterOptions;
};

type imageData = {
  url: string;
  title: string;
  description: string;
};

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations: formValidationsProps = {
    image: {
      required: {
        value: true,
        message: 'Insira uma Imagem',
      },
      pattern: {
        value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g,
        message: 'Insira imagens com extensão PNG, JPGEG OU GIF',
      },
      validate: {
        lessThan10MB: files => files[0]?.size < 10000000 || 'Max 10MB',
        acceptedFormats: files =>
          ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type) ||
          'Only PNG, JPEG e GIF',
      },
    },
    title: {
      required: {
        value: true,
        message: 'Insira um titulo',
      },
      maxLength: {
        value: 15,
        message: 'O titulo deve ter no maximo 15 caracteres',
      },
      minLength: {
        value: 1,
        message: 'O titulo deve ter no minimo 1 caracteres',
      },
    },
    description: {
      required: {
        value: true,
        message: 'Insira um titulo',
      },
      maxLength: {
        value: 50,
        message: 'O titulo deve ter no maximo 100 caracteres',
      },
      minLength: {
        value: 5,
        message: 'O titulo deve ter no minimo 10 caracteres',
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (formData: imageData) => {
      const response = await api.post('api/images', formData);

      return response.data;
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('images');
      },
    }
  );

  const { register, handleSubmit, formState, setError, trigger } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    const formData: imageData = {
      url: imageUrl,
      title: String(data.title),
      description: String(data.description),
    };

    try {
      if (imageUrl === '') {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });

        return;
      }

      await mutation.mutateAsync(formData).catch(() => {
        toast({
          title: 'Falha no cadastro',
          description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });

      toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors?.image}
          {...register('image', {
            required: {
              value: true,
              message: 'Campo Obrigatorio* (Insira uma Imagem)',
            },
            pattern: {
              value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g,
              message: 'Insira imagens com extensão PNG, JPGEG OU GIF',
            },
            validate: {
              lessThan10MB: files => files[0]?.size < 10000000 || 'Max 10MB',
              acceptedFormats: files =>
                ['image/jpeg', 'image/png', 'image/gif'].includes(
                  files[0]?.type
                ) || 'Only PNG, JPEG e GIF',
            },
          })}
        />

        <TextInput
          name="title"
          placeholder="Título da imagem..."
          error={errors?.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          name="textbox"
          placeholder="Descrição da imagem..."
          error={errors?.description}
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function http(arg0: any) {
  throw new Error('Function not implemented.');
}
