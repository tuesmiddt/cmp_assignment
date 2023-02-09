import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';

import Header from 'components/declaration_form/header';
import Form from 'components/declaration_form/form';

export default function Home() {
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
              <Form />
            </Box>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
