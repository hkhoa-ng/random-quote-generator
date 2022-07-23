import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaTwitter, FaFacebook } from "react-icons/fa";

import {
  ButtonGroup,
  VStack,
  Button,
  Flex,
  Spacer,
  Text,
  Box,
  Container,
  Link,
} from "@chakra-ui/react";

export default function QuoteCard() {
  const [quote, setQuote] = useState({});
  const [getNew, setGetNew] = useState(true);

  const ALL_THEMES = [
    "teal",
    "blue",
    "red",
    "green",
    "purple",
    "orange",
    "blackAlpha",
  ];

  const color = ALL_THEMES[Math.floor(Math.random() * ALL_THEMES.length)];

  console.log(color);

  useEffect(() => {
    async function fetchQuote() {
      fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((data) => {
          setQuote({
            content: data.content,
            author: data.author,
          });
        });
    }
    fetchQuote();
  }, [getNew]);

  const getNewQuote = () => {
    setGetNew((prev) => !prev);
  };

  let twitterLink = "";

  if (quote) {
    twitterLink =
      "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
      encodeURIComponent('"' + quote.content + '" - ' + quote.author);
  } else {
    twitterLink =
      "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
      encodeURIComponent("https://hkhoa-ng.github.io/random-quote-generator");
  }

  const faceBookLink =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent("https://hkhoa-ng.github.io/random-quote-generator");

  return (
    <Container maxW="100%" h="100vh" bg={color} m="auto" centerContent>
      <Box
        padding="5"
        bg="white"
        color={color}
        maxW="md"
        rounded="md"
        m="auto auto"
        boxShadow="dark-lg"
      >
        <VStack spacing={4}>
          <Flex>
            <Text fontSize="2xl" ml="0.1em">
              <FaQuoteLeft size="1.5em" />
              {quote && quote.content}
            </Text>
          </Flex>

          <Flex w="100%">
            <Spacer />
            <Text fontSize="md" right="10" ms="100">
              - {quote && quote.author}
            </Text>
          </Flex>

          <Flex width="100%">
            <ButtonGroup gap="2">
              <Button colorScheme={color} boxShadow="md">
                <Link href={twitterLink} isExternal>
                  <FaTwitter color="white" size="1em" />
                </Link>
              </Button>
              <Button colorScheme={color} boxShadow="md">
                <Link href={faceBookLink} isExternal>
                  <FaFacebook color="white" size="1em" />
                </Link>
              </Button>
            </ButtonGroup>

            <Spacer />
            <Button colorScheme={color} onClick={getNewQuote} boxShadow="md">
              New quote
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
}
