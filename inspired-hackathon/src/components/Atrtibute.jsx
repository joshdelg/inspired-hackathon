import React from 'react';
import { Box, Heading } from "@chakra-ui/react";

const Attribute = React.forwardRef(({attr, ...rest}, ref) => (
    <Box ref={ref} bg="gray.200" {...rest}>
        <Heading>{attr}</Heading>
    </Box>
));

export default Attribute;