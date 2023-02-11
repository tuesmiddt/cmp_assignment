import { Box, Heading, Center } from '@chakra-ui/react';

export default function Header({ text }: { text: string }) {
  return (
    <Box p="4" bg="white" borderBottom="1px" borderColor="gray.300">
      <Center>
        <Heading as="h1">{text}</Heading>
      </Center>
    </Box>
  );
}
