import { Flex, Container } from '@chakra-ui/react';

import Header from 'components/declaration_form/header';

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
          <Header text="Covid-19 Declaration Form" />
          <Flex w="100%" justify="center" grow="1">
            <Flex w={['100%', '100%', 960]} bg="white" pt="8px" pb="8px">
              <Container w="100%" m="0">
                Thank you for your submission!
              </Container>
            </Flex>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
