import React from 'react';
import { Box, Heading, Text } from "@chakra-ui/react";

const Attribute = React.forwardRef(({attr, ...rest}, ref) => (
    <Box ref={ref} bg="gray.100" {...rest} p={2} m={2} rounded="lg" boxShadow="base">
        <Text fontWeight="bold">{"" + attr.charAt(0).toUpperCase() + attr.substring(1)}</Text>
    </Box>
));

export default Attribute;