import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

function Header() {
    return (
        <Box bg="teal.500" p={8}>
            <Heading color="white" letterSpacing={4}>SimpleML</Heading>
        </Box>
    );
}

export default Header;