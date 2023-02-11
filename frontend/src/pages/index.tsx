import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Header from 'components/declaration_form/header';
import Form from 'components/declaration_form/form';

export default function Home() {
  const router = useRouter();
  const onSubmitSuccess = () => {
    router.push('/success');
  };
  const onSubmitFailure = () => {
    alert('Something went wrong, try again later');
  };
  return (
    <>
      <main>
        <Flex
          position="fixed"
          w="100%"
          h="100%"
          bg="gray.50"
          direction="column"
          overflow="scroll"
        >
          <Header />
          <Flex w="100%" justify="center" grow="1">
            <Box w={['100%', '100%', 960]} bg="white" pt="8px" pb="8px">
              <Form onSuccess={onSubmitSuccess} onFailure={onSubmitFailure} />
            </Box>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
